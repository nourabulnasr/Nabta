import { NextResponse } from "next/server";
import { learningClient, learningReady } from "@/lib/learning";
import { readSmallJson, sameOrigin, uuidPattern, validMediaPath, validPaymentReference, validRange } from "@/lib/learning-validation";

import { privateRecording, recordingStorage } from "@/lib/recording-storage";

type Context = { params: Promise<{ action: string }> };
const reply = (data: unknown, status = 200) => NextResponse.json(data, { status, headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" } });
const unavailable = () => reply({ error: "Student access is being prepared. Contact Nabta for help.", code: "unavailable" }, 503);
const denied = () => reply({ error: "Sign in required.", code: "unauthorized" }, 401);
export async function GET(request: Request, context: Context) {
  const { action } = await context.params;
  if (!["session", "library", "orders", "admin", "video", "captions"].includes(action)) return reply({ error: "Not found" }, 404);
  if (!learningReady()) return unavailable();
  try {
    const client = await learningClient();
    const { data: { user }, error } = await client.auth.getUser();
    if (error || !user) return denied();
    const { data: admin } = await client.rpc("nabta_is_admin");
    const { data: assurance } = await client.auth.mfa.getAuthenticatorAssuranceLevel();
    if (action === "session") return reply({ email: user.email, admin: admin === true, mfa: assurance?.currentLevel === "aal2" });
    if (action === "library") {
      const [lessons, access] = await Promise.all([
        client.from("nabta_lessons").select("id,position,title_en,title_ar,duration_minutes,published").eq("published", true).order("position"),
        client.from("nabta_access").select("lesson_id"),
      ]);
      if (lessons.error || access.error) throw new Error("Library unavailable");
      return reply({ lessons: lessons.data, access: access.data.map(a => a.lesson_id) });
    }
    if (action === "orders" || action === "admin") {
      if (action === "admin" && (!admin || assurance?.currentLevel !== "aal2")) return reply({ error: "Owner two-step verification required." }, 403);
      const offset = Number(new URL(request.url).searchParams.get("offset") ?? 0);
      if (!Number.isSafeInteger(offset) || offset < 0 || offset > 100000) return reply({ error: "Invalid page." }, 400);
      let query = client.from("nabta_orders").select("id,user_id,lesson_id,amount_egp,reference,status,created_at").order("created_at", { ascending: false }).order("id", { ascending: false }).range(offset, offset + 50);
      if (action === "orders") query = query.eq("user_id", user.id);
      const result = await query;
      if (result.error) throw new Error("Orders unavailable");
      return reply({ orders: result.data.slice(0,50), more: result.data.length > 50 });
    }
    const id = new URL(request.url).searchParams.get("lesson");
    if (!id || !uuidPattern.test(id)) return reply({ error: "Invalid lesson." }, 400);
    const range = request.headers.get("range");
    if (!validRange(range)) return reply({ error: "Invalid range." }, 416);
    const { data: assets, error: assetError } = await client.rpc("nabta_playback_asset", { p_lesson: id });
    if (assetError || !assets?.length) return reply({ error: "You do not have access to this recording." }, 403);
    const path = action === "captions" ? assets[0].captions_path : assets[0].object_path;
    if (!path) return reply({ error: "Not available." }, 404);
    // Every seek/range request re-checks account access before streaming.
    const upstream = await privateRecording(path, assets[0].provider, { range });
    if (![200, 206, 416].includes(upstream.status)) return reply({ error: "Recording temporarily unavailable." }, 503);
    const headers = new Headers({ "Cache-Control": "private, no-store", "Content-Type": action === "captions" ? "text/vtt; charset=utf-8" : "video/mp4", "X-Content-Type-Options": "nosniff", "X-Robots-Tag": "noindex" });
    for (const name of ["content-length", "content-range", "accept-ranges"]) {
      const value = upstream.headers.get(name); if (value) headers.set(name, value);
    }
    return new Response(upstream.body, { status: upstream.status, headers });
  } catch { return reply({ error: "This service is temporarily unavailable. Please try again." }, 503); }
}
export async function POST(request: Request, context: Context) {
  if (!sameOrigin(request)) return reply({ error: "Invalid request origin." }, 403);
  if (!learningReady()) return unavailable();
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply({ error: "JSON required." }, 415);

  try {
    const { action } = await context.params;
    const body = await readSmallJson(request);
    const client = await learningClient();
    if (action === "login" || action === "verify") {
      if (typeof body.email !== "string" || body.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return reply({ error: "Enter a valid email." }, 400);
      if (action === "login") {
        if (typeof body.captchaToken !== "string" || body.captchaToken.length < 10 || body.captchaToken.length > 2048) return reply({ error: "Complete human verification." }, 400);
        const { error } = await client.auth.signInWithOtp({ email: body.email.trim().toLowerCase(), options: { shouldCreateUser: true, captchaToken: typeof body.captchaToken === "string" ? body.captchaToken : undefined } });
        return error ? reply({ error: "Unable to send a code. Please wait and try again." }, 429) : reply({ sent: true });
      }
      if (typeof body.code !== "string" || !/^\d{6,8}$/.test(body.code)) return reply({ error: "Enter the email code." }, 400);
      const { error } = await client.auth.verifyOtp({ email: body.email.trim().toLowerCase(), token: body.code, type: "email" });
      return error ? reply({ error: "This code is invalid or expired." }, 400) : reply({ signedIn: true });
    }
    const { data: { user } } = await client.auth.getUser();
    if (!user) return denied();
    if (action === "logout") { await client.auth.signOut(); return reply({ signedOut: true }); }
    if (action === "order") {
      if (!validPaymentReference(body.reference) || (body.lesson !== null && (typeof body.lesson !== "string" || !uuidPattern.test(body.lesson)))) return reply({ error: "Check the lesson and payment reference." }, 400);
      const result = await client.rpc("nabta_request_order", { p_lesson: body.lesson, p_reference: body.reference.trim() });
      return result.error ? reply({ error: "Request could not be saved. Check availability, existing requests and the transfer reference." }, 409) : reply({ id: result.data }, 201);
    }
    const { data: admin } = await client.rpc("nabta_is_admin");
    if (!admin) return reply({ error: "Owner access required." }, 403);
    if (action === "mfa-setup") {
      const factors = await client.auth.mfa.listFactors();
      const verified = factors.data?.totp.find(f => f.status === "verified");
      if (verified) return reply({ factorId: verified.id });
      for (const factor of factors.data?.totp ?? []) await client.auth.mfa.unenroll({ factorId: factor.id });
      const result = await client.auth.mfa.enroll({ factorType: "totp", friendlyName: "Nabta owner" });
      return result.error ? reply({ error: "Could not prepare two-step verification." }, 400) : reply({ factorId: result.data.id, qr: result.data.totp.qr_code, secret: result.data.totp.secret });
    }
    if (action === "mfa-verify") {
      if (typeof body.factorId !== "string" || !uuidPattern.test(body.factorId) || typeof body.code !== "string" || !/^\d{6}$/.test(body.code)) return reply({ error: "Enter a valid authenticator code." }, 400);
      const result = await client.auth.mfa.challengeAndVerify({ factorId: body.factorId, code: body.code });
      return result.error ? reply({ error: "Invalid authenticator code." }, 400) : reply({ verified: true });
    }
    const { data: assurance } = await client.auth.mfa.getAuthenticatorAssuranceLevel();
    if (assurance?.currentLevel !== "aal2") return reply({ error: "Two-step verification required." }, 403);
    if (action === "review") {
      if (typeof body.order !== "string" || !uuidPattern.test(body.order) || typeof body.decision !== "string" || !["approved", "rejected", "revoked"].includes(body.decision)) return reply({ error: "Invalid decision." }, 400);
      const result = await client.rpc("nabta_review_order", { p_order: body.order, p_decision: body.decision });
      return result.error ? reply({ error: "This order cannot make that status change." }, 409) : reply({ saved: true });
    }
    if (action === "lesson") {
      if (typeof body.position !== "number" || typeof body.minutes !== "number" || !Number.isInteger(body.position) || body.position < 1 || body.position > 20 || !Number.isInteger(body.minutes) || body.minutes < 1 || body.minutes > 240 ||
          typeof body.en !== "string" || !body.en.trim() || body.en.length > 160 || typeof body.ar !== "string" || !body.ar.trim() || body.ar.length > 160 ||
          !validMediaPath(body.path, "mp4") || (body.captions && !validMediaPath(body.captions, "vtt")) || typeof body.published !== "boolean") return reply({ error: "Check lesson details and private file paths." }, 400);
      const provider = recordingStorage();
      if (body.published && provider === "r2") {
        for (const path of [body.path, body.captions].filter(Boolean)) {
          const file = await privateRecording(path as string, provider, { method: "HEAD" });
          if (!file.ok || Number(file.headers.get("content-length")) <= 0) return reply({ error: "Upload the private file before publishing." }, 409);
        }
      }
      const result = await client.rpc("nabta_save_lesson", { p_position: body.position, p_en: body.en, p_ar: body.ar, p_minutes: body.minutes, p_path: body.path, p_captions: body.captions || null, p_published: body.published, p_provider: provider });
      return result.error ? reply({ error: "Upload the files to private storage first, then check these details." }, 409) : reply({ saved: true });
    }
    return reply({ error: "Not found." }, 404);
  } catch { return reply({ error: "Unable to process this request." }, 400); }
}




import application from "vinext/server/fetch-handler";
import filmSizes from "./src/lib/public-film-sizes.json";
import { publicFilmResponse, type AssetFetcher } from "./src/lib/public-film-response";

export * from "vinext/server/fetch-handler";

const films = new Map(Object.entries(filmSizes));

const worker = {
  async fetch(request: Request, env: { ASSETS: AssetFetcher }, context: unknown) {
    const size = films.get(new URL(request.url).pathname);
    if (size !== undefined) return publicFilmResponse(request, env.ASSETS, size);
    const response = await application.fetch(request, env, context);
    const clientEncoding = (request as Request & { cf?: { clientAcceptEncoding?: string } }).cf?.clientAcceptEncoding ?? request.headers.get("Accept-Encoding") ?? "";
    const acceptsGzip = clientEncoding.split(",").some(part => /^gzip(?:\s*;\s*q=(?:1(?:\.0*)?|0?\.[0-9]*[1-9][0-9]*))?$/i.test(part.trim()));
    if (request.method === "GET" && response.status === 200 && response.body &&
        response.headers.get("Content-Type")?.startsWith("text/html") &&
        !response.headers.has("Content-Encoding") && acceptsGzip) {
      const headers = new Headers(response.headers);
      headers.set("Content-Encoding", "gzip");
      headers.delete("Content-Length");
      headers.append("Vary", "Accept-Encoding");
      // Workers compresses the stream according to Content-Encoding automatically.
      return new Response(response.body, { status: response.status, headers });
    }
    return response;
  },
};

export default worker;

import application from "vinext/server/fetch-handler";
import filmSizes from "./src/lib/public-film-sizes.json";
import { publicFilmResponse, type AssetFetcher } from "./src/lib/public-film-response";

export * from "vinext/server/fetch-handler";

const films = new Map(Object.entries(filmSizes));

const worker = {
  fetch(request: Request, env: { ASSETS: AssetFetcher }, context: unknown) {
    const size = films.get(new URL(request.url).pathname);
    if (size !== undefined) return publicFilmResponse(request, env.ASSETS, size);
    return application.fetch(request, env, context);
  },
};

export default worker;

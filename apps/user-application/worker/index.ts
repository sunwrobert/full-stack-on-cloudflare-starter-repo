import { initDatabase } from "@repo/data-ops/database";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "./trpc/context";
import { appRouter } from "./trpc/router";

export default {
  fetch(request, env, ctx) {
    const url = new URL(request.url);
    initDatabase(env.DB);

    if (url.pathname.startsWith("/trpc")) {
      return fetchRequestHandler({
        endpoint: "/trpc",
        req: request,
        router: appRouter,
        createContext: () =>
          createContext({ req: request, env, workerCtx: ctx }),
      });
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<ServiceBindings>;

import { cloudflareInfoSchema } from "@repo/data-ops/zod-schema/links";
import { Hono } from "hono";
import {
  getDestinationForCountry,
  getRoutingDestinations,
} from "@/helpers/route-ops";

export const App = new Hono<{ Bindings: Env }>();

App.get("/:id", async (c) => {
  const id = c.req.param("id");
  const linkInfo = await getRoutingDestinations(c.env, id);
  if (!linkInfo) {
    return c.text("destination not found", 404);
  }

  const cfHeader = cloudflareInfoSchema.safeParse(c.req.raw.cf);

  if (!cfHeader.success) {
    return c.text("invalid cf header", 400);
  }

  const headers = cfHeader.data;
  const destination = getDestinationForCountry(linkInfo, headers.country);

  return c.redirect(destination, 302);
});

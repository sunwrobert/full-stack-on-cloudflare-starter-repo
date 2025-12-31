import { Hono } from "hono";

export const App = new Hono<{ Bindings: Env }>();

App.get("/:id", (c) => {
  console.log(JSON.stringify(c.req.raw.cf));
  const { country, longitude, latitude } = c.req.raw.cf;
  return c.json({ country, longitude, latitude });
});

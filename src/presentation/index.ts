import { Hono } from 'hono';
import { container } from "../infrastructure/container.js";
import userRoutes from "@presentation/api/userRoutes.js";
import { config } from "../config.js";

const app = new Hono();

app.use('*', async (c, next) => {
  c.set('container', container.createScope());
  await next();
});

app.route('/users', userRoutes);

// Bun will start the server automatically with this default export
export default {
  port: config.PORT,
  fetch: app.fetch,
};

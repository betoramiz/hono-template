import { Hono } from "hono";
import { errorToResponse } from "./errorToResponse.js";
import { zValidator } from "@hono/zod-validator";
import type { CreateUser } from "../../core/users/index.js";
import { CreateUserSchema } from "../../core/users/usecases/create/schema.js";
import * as UserModule from "../../core/users/index.js";

const app = new Hono();

app.post('/',
  zValidator('json', CreateUserSchema),
  async (c) => {
  const body = c.req.valid("json");

  const container = c.get('container');
  const command = container.resolve<CreateUser>('createUser');

  const result = await command.execute(body);
  return result.match(val => c.json(val, 201), error => errorToResponse(c, error))
});

app.get('list', async (c) => {
  const container = c.get('container');
  const command = container.resolve<UserModule.GetList>('getUserList');

  const result = await command.execute();
  return result.match(result => c.json(result, 200), error => errorToResponse(c, error));
})
export default app;

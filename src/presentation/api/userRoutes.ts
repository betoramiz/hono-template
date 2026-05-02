import { Hono } from "hono";
import { errorToResponse } from "./errorToResponse.js";
import { zValidator } from "@hono/zod-validator";
import type { CreateUser } from "@modules/users/application/create/create.usecase.js";
import { CreateUserSchema } from "@modules/users/application/create/schema.js";
import * as UserModule from "@modules/users/index.js";

const app = new Hono();

app.post('/',
  zValidator('json', CreateUserSchema),
  async (c) => {
  const body = c.req.valid("json");

  const container = c.get('container');
  const command = container.resolve<CreateUser>('createUser');

  const result = await command.execute(body);

  if (result.isErr()) {
    return errorToResponse(c, result.error);
  }

  return c.json(result.value, 201);
});

app.get('list', (c) => {
  const container = c.get('container');
  const command = container.resolve<UserModule.GetList>('getUserList');

  const result = command.execute();
  return result.match(result => c.json(result, 200),
      error => errorToResponse(c, error));
})
export default app;

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { CreateUserSchema } from "@core/users/usecases/create/schema.js";
import * as UserModule from "../../core/users/index.js";
import { resolve } from "../utils/resolver.js";
import { toErrorResponse } from "../utils/toErrorResponse.js";
import { getByIdSchema } from "@core/users/usecases/getById/schema.js";

const app = new Hono();

app.post('/', zValidator('json', CreateUserSchema), async (c) => {
  const body = c.req.valid("json");
  const command = resolve<UserModule.CreateUser>(c,'createUser');

  const result = await command.execute(body);
  return result.match(v => c.json(v, 201), error => toErrorResponse(c, error))
});

app.get('list', async (c) => {
  const command = resolve<UserModule.GetList>(c, 'getUserList');

  const result = await command.execute();
  return result.match(result => c.json(result, 200), error => toErrorResponse(c, error));
})

app.get(':id', zValidator('param', getByIdSchema), async (c) => {
  const id = c.req.param('id');
  const command = resolve<UserModule.GetUserById>(c, 'getUserById');

  const result = await command.execute(id);
  return result.match(result => c.json(result, 200), error => toErrorResponse(c, error));
})

export default app;

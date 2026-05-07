import { Hono } from "hono";
import { errorToResponse } from "./errorToResponse.js";
import { zValidator } from "@hono/zod-validator";
import { CreateUserSchema } from "../../core/users/usecases/create/schema.js";
import * as UserModule from "../../core/users/index.js";
import { resolve } from "@presentation/api/resolver.js";

const app = new Hono();

app.post('/', zValidator('json', CreateUserSchema), async (c) => {
  const body = c.req.valid("json");
  const command = resolve<UserModule.CreateUser>(c,'createUser');

  const result = await command.execute(body);
  return result.match(val => c.json(val, 201), error => errorToResponse(c, error))
});

app.get('list', async (c) => {
  const command = resolve<UserModule.GetList>(c, 'getUserList');

  const result = await command.execute();
  return result.match(result => c.json(result, 200), error => errorToResponse(c, error));
})
export default app;

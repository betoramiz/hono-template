import { findById } from "@repositories/user.repository.js";
import { err, ok, Result } from "neverthrow";
import type { ErrorResponse } from "@shared/errors/ErrorTypes.js";
import { userNotFoundError } from "@core/users/errors.js";


export interface Response {
  id: string,
  name: string;
}

export class GetUserById {
  async execute(userId: string): Promise<Result<Response, ErrorResponse>> {
    const user = await findById(userId);

    if(user === null) {
      return err(userNotFoundError('Usuario no encontrado'));
    }

    const { id, name } = user.toPrimitives();
    return ok({ id, name })
  }
}
import { Result, ok, err } from 'neverthrow';
import { v4 as uuidv4 } from 'uuid';
import { User, type UserProps } from "../../User.js";
import * as UserRepository from "@repositories/user.repository.js";
import type { CreateUserCommand } from "./schema.js";
import type { ErrorResponse } from "@shared/errors/ErrorTypes.js";

export class CreateUser {
  constructor() {}

  async execute(command: CreateUserCommand): Promise<Result<UserProps, ErrorResponse>> {
    const userResult = User.create(command.name, command.email, uuidv4());

    if (userResult.isErr()) {
      return err(userResult.error); // Falla la validación de dominio
    }

    const user = userResult.value;
    await UserRepository.save(user);

    return ok(user.toPrimitives());
  }
}
import { Result, ok, err } from 'neverthrow';
import { v4 as uuidv4 } from 'uuid';
import { User } from "../../User.js";
import type { IUserRepository } from "../../IUserRepository.js";
import type { CreateUserCommand } from "./schema.js";
import type { UserDomainError } from "../../errors.js";


export class CreateUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(command: CreateUserCommand): Promise<Result<any, UserDomainError>> {
    const userResult = User.create(command.name, command.email, uuidv4());

    if (userResult.isErr()) {
      return err(userResult.error); // Falla la validación de dominio
    }

    const user = userResult.value;
    await this.userRepository.save(user);

    return ok(user.toPrimitives());
  }
}
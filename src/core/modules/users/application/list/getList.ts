import { err, ok, Result } from "neverthrow";
import type { IUserRepository } from "@modules/users/domain/IUserRepository.js";
import type { UserDomainError } from "@modules/users/domain/errors.js";
import { User } from "@modules/users/domain/User.js";

export class GetList {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(): Result<User[], UserDomainError> {

    const beto = User.create('Alberto Ramirez', 'email1@email.com', 'id1');
    const mariana =  User.create('Mariana Martinez', 'email2@email.com', 'id2');

    if(beto.isErr()) return err(beto.error);
    if(mariana.isErr()) return err(mariana.error);

    return ok([beto.value, mariana.value]);
  }

}
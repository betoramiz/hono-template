import { ok, Result } from "neverthrow";
import type { IUserRepository } from "@modules/users/domain/IUserRepository.js";
import type { UserDomainError } from "@modules/users/domain/errors.js";
import type { GetListResponse } from "@modules/users/application/list/getListResponse.js";


export class GetList {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<Result<GetListResponse[], UserDomainError>> {
    const users = await this.userRepository.getAll();
    return ok(users);
  }

}
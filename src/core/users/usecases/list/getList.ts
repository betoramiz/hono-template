import { ok, Result } from "neverthrow";
import type { IUserRepository } from "../../IUserRepository";
import type { UserDomainError } from "../../errors";
import type { GetListResponse } from "src/core/usecases/users/list/getListResponse.js";


export class GetList {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<Result<GetListResponse[], UserDomainError>> {
    const users = await this.userRepository.getAll();
    return ok(users);
  }

}
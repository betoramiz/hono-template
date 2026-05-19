import { ok, Result } from "neverthrow";
import * as UserRepository from "@repositories/user.repository.js"
import type { GetListResponse } from "@core/users/usecases/list/getListResponse.js";
import type { ErrorResponse } from "@shared/errors/ErrorTypes.js";


export class GetList {
  constructor() {}

  async execute(): Promise<Result<GetListResponse[], ErrorResponse>> {
    const users = await UserRepository.getAll();
    return ok(users);
  }

}
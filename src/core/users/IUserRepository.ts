import type { User } from "./User.js";
import type { GetListResponse } from "./usecases/list/getListResponse.js";

export interface IUserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  getAll(): Promise<GetListResponse[]>;
}
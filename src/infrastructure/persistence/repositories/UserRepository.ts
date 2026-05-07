import { eq } from "drizzle-orm";
import type { IUserRepository } from "../../../core/users/IUserRepository.js";
import { User } from "../../../core/users/User.js";
import { db } from "@infrastructure/database/connection.js";
import { usersTable } from "@infrastructure/persistence/schemas/users.schema.js";
import type { GetListResponse } from "../../../core/users/usecases/list/getListResponse.js";

export class UserRepository implements IUserRepository {
  async getAll(): Promise<GetListResponse[]> {
    return db.select({
      name: usersTable.name,
      email: usersTable.email
    })
      .from(usersTable);
  }

  async save(user: User): Promise<void> {
    const data = user.toPrimitives();
    await db.insert(usersTable)
      .values(data)
      .onConflictDoUpdate({
        target: usersTable.id,
        set: { name: data.name, isActive: data.isActive }
      });
  }

  async findById(id: string): Promise<User | null> {
    const [row] = await db.select().from(usersTable).where(eq(usersTable.id, id));
    if (!row) return null;
    return User.reconstitute(row);
  }
}
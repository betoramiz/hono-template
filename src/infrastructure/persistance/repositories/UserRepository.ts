import { eq } from 'drizzle-orm';
import type { IUserRepository } from "@modules/users/domain/IUserRepository.js";
import { User } from "@modules/users/domain/User.js";
import { usersTable } from "../shemas/users.shema.js";
import { db } from "@infrastructure/database/connection.js";

export class UserRepository implements IUserRepository {
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
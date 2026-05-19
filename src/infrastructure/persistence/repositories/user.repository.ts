import { db } from "@infrastructure/database/connection.js";
import { usersTable } from "@infrastructure/persistence/schemas/users.schema.js";
import { eq } from "drizzle-orm";
import { User } from "@core/users/User.js";
import type { GetListResponse } from "@core/users/usecases/list/getListResponse.js";


export const getAll = async (): Promise<GetListResponse[]> => {
  return db.select({
    id: usersTable.id,
    name: usersTable.name,
    email: usersTable.email
  })
    .from(usersTable);
}

export const save = async (user: User): Promise<void> => {
  const data = user.toPrimitives();
  await db.insert(usersTable)
    .values(data)
    .onConflictDoUpdate({
      target: usersTable.id,
      set: { name: data.name, isActive: data.isActive }
    });
}

export const findById = async (id: string): Promise<User | null> => {
  const [row] = await db.select().from(usersTable).where(eq(usersTable.id, id));
  if (!row) return null;

  return User.reconstitute(row);
}
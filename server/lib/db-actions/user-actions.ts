import { db } from '../../db/db'
import { usersTable } from '../../db/schema'

export async function createUserDB(user_id: string, user_email: string) {
  await db
    .insert(usersTable)
    .values({
      id: user_id,
      email: user_email,
    })
    .onConflictDoNothing()
}

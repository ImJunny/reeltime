import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: text().primaryKey(),
  email: text().notNull(),
  created_at: timestamp().defaultNow().notNull(),
})

import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

// export const usersTable = pgTable('users', {
//   id: text().primaryKey(),
//   email: text().notNull(),
//   created_at: timestamp().defaultNow().notNull(),
// })

export const m3u8CacheTable = pgTable('m3u8_cache', {
  slug: text().primaryKey(),
  url: text().notNull().unique(),
  created_at: timestamp().defaultNow().notNull(),
})

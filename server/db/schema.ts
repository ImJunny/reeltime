import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const m3u8CacheTable = pgTable('m3u8_cache', {
  slug: text().primaryKey(),
  url: text().notNull(),
  created_at: timestamp().defaultNow().notNull(),
})

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const orgs = sqliteTable("orgs", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  ref: text().notNull().unique(),
  name: text().notNull(),
})

export const consultants = sqliteTable("consultants", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  ref: text().notNull().unique(),
  email: text().notNull().unique(),
  fullName: text().notNull(),
  orgId: integer({ mode: "number" })
    .notNull()
    .references(() => orgs.id),
})

export type Consultant = typeof consultants.$inferSelect

import { sql } from "drizzle-orm"
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const contacts = sqliteTable(
  "contacts",
  {
    id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    consultantId: integer({ mode: "number" }).notNull(),
    fullName: text().notNull(),
    createdAt: integer({ mode: "timestamp" })
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
  },
  (t) => ({
    idxConsultantId: index("idx_consultant_id").on(t.consultantId),
  }),
)

export type Contact = typeof contacts.$inferSelect

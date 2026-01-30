import { uuid, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./user.model.js";

export const urlsTable = pgTable( 'urls', {
    id: uuid().primaryKey().defaultRandom(),

    shortCode: varchar('code', { length: 155 }).notNull().unique(),
    targetURL: text('target_url').notNull(),

    userId: uuid('user_id').references(() => usersTable.id).notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updateAt: timestamp('updated_at').$onUpdate(() => new Date()),

});
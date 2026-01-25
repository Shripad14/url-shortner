import { uuid, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  
  firstname: varchar('first_name', { lenght: 55 }).notNull(),
  lastname: varchar('last_name', { lenght: 55 }),

  email: varchar({ length: 255 }).notNull().unique(),

  password: text().notNull(),
  salt: text().notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updateAt: timestamp('updated_at').$onUpdate(() => Date()),
});

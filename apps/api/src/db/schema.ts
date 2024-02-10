import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { boolean } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { serial } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: serial('id'),
  email: varchar('email', { length: 100 }).notNull(),
  password: varchar('password', { length: 250 }).notNull(),
  firstName: varchar('first_name', { length: 50 }).notNull(),
  lastName: varchar('first_name', { length: 50 }).notNull(),
  admin: boolean('admin').notNull().default(false),
});

export type CreateUser = InferInsertModel<typeof user>;
export type User = InferSelectModel<typeof user>;
export type UpdateUser = Partial<CreateUser>;

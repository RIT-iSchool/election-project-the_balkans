import { relations } from 'drizzle-orm';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { boolean, timestamp } from 'drizzle-orm/pg-core';
import { index } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { serial } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const user = pgTable(
  'user',
  {
    id: serial('id'),
    email: varchar('email', { length: 100 }).notNull(),
    password: varchar('password', { length: 250 }).notNull(),
    firstName: varchar('first_name', { length: 50 }).notNull(),
    lastName: varchar('first_name', { length: 50 }).notNull(),
    admin: boolean('admin').notNull().default(false),
  },
  (table) => {
    return {
      indexOnEmail: index('user_email_index').on(table.email),
    };
  },
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
}));

export type CreateUser = InferInsertModel<typeof user>;
export type User = InferSelectModel<typeof user>;
export type UpdateUser = Partial<CreateUser>;

export const session = pgTable(
  'session',
  {
    id: serial('id'),
    userId: varchar('user_id')
      .references(() => user.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    token: varchar('token', { length: 250 }).notNull(),
    expiresAt: timestamp('expires_at').notNull(),
  },
  (table) => {
    return {
      indexOnToken: index('session_token_index').on(table.token),
    };
  },
);

export const sessionRelations = relations(session, ({ one }) => ({
  users: one(user),
}));

export type CreateSession = InferInsertModel<typeof session>;
export type Session = InferSelectModel<typeof session>;
export type UpdateSession = Partial<CreateSession>;

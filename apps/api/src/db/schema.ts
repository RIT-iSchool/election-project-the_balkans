import { relations } from 'drizzle-orm';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { boolean, text, timestamp } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';
import { index } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { serial } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

//#region user

export const user = pgTable(
  'user',
  {
    id: serial('id'),
    email: varchar('email', { length: 100 }).notNull(),
    password: varchar('password', { length: 250 }).notNull(),
    firstName: varchar('first_name', { length: 50 }).notNull(),
    lastName: varchar('last_name', { length: 50 }).notNull(),
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

//#endregion

//#region session
export const session = pgTable(
  'session',
  {
    id: serial('id'),
    userId: integer('user_id')
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
  user: one(user),
}));

export type CreateSession = InferInsertModel<typeof session>;
export type Session = InferSelectModel<typeof session>;
export type UpdateSession = Partial<CreateSession>;

//#endregion

//#region society
export const society = pgTable('society', {
  id: serial('id'),
  name: varchar('name', { length: 100 }).notNull(),
  owner: integer('user_id')
    .references(() => user.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    .notNull(),
});

export const societyRelations = relations(society, ({ one }) => ({
  owner: one(user),
}));

export type CreateSociety = InferInsertModel<typeof society>;
export type Society = InferSelectModel<typeof society>;
export type UpdateSociety = Partial<CreateSociety>;

//#endregion

//#region societyMember

export const role = pgEnum('role', ['member', 'officer', 'employee']);

export const societyMember = pgTable('societyMember', {
  id: serial('id'),
  userId: integer('user_id')
    .references(() => user.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    .notNull(),
  societyId: integer('society_id')
    .references(() => society.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    .notNull(),
  role: role('role').notNull(),
});

export const societyMemberRelations = relations(societyMember, ({ one }) => ({
  user: one(user),
  society: one(society),
}));

export type CreateSocietyMember = InferInsertModel<typeof societyMember>;
export type SocietyMember = InferSelectModel<typeof societyMember>;
export type UpdateSocietyMember = Partial<CreateSocietyMember>;

//#endregion

//#region election

export const election = pgTable('election', {
  id: serial('id'),
  name: varchar('name', { length: 100 }).notNull(),
  societyId: integer('society_id')
    .references(() => society.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    .notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  photoURL: varchar('photo_url', { length: 250 }),
});

export const electionRelations = relations(election, ({ one, many }) => ({
  society: one(society),
  offices: many(electionOffice),
  candidates: many(electionCandidate),
  initiatives: many(electionInitiative),
}));

export type CreateElection = InferInsertModel<typeof election>;
export type Election = InferSelectModel<typeof election>;
export type UpdateElection = Partial<CreateElection>;

//#endregion

//#region electionOffice

export const electionOffice = pgTable('electionOffice', {
  id: serial('id'),
  electionId: integer('election_id')
    .references(() => election.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    .notNull(),
  officeName: varchar('office_name', { length: 30 }).notNull(),
  maxVotes: integer('max_votes').notNull(),
});

export const electionOfficeRelations = relations(electionOffice, ({ one }) => ({
  election: one(election),
}));

export type CreateElectionOffice = InferInsertModel<typeof electionOffice>;
export type ElectionOffice = InferSelectModel<typeof electionOffice>;
export type UpdateElectionOffice = Partial<CreateElectionOffice>;

//#endregion

//#region electionCandidate

export const electionCandidate = pgTable('electionCandidate', {
  id: serial('id'),
  electionOfficeId: integer('election_office_id')
    .references(() => electionOffice.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    .notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  photoURL: varchar('photo_url', { length: 250 }),
  description: text('description').notNull(),
});

export const electionCandidateRelations = relations(
  electionCandidate,
  ({ one }) => ({
    office: one(electionOffice),
  }),
);

export type CreateElectionCandidate = InferInsertModel<
  typeof electionCandidate
>;
export type ElectionCandidate = InferSelectModel<typeof electionCandidate>;
export type UpdateElectionCandidate = Partial<CreateElectionCandidate>;

//#endregion

//#region candidateVote

export const candidateVote = pgTable('candidateVote', {
  id: serial('id'),
  memberId: integer('member_id')
    .references(() => societyMember.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    .notNull(),
  electionCandidateId: integer('election_candidate_id')
    .references(() => electionCandidate.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    .notNull(),
});

export const candidateVoteRelations = relations(candidateVote, ({ one }) => ({
  member: one(societyMember),
  candidate: one(electionCandidate),
}));

export type CreateCandidateVote = InferInsertModel<typeof candidateVote>;
export type CandidateVote = InferSelectModel<typeof candidateVote>;
export type UpdateCandidateVote = Partial<CreateCandidateVote>;

//#endregion

//#region electionInitiative

export const electionInitiative = pgTable('electionInitiative', {
  id: serial('id'),
  electionId: integer('election_id')
    .references(() => election.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    .notNull(),
  initiativeName: varchar('initiative_name', { length: 30 }).notNull(),
  description: text('description').notNull(),
});

export const electionInitiativeRelations = relations(
  electionInitiative,
  ({ one, many }) => ({
    election: one(election),
    options: many(initiativeOption),
    votes: many(initiativeVote),
  }),
);

export type CreateElectionInitiative = InferInsertModel<
  typeof electionInitiative
>;
export type ElectionInitiative = InferSelectModel<typeof electionInitiative>;
export type UpdateElectionInitiative = Partial<CreateElectionInitiative>;

//#endregion

//#region initiativeOption

export const initiativeOption = pgTable('initiativeOption', {
  id: serial('id'),
  electionInitiativeId: integer('election_initiative_id')
    .references(() => electionInitiative.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    .notNull(),
  title: varchar('title', { length: 30 }).notNull(),
});

export const initiativeOptionRelations = relations(
  initiativeOption,
  ({ one }) => ({
    initiative: one(electionInitiative),
  }),
);

export type CreateInitiativeOption = InferInsertModel<typeof initiativeOption>;
export type InitiativeOption = InferSelectModel<typeof initiativeOption>;
export type UpdateInitiativeOption = Partial<CreateInitiativeOption>;

//#endregion

//#region initiativeVote

export const initiativeVote = pgTable('initiativeVote', {
  id: serial('id'),
  memberId: integer('member_id')
    .references(() => societyMember.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    .notNull(),
  electionInitiativeId: integer('election_initiative_id')
    .references(() => electionInitiative.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    .notNull(),
  electionInitiativeOptionId: integer('election_initiative_option_id')
    .references(() => initiativeOption.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    .notNull(),
});

export const initiativeVoteRelations = relations(initiativeVote, ({ one }) => ({
  member: one(societyMember),
  initiative: one(electionInitiative),
  option: one(initiativeOption),
}));

export type CreateInitiativeVote = InferInsertModel<typeof initiativeVote>;
export type InitiativeVote = InferSelectModel<typeof initiativeVote>;
export type UpdateInitiativeVote = Partial<CreateInitiativeVote>;

//#endregion

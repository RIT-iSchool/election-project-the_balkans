import { count, desc, eq, relations } from 'drizzle-orm';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  boolean,
  json,
  pgMaterializedView,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';
import { index } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { serial } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const user = pgTable(
  'user',
  {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 100 }).notNull(),
    password: varchar('password', { length: 250 }).notNull(),
    firstName: varchar('first_name', { length: 50 }).notNull(),
    lastName: varchar('last_name', { length: 50 }).notNull(),
    admin: boolean('admin').notNull().default(false),
  },
  (table) => {
    return {
      indexOnEmail: index('user_email_index').on(table.email),
      indexOnPassword: index('user_password_index').on(table.password),
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
    id: serial('id').primaryKey(),
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
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export type CreateSession = InferInsertModel<typeof session>;
export type Session = InferSelectModel<typeof session>;
export type UpdateSession = Partial<CreateSession>;

export const society = pgTable(
  'society',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    ownerId: integer('owner_id')
      .references(() => user.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
  },
  (table) => {
    return {
      indexOnName: index('society_name_index').on(table.name),
    };
  },
);

export const societyRelations = relations(society, ({ one }) => ({
  owner: one(user, {
    fields: [society.ownerId],
    references: [user.id],
  }),
}));

export type CreateSociety = InferInsertModel<typeof society>;
export type Society = InferSelectModel<typeof society>;
export type UpdateSociety = Partial<CreateSociety>;

export const role = pgEnum('role', ['member', 'officer', 'employee']);
export type Role = (typeof role)['enumValues'][number];

export const societyMember = pgTable(
  'societyMember',
  {
    id: serial('id').primaryKey(),
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
  },
  (table) => {
    return {
      indexOnUserIdSocietyId: index(
        'society_member_user_id_society_id_index',
      ).on(table.userId, table.societyId),
    };
  },
);

export const societyMemberRelations = relations(societyMember, ({ one }) => ({
  user: one(user, {
    fields: [societyMember.userId],
    references: [user.id],
  }),
  society: one(society, {
    fields: [societyMember.societyId],
    references: [society.id],
  }),
}));

export type CreateSocietyMember = InferInsertModel<typeof societyMember>;
export type SocietyMember = InferSelectModel<typeof societyMember>;
export type UpdateSocietyMember = Partial<CreateSocietyMember>;

export const election = pgTable(
  'election',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    societyId: integer('society_id')
      .references(() => society.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    startDate: timestamp('start_date', { mode: 'string' }).notNull(),
    endDate: timestamp('end_date', { mode: 'string' }).notNull(),
    photoUrl: varchar('photo_url', { length: 250 }),
  },
  (table) => {
    return {
      societyIdIndex: index('election_society_id_index').on(table.societyId),
      startDateIndex: index('election_start_date_index').on(table.startDate),
      endDateIndex: index('election_end_date_index').on(table.endDate),
    };
  },
);

export const electionRelations = relations(election, ({ one, many }) => ({
  society: one(society, {
    fields: [election.societyId],
    references: [society.id],
  }),
  offices: many(electionOffice),
  initiatives: many(electionInitiative),
}));

export type CreateElection = InferInsertModel<typeof election>;
export type Election = InferSelectModel<typeof election>;
export type UpdateElection = Partial<CreateElection>;

export const electionOffice = pgTable(
  'electionOffice',
  {
    id: serial('id').primaryKey(),
    electionId: integer('election_id')
      .references(() => election.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    officeName: varchar('office_name', { length: 30 }).notNull(),
    maxVotes: integer('max_votes').notNull(),
    societyId: integer('society_id')
      .references(() => society.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
  },
  (table) => {
    return {
      electionIdSocietyIdIndex: index(
        'election_office_election_id_society_id_index',
      ).on(table.electionId, table.societyId),
    };
  },
);

export const electionOfficeRelations = relations(
  electionOffice,
  ({ one, many }) => ({
    election: one(election, {
      fields: [electionOffice.electionId],
      references: [election.id],
    }),
    candidates: many(electionCandidate),
    society: one(society, {
      fields: [electionOffice.societyId],
      references: [society.id],
    }),
  }),
);

export type CreateElectionOffice = InferInsertModel<typeof electionOffice>;
export type ElectionOffice = InferSelectModel<typeof electionOffice>;
export type UpdateElectionOffice = Partial<CreateElectionOffice>;

export const electionCandidate = pgTable(
  'electionCandidate',
  {
    id: serial('id').primaryKey(),
    electionOfficeId: integer('election_office_id')
      .references(() => electionOffice.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    photoURL: varchar('photo_url', { length: 250 }),
    description: text('description').notNull(),
    societyId: integer('society_id')
      .references(() => society.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    writeIn: boolean('write_in').default(false),
  },
  (table) => {
    return {
      electionOfficeIdSocietyIdIndex: index(
        'election_candidate_election_office_id_society_id_index',
      ).on(table.electionOfficeId, table.societyId),
      nameSocietyIdIndex: index('election_candidate_name_society_id_index').on(
        table.name,
        table.societyId,
      ),
    };
  },
);

export const electionCandidateRelations = relations(
  electionCandidate,
  ({ one }) => ({
    office: one(electionOffice, {
      fields: [electionCandidate.electionOfficeId],
      references: [electionOffice.id],
    }),
    society: one(society, {
      fields: [electionCandidate.societyId],
      references: [society.id],
    }),
  }),
);

export type CreateElectionCandidate = InferInsertModel<
  typeof electionCandidate
>;
export type ElectionCandidate = InferSelectModel<typeof electionCandidate>;
export type UpdateElectionCandidate = Partial<CreateElectionCandidate>;

export const candidateVote = pgTable(
  'candidateVote',
  {
    id: serial('id').primaryKey(),
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
  },
  (table) => {
    return {
      memberIdIndex: index('candidate_vote_member_id_index').on(table.memberId),
      candidateIdIndex: index('candidate_vote_election_candidate_id_index').on(
        table.electionCandidateId,
      ),
    };
  },
);

export const candidateVoteRelations = relations(candidateVote, ({ one }) => ({
  member: one(societyMember, {
    fields: [candidateVote.memberId],
    references: [societyMember.id],
  }),
  candidate: one(electionCandidate, {
    fields: [candidateVote.electionCandidateId],
    references: [electionCandidate.id],
  }),
}));

export type CreateCandidateVote = InferInsertModel<typeof candidateVote>;
export type CandidateVote = InferSelectModel<typeof candidateVote>;
export type UpdateCandidateVote = Partial<CreateCandidateVote>;

export const electionInitiative = pgTable(
  'electionInitiative',
  {
    id: serial('id').primaryKey(),
    electionId: integer('election_id')
      .references(() => election.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    initiativeName: varchar('initiative_name', { length: 30 }).notNull(),
    description: text('description').notNull(),
    societyId: integer('society_id')
      .references(() => society.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
  },
  (table) => {
    return {
      electionIdSocietyIdIndex: index(
        'election_initiative_election_id_society_id_index',
      ).on(table.electionId, table.societyId),
    };
  },
);

export const electionInitiativeRelations = relations(
  electionInitiative,
  ({ one, many }) => ({
    election: one(election, {
      fields: [electionInitiative.electionId],
      references: [election.id],
    }),
    options: many(initiativeOption),
    votes: many(initiativeVote),
    society: one(society, {
      fields: [electionInitiative.societyId],
      references: [society.id],
    }),
  }),
);

export type CreateElectionInitiative = InferInsertModel<
  typeof electionInitiative
>;
export type ElectionInitiative = InferSelectModel<typeof electionInitiative>;
export type UpdateElectionInitiative = Partial<CreateElectionInitiative>;

export const initiativeOption = pgTable(
  'initiativeOption',
  {
    id: serial('id').primaryKey(),
    electionInitiativeId: integer('election_initiative_id')
      .references(() => electionInitiative.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    title: varchar('title', { length: 30 }).notNull(),
    societyId: integer('society_id')
      .references(() => society.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
  },
  (table) => {
    return {
      initiativeIdSocietyIdIndex: index(
        'initiative_option_election_initiative_id_society_id',
      ).on(table.electionInitiativeId, table.societyId),
    };
  },
);

export const initiativeOptionRelations = relations(
  initiativeOption,
  ({ one }) => ({
    initiative: one(electionInitiative, {
      fields: [initiativeOption.electionInitiativeId],
      references: [electionInitiative.id],
    }),
    society: one(society, {
      fields: [initiativeOption.societyId],
      references: [society.id],
    }),
  }),
);

export type CreateInitiativeOption = InferInsertModel<typeof initiativeOption>;
export type InitiativeOption = InferSelectModel<typeof initiativeOption>;
export type UpdateInitiativeOption = Partial<CreateInitiativeOption>;

export const initiativeVote = pgTable(
  'initiativeVote',
  {
    id: serial('id').primaryKey(),
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
  },
  (table) => {
    return {
      initiativeIdOptionIdIndex: index(
        'initiative_vote_election_initiative_id_election_initiative_option_id_index',
      ).on(table.electionInitiativeId, table.electionInitiativeOptionId),
    };
  },
);

export const initiativeVoteRelations = relations(initiativeVote, ({ one }) => ({
  member: one(societyMember, {
    fields: [initiativeVote.memberId],
    references: [societyMember.id],
  }),
  initiative: one(electionInitiative, {
    fields: [initiativeVote.electionInitiativeId],
    references: [electionInitiative.id],
  }),
  option: one(initiativeOption, {
    fields: [initiativeVote.electionInitiativeOptionId],
    references: [initiativeOption.id],
  }),
}));

export type CreateInitiativeVote = InferInsertModel<typeof initiativeVote>;
export type InitiativeVote = InferSelectModel<typeof initiativeVote>;
export type UpdateInitiativeVote = Partial<CreateInitiativeVote>;

export const officeResultsView = pgMaterializedView('officeResultsView', {
  electionId: integer('electionId'),
  candidate: json('candidate'),
}).existing();

export const initiativeResultsView = pgMaterializedView(
  'initiativeResultsView',
  {
    electionId: integer('electionId'),
    option: json('option'),
  },
).existing();

export const loggedInUsersView = pgMaterializedView('loggedInUsersView', {
  count: integer('count'),
}).existing();

export const activeElectionsView = pgMaterializedView('activeElectionsView', {
  count: integer('count'),
}).existing();

export const activeBallotsView = pgMaterializedView('activeBallotsView', {
  societyId: integer('societyId'),
  count: integer('count'),
}).existing();

export const inactiveBallotsView = pgMaterializedView('inactiveBallotsView', {
  societyId: integer('societyId'),
  count: integer('count'),
}).existing();

export const societyUsersView = pgMaterializedView('societyUsersView', {
  societyId: integer('societyId'),
  count: integer('count'),
}).existing();

export const votingMembersView = pgMaterializedView('votingMembersView', {
  societyId: integer('societyId'),
  count: integer('count'),
}).existing();

export const totalVotesView = pgMaterializedView('totalVotesView', {
  electionId: integer('electionId'),
  count: integer('count'),
}).existing();

export const votingView = pgMaterializedView('votingView', {
  electionId: integer('electionId'),
  user: json('user'),
}).existing();

export const nonVotingView = pgMaterializedView('nonVotingView', {
  electionId: integer('electionId'),
  user: json('user'),
}).existing();

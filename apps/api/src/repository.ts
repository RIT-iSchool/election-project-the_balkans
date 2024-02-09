import { Update, Create } from './helpers';
import { User } from './models/user';
import { Society } from './models/society';
import { SocietyMember } from './models/society-member';
import { Election } from './models/election';
import { ElectionOffice } from './models/election-office';
import { ElectionInitiative } from './models/election-initiative';
import { InitiativeOption } from './models/initiative-option';
import { ElectionCandidate } from './models/election-candidate';
import { InitiativeVote } from './models/initiative-vote';
import { CandidateVote } from './models/candidate-vote';
import { Session } from './models/session';

/**
 * Creates a user.
 */
export type CreateUser = (user: Create<User>) => Promise<User>;

/**
 * Retrieves a user.
 */
export type RetrieveUser = (userId: number) => Promise<User>;

/**
 * Creates a society
 */
export type CreateSociety = (society: Create<Society>) => Promise<Society>;

/**
 * Retrives a society.
 */
export type RetrieveSociety = (societyId: number) => Promise<Society>;

/**
 * Updates a society.
 */
export type UpdateSociety = (
  societyId: number,
  societyUpdate: Update<Society>,
) => Promise<Society>;

/**
 * Creates a society member.
 */
export type CreateSocietyMember = (
  societyMember: Create<SocietyMember>,
) => Promise<SocietyMember>;

/**
 * Retrieves a society member.
 */
export type RetrieveSocietyMember = (
  societyMemberId: number,
) => Promise<SocietyMember>;

/**
 * Updates a society member.
 */
export type UpdateSocietyMember = (
  societyMemberId: number,
  societyMemberUpdate: Update<SocietyMember>, // can only update role of a society member
) => Promise<SocietyMember>;

/**
 * Creates an election.
 */
export type CreateElection = (election: Create<Election>) => Promise<Election>;

/**
 * Retrieves an election.
 */
export type RetrieveElection = (electionId: number) => Promise<Election>;

/**
 * Updates an election
 */
export type UpdateElection = (
  electionId: number,
  electionUpdate: Update<Election>,
) => Promise<Election>;

/**
 * Creates an election office.
 */
export type CreateElectionOffice = (
  electionOffice: Create<ElectionOffice>,
) => Promise<ElectionOffice>;

/**
 * Retrieves an election office.
 */
export type RetrieveElectionOffice = (
  electionOfficeId: number,
) => Promise<ElectionOffice>;

/**
 * Updates an election office.
 */
export type UpdateElectionOffice = (
  electionOfficeId: number,
  electionOfficeUpdate: Update<ElectionOffice>,
) => Promise<ElectionOffice>;

/**
 * Creates an election initiative.
 */
export type CreateElectionInitiative = (
  electionInitiative: Create<ElectionInitiative>,
) => Promise<ElectionInitiative>;

/**
 * Retrieves an election initiative.
 */
export type RetrieveElectionInitiative = (
  electionInitiativeId: number,
) => Promise<ElectionInitiative>;

/**
 * Updates an election initiative.
 */
export type UpdateElectionInitiative = (
  electionInitiativeId: number,
  electionInitiativeUpdate: Update<ElectionInitiative>,
) => Promise<ElectionInitiative>;

/**
 * Creates an initiative option.
 */
export type CreateInitiativeOption = (
  initiativeOption: Create<InitiativeOption>,
) => Promise<InitiativeOption>;

/**
 * Retrieves an initiative option.
 */
export type RetrieveInitiativeOption = (
  initiativeOptionId: number,
) => Promise<InitiativeOption>;

/**
 * Updates an initiative option.
 */
export type UpdateInitiativeOption = (
  initiativeOptionId: number,
  initiativeOptionUpdate: Update<InitiativeOption>,
) => Promise<InitiativeOption>;

/**
 * Creates an election candidate.
 */
export type CreateElectionCandidate = (
  electionCandidate: Create<ElectionCandidate>,
) => Promise<ElectionCandidate>;

/**
 * Retrieves an election candidate.
 */
export type RetrieveElectionCandidate = (
  electionCandidateId: number,
) => Promise<ElectionCandidate>;

/**
 * Updates an election candidate.
 */
export type UpdateElectionCandidate = (
  electionCandidateId: number,
  electionCandidateUpdate: Update<ElectionCandidate>,
) => Promise<ElectionCandidate>;

/**
 * Creates an initiative vote.
 */
export type CreateInitiativeVote = (
  initiativeVote: Create<InitiativeVote>,
) => Promise<InitiativeVote>;

/**
 * Retrives an initiative vote.
 */
export type RetrieveInitiativeVote = (
  initiativeVoteId: number,
) => Promise<InitiativeVote>;

/**
 * Updates an initiative vote.
 */
export type UpdateInitiativeVote = (
  initiativeVoteId: number,
  initiativeVoteUpdate: Update<InitiativeVote>,
) => Promise<InitiativeVote>;

/**
 * Creates a candidate vote.
 */
export type CreateCandidateVote = (
  candidateVote: Create<CandidateVote>,
) => Promise<CandidateVote>;

/**
 * Retrieves a candidate vote
 */
export type RetrieveCandidateVote = (
  candidateVoteId: number,
) => Promise<CandidateVote>;

/**
 * Updates a candidate vote.
 */
export type UpdateCandidateVote = (
  candidateVoteId: number,
  candidateVoteUpdate: Update<CandidateVote>,
) => Promise<CandidateVote>;

/**
 * Creates a session.
 */
export type CreateSession = (session: Create<Session>) => Promise<Session>;

/**
 * Retrieves a session.
 */
export type RetrieveSession = (sessionId: string) => Promise<Session>;

/**
 * Updates a session.
 */
export type UpdateSession = (
  sessionId: string,
  sessionUpdate: Update<Session>,
) => Promise<Session>;

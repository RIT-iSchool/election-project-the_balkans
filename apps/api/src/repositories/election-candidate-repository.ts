import { Create, Update } from "../helpers/helpers";
import { ElectionCandidate } from "../models/election-candidate";

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
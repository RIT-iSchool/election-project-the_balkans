import { Create, Update } from "../helpers/helpers";
import { ElectionInitiative } from "../models/election-initiative";

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
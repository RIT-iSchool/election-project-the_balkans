import { Create, Update } from "../helpers/helpers";
import { ElectionOffice } from "../models/election-office";

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
import { Create, Update } from "../helpers";
import { InitiativeOption } from "../models/initiative-option";

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
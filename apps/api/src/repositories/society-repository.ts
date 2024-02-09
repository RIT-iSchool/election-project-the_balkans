import { Create, Update } from "../helpers";
import { Society } from "../models/society";

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
import { Create, Update } from "../helpers/helpers";
import { SocietyMember } from "../models/society-member";

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
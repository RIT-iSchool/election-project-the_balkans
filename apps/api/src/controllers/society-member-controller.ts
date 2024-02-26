import * as SocietyMember from '../data/society-member-data';

/**
 * Creates a new entry in the society member table.
 */
export const create = async (
  societyMemberCreateParams: SocietyMember.Create,
) => {
  // Enforce some business logic
  const newSocietyMember = await SocietyMember.create(
    societyMemberCreateParams,
  );
  return newSocietyMember;
};

/**
 * Retrieves a society member by ID
 */
export const retrieve = async (
  societyMemberRetrieveParams: SocietyMember.Retrieve,
) => {
  // Enforce some business logic
  const societyMember = await SocietyMember.retrieve(
    societyMemberRetrieveParams,
  );
  return societyMember;
};

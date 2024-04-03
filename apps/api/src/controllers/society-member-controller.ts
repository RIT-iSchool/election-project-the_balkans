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
 * Lists a society's members
 */
export const list = async (societyMemberListParams: SocietyMember.List) => {
  // Enforce some business logic
  const societyMember = await SocietyMember.list(societyMemberListParams);
  return societyMember;
};

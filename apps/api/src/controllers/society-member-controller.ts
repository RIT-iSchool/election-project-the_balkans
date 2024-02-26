import * as SocietyMember from '../data/society-member-data';

export const create = async (user: SocietyMember.Create) => {
  // Enforce some business logic
  const newUser = await SocietyMember.create(user);
  return newUser;
};

export const retrieve = async ({
  societyMemberId,
  societyId,
}: SocietyMember.Retrieve) => {
  // Enforce some business logic
  const user = await SocietyMember.retrieve({ societyMemberId, societyId });
  return user;
};

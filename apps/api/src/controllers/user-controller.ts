import * as User from '../data/user-data';

export const create = async (user: User.Create) => {
  // Enforce some business logic
  const newUser = await User.create(user);
  return newUser;
};

export const retrieve = async ({ userId }: User.Retrieve) => {
  // Enforce some business logic
  const user = await User.retrieve({ userId });
  return user;
};

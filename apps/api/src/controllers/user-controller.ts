import * as User from '../data/user-data';

/**
 * Creates a new entry in the user table.
 */
export const create = async (userCreateParams: User.Create) => {
  // Enforce some business logic
  const newUser = await User.create(userCreateParams);
  return newUser;
};

/**
 * Retrieves a user by ID.
 */
export const retrieve = async (userRetrieveParams: User.Retrieve) => {
  // Enforce some business logic
  const user = await User.retrieve(userRetrieveParams);
  return user;
};

/**
 * Login a user.
 */
export const login = async (userLoginParams: User.Login) => {
  // Enforce some business log
  const loginUser = await User.login(userLoginParams);
  return loginUser;
};

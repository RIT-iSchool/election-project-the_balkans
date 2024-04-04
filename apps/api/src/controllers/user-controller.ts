import * as User from '../data/user-data';
import * as Session from '../data/session-data';
import { v4 as uuid } from 'uuid';

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
  const token = await Session.create({
    userId: loginUser.id,
    token: uuid(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) /** 1 week */,
  });

  return token;
};

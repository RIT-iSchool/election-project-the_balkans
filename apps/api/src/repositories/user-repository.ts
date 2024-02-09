import { Create } from "../helpers";
import { User } from "../models/user";

/**
 * Creates a user.
 */
export type CreateUser = (user: Create<User>) => Promise<User>;

/**
 * Retrieves a user.
 */
export type RetrieveUser = (userId: number) => Promise<User>;
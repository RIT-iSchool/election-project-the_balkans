import { CreateUser, society, societyMember } from '../db/schema';
import { db, withPagination } from '../db';
import { user } from '../db/schema';
import { eq, and, getTableColumns, sql } from 'drizzle-orm';
import { AuthenticationError } from '../errors/AuthenticationError';
import { BadRequestError } from '../errors/BadRequestError';

export type Create = {
  userData: CreateUser;
};

/**
 * Creates a new entry in the user table.
 */
export const create = async ({ userData }: Create) => {
  try {
    const [newUser] = await db.transaction(
      async (dbClient) =>
        await dbClient.insert(user).values(userData).returning(),
    );
    return newUser!;
  } catch (err) {
    throw new Error('Something went wrong creating a user');
  }
};

export type Update = {
  userId: number;
  userData: CreateUser;
};

/**
 * Updates a user.
 */
export const update = async ({ userId, userData }: Update) => {
  try {
    const [updatedUser] = await db.transaction(
      async (dbClient) =>
        await dbClient
          .update(user)
          .set(userData)
          .where(eq(user.id, userId))
          .returning(),
    );

    if (!updatedUser) throw new Error('User not found');

    return updatedUser!;
  } catch (err) {
    throw new Error('Something went wrong updating a user');
  }
};

export type Retrieve = {
  userId: number;
};

/**
 * Retrieves a user by ID.
 */
export const retrieve = async ({ userId }: Retrieve) => {
  try {
    const [userData] = await db
      .select({ ...getTableColumns(user) })
      .from(user)
      .where(eq(user.id, sql.placeholder('id')));

    if (!userData) throw new Error('User not found');

    return userData;
  } catch (err) {
    throw new Error('Something went wrong retrieving a user');
  }
};

export type List = {
  page: number;
};

/**
 * Lists users.
 */
export const list = async ({ page }: List) => {
  try {
    const usersQuery = db
      .select({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      })
      .from(user)
      .$dynamic();
    const usersData = await withPagination(usersQuery, page);

    return usersData;
  } catch (err) {
    throw new Error('Something went wrong listing users');
  }
};

export type Login = {
  email: string;
  password: string;
};

/**
 * Login a user.
 */
export const login = async ({ email, password }: Login) => {
  try {
    const [userData] = await db
      .select({
        ...getTableColumns(user),
      })
      .from(user)
      .where(and(eq(user.email, email), eq(user.password, password)));

    if (!userData) {
      throw new AuthenticationError('Wrong email or password');
    }

    let [societyData] = await db
      .select({
        id: societyMember.societyId,
      })
      .from(societyMember)
      .where(eq(societyMember.userId, userData.id));

    if (!societyData && !userData.admin) {
      throw new BadRequestError('Not a member of any societies');
    }

    // Default admins to the first society since they can see everything. They
    // might not necessarily belong to a society
    [societyData] = await db.select({ id: society.id }).from(society).limit(1);

    return {
      user: userData,
      societyId: societyData!.id,
    };
  } catch (err) {
    throw err;
  }
};

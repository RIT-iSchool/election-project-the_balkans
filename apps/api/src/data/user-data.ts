import { CreateUser } from '../db/schema';
import { db } from '../db';
import { user } from '../db/schema';
import { eq } from 'drizzle-orm';

export const create = async (userData: CreateUser) => {
  try {
    const [newUser] = await db.insert(user).values(userData).returning();

    return newUser!;
  } catch (err) {
    throw new Error('Something went wrong creating a user');
  }
};

export const retrieve = async (userId: number) => {
  try {
    const [userData] = await db.select().from(user).where(eq(user.id, userId));

    if (!userData) throw new Error('User not found');

    return userData;
  } catch (err) {
    throw new Error('Something went wrong retrieving a user');
  }
};

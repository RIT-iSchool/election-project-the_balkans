import { CreateSocietyMember, societyMember } from '../db/schema';
import { db } from '../db';
import { eq } from 'drizzle-orm';

export type Create = {
  societyMemberData: CreateSocietyMember;
};

/**
 * Creates a new entry in the society member table.
 */
export const create = async ({ societyMemberData }: Create) => {
  try {
    const [newSocietyMember] = await db
      .insert(societyMember)
      .values(societyMemberData)
      .returning();
    return newSocietyMember!;
  } catch (err) {
    throw new Error('Something went wrong creating a society member.');
  }
};

export type Retrieve = {
  societyMemberId: number;
};

/**
 * Retrieves a society member by ID
 */
export const retrieve = async ({ societyMemberId }: Retrieve) => {
  try {
    const [societyMemberData] = await db
      .select()
      .from(societyMember)
      .where(eq(societyMember.id, societyMemberId));

    if (!societyMemberData) throw new Error('Society member not found');

    return societyMemberData;
  } catch (err) {
    throw new Error('Something went wrong retrieving a society member.');
  }
};

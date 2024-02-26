import { CreateSocietyMember, societyMember } from '../db/schema';
import { db } from '../db';
import { eq, and } from 'drizzle-orm';

export type Create = {
  societyMemberData: CreateSocietyMember;
  societyId: number;
};

/**
 * Creates a new entry in the society member table.
 */
export const create = async ({ societyMemberData, societyId }: Create) => {
  try {
    const [newSocietyMember] = await db
      .insert(societyMember)
      .values({ ...societyMemberData, societyId })
      .returning();
    return newSocietyMember!;
  } catch (err) {
    throw new Error('Something went wrong creating a society member.');
  }
};

export type Retrieve = {
  societyMemberId: number;
  societyId: number;
};

/**
 * Retrieves a society member by ID
 */
export const retrieve = async ({ societyMemberId, societyId }: Retrieve) => {
  try {
    const [societyMemberData] = await db
      .select()
      .from(societyMember)
      .where(
        and(
          eq(societyMember.id, societyMemberId),
          eq(societyMember.societyId, societyId),
        ),
      );

    if (!societyMemberData) throw new Error('Society member not found');

    return societyMemberData;
  } catch (err) {
    throw new Error('Something went wrong retrieving a society member.');
  }
};

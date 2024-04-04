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

export type List = {
  societyId: number;
};

/**
 * Lists a society's members
 */
export const list = async ({ societyId }: List) => {
  try {
    const societyMemberData = await db
      .select()
      .from(societyMember)
      .where(and(eq(societyMember.societyId, societyId)));

    return societyMemberData;
  } catch (err) {
    throw new Error('Something went wrong listing society members.');
  }
};

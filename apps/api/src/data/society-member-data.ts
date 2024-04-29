import { CreateSocietyMember, societyMember, user } from '../db/schema';
import { db } from '../db';
import { eq, getTableColumns } from 'drizzle-orm';

export type Create = {
  societyMemberData: CreateSocietyMember;
  societyId: number;
};

/**
 * Creates a new entry in the society member table.
 */
export const create = async ({ societyMemberData, societyId }: Create) => {
  try {
    const [newSocietyMember] = await db.transaction(
      async (dbClient) =>
        await dbClient
          .insert(societyMember)
          .values({ ...societyMemberData, societyId })
          .returning(),
    );
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
      .select({
        ...getTableColumns(societyMember),
        user: getTableColumns(user),
      })
      .from(societyMember)
      .leftJoin(user, eq(user.id, societyMember.userId))
      .where(eq(societyMember.societyId, societyId));

    return societyMemberData;
  } catch (err) {
    throw new Error('Something went wrong listing society members.');
  }
};

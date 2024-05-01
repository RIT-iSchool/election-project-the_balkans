import {
  CreateSocietyMember,
  UpdateSocietyMember,
  societyMember,
  user,
} from '../db/schema';
import { db, withPagination } from '../db';
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
  page: number;
};

/**
 * Lists a society's members
 */
export const list = async ({ societyId, page }: List) => {
  try {
    const societyMembersQuery = db
      .select({
        ...getTableColumns(societyMember),
        user: getTableColumns(user),
      })
      .from(societyMember)
      .leftJoin(user, eq(user.id, societyMember.userId))
      .where(eq(societyMember.societyId, societyId))
      .$dynamic();

    const societyMembersData = await withPagination(societyMembersQuery, page);

    return societyMembersData;
  } catch (err) {
    throw new Error('Something went wrong listing society members.');
  }
};

export type Update = {
  memberId: number;
  role: UpdateSocietyMember['role'];
};

export const update = async ({ memberId, role }: Update) => {
  try {
    const [updatedSocietyMember] = await db.transaction(
      async (dbClient) =>
        await dbClient
          .update(societyMember)
          .set({ role })
          .where(eq(societyMember.id, memberId))
          .returning(),
    );

    if (!updatedSocietyMember) throw new Error('Member not found');

    return updatedSocietyMember!;
  } catch (err) {
    console.log('data', err);
    throw new Error('Something went wrong updating a societyMember');
  }
};

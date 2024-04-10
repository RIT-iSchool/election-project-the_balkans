import { NextFunction, Request, Response } from 'express';
import { db } from '../db';
import { session, user as userTable } from '../db/schema';
import { eq, getTableColumns } from 'drizzle-orm';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { BadRequestError } from '../errors/BadRequestError';

export const user = () => {
  return async function (req: Request, _res: Response, next: NextFunction) {
    try {
      // Make sure that the request has a session cookie
      const cookie = req.cookies.session;
      if (!cookie) throw new UnauthorizedError('Unauthorized');

      // Make sure the session exists in our database
      const [sessionData] = await db
        .select()
        .from(session)
        .where(eq(session.token, cookie));
      if (!sessionData) throw new UnauthorizedError('Invalid cookie');

      // Make sure the session is not expired
      if (new Date() > sessionData.expiresAt) {
        throw new UnauthorizedError('Session is expired. Please log in again.');
      }

      const { password: _, ...userColumns } = getTableColumns(userTable);

      // Make sure the user associated with that session exists in our database
      const [userData] = await db
        .select(userColumns)
        .from(userTable)
        .where(eq(userTable.id, sessionData.userId));
      if (!userData) throw new BadRequestError('Invalid user');

      // Assign the user and society to the request object
      req.user = userData;

      next();
    } catch (err) {
      next(err);
    }
  };
};

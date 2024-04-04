import { NextFunction, Request, Response } from 'express';
import { db } from '../db';
import { session, user, societyMember, society } from '../db/schema';
import { and, eq } from 'drizzle-orm';
import { Permission, permissions } from '../constants/permissions';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { BadRequestError } from '../errors/BadRequestError';

export const auth = (permission?: Permission) => {
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

      // Make sure the user associated with that session exists in our database
      const [userData] = await db
        .select()
        .from(user)
        .where(eq(user.id, sessionData.userId));
      if (!userData) throw new BadRequestError('Invalid user');

      // Retrieve the society ID from the headers
      const societyId = req.headers['x-society-id'];

      // If the society ID is empty and the endpoint does not require a specific role,
      // we do not care about checking their role or fetching the society. We assign the
      // user to the request and call the next handler
      if (typeof societyId !== 'string' && !permission) {
        req.user = userData;
        return next();
      }

      if (typeof societyId !== 'string') {
        throw new BadRequestError('Invalid society ID. Check your headers.');
      }

      // Make sure the society exists in our database
      const [societyData] = await db
        .select()
        .from(society)
        .where(eq(society.id, parseInt(societyId)));
      if (!userData) throw new BadRequestError('Invalid society');

      // Make sure the current user has access to this society in our database
      const [societyMemberData] = await db
        .select()
        .from(societyMember)
        .where(
          and(
            eq(societyMember.userId, userData.id),
            eq(societyMember.societyId, parseInt(societyId)),
          ),
        );

      // If the user is not a member of this society and they are not a global admin,
      // deny their request
      if (!societyMemberData && !userData.admin)
        throw new UnauthorizedError(
          'User does not have access to this society',
        );

      // If this endpoint requires a specific role, check that the society member has this role or a role greater than the specified role
      // Also, allow any user with the god-mode flag to access any society, regardless of the societies they belong to
      const userRole = userData.admin ? 'admin' : societyMemberData!.role;

      // If the user's permissions do not include the specified permission, throw an error.
      if (!permissions[userRole].includes(permission!)) {
        throw new UnauthorizedError(
          `Role is not able to access this resource. Role ${userRole} does not have permission ${permission}`,
        );
      }

      // Assign the user and society to the request object
      req.user = userData;
      req.society = societyData;

      next();
    } catch (err) {
      next(err);
    }
  };
};

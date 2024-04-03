import { NextFunction, Request, Response } from 'express';
import { AuthenticationError } from '../errors/AuthenticationError';
import { db } from '../db';
import { session, user, societyMember, type Role, type User, society } from '../db/schema';
import { and, eq } from 'drizzle-orm';

const hasAccess = ({ user, role, requiredRole }: { user: User, role?: Role, requiredRole: Role }) => {
  // If the user is a global admin, they can access any endpoint
  if (user.admin) return true;

  // If the required role is employee, only employees can access this endpoint
  if (requiredRole === 'employee') {
    return role === 'employee';
  }

  // If the required role is officer, only officers and employees can access this endpoint
  if (requiredRole === 'officer') {
    return role === 'officer' || role === 'employee';
  }

  // Otherwise, everyone can access this endpoint as long as they are logged in
  return true;
};

export const auth = (role?: Role | "admin") => {
  return async function (req: Request, _res: Response, next: NextFunction) {
    try {
      // Make sure that the request has a session cookie
      const cookie = req.cookies.session;
      if (!cookie) throw new AuthenticationError('Unauthorized');

      // Make sure the session exists in our database
      const [sessionData] = await db
        .select()
        .from(session)
        .where(eq(session.token, cookie));
      if (!sessionData) throw new AuthenticationError('Invalid headers');

      console.log(sessionData.expiresAt);

      // Make sure the session is not expired
      if (new Date() > sessionData.expiresAt) {
        throw new AuthenticationError(
          'Session is expired. Please log in again.',
        );
      }

      // Make sure the user associated with that session exists in our database
      const [userData] = await db
        .select()
        .from(user)
        .where(eq(user.id, sessionData.userId));
      if (!userData) throw new AuthenticationError('Invalid user');

      // Retrieve the society ID from the headers
      const societyId = req.headers['x-society-id'];

      // If the society ID is empty and the endpoint does not require a specific role,
      // we do not care about checking their role or fetching the society. We assign the
      // user to the request and call the next handler
      if (typeof societyId !== 'string' && !role) {
        req.user = userData;
        return next();
      }

      if (typeof societyId !== 'string') {
        throw new AuthenticationError(
          'Invalid society ID. Check your headers.',
        );
      }

      // Make sure the society exists in our database
      const [societyData] = await db
        .select()
        .from(society)
        .where(eq(society.id, parseInt(societyId)));
      if (!userData) throw new AuthenticationError('Invalid society');

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
      if (!societyMemberData && !userData.admin)
        throw new Error('User does not have access to this society');

      // If this endpoint requires a specific role, check that the society member has this role or a role greater than the specified role
      // Also, allow any user with the god-mode flag to access any society, regardless of the societies they belong to
      if (
        role &&
        role !== 'admin' &&
        !hasAccess({ user: userData, requiredRole: role, role: societyMemberData?.role  })
      ) {
        throw new AuthenticationError(
          'Role is not able to access this resource.',
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

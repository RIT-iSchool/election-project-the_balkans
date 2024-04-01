import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../errors/AuthenticationError";
import { db } from "../db";
import { session, user } from "../db/schema";
import { eq } from "drizzle-orm";

export const auth = (admin: boolean) => {
  return async function(req: Request, res: Response, next: NextFunction) {
    try { 
      const cookie = req.cookies.session;
      if (!cookie) throw new AuthenticationError('Unauthorized');

      // TODO: Make sure session is not expired
      const [sessionData] = await db.select().from(session).where(eq(session.token, cookie));
      if (!sessionData) throw new AuthenticationError("Invalid headers");

      const [userData] = await db.select().from(user).where(eq(user.id, sessionData.userId));
      if (!userData) throw new AuthenticationError("Invalid user");

      if (admin && !userData.admin) {
        throw new AuthenticationError("Invalid permissions");
      }

      req.user = userData;

      next();
    } catch {
      throw new AuthenticationError("Unauthorized");
    }
  }
}
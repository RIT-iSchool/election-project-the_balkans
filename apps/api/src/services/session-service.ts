import { NextFunction, Request, Response } from 'express';
import * as session from '../controllers/session-controller';
import { db } from '../db';
import { society, societyMember } from '../db/schema';
import { eq } from 'drizzle-orm';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export const retrieve = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) throw new UnauthorizedError('Unauthorized');

    const societies = await db
      .select()
      .from(societyMember)
      .leftJoin(society, eq(society.id, societyMember.societyId))
      .where(eq(societyMember.userId, req.user.id));

    res.json({
      ...req.user,
      societies,
      role: req.role,
    });
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await session.remove({
      sessionToken: req.cookies.session,
    });

    res.clearCookie('session');
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

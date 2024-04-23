import { NextFunction, Request, Response } from 'express';
import * as session from '../controllers/session-controller';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export const retrieve = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) throw new UnauthorizedError('Unauthorized');

    const sessionData = await session.retrieve({
      sessionToken: req.cookies.session,
      userId: req.user.id,
    });

    res.json({
      ...sessionData,
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

import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as session from '../controllers/session-controller';

const SessionSchema = z.object({
  userId: z.number(),
  token: z.string(),
  expiresAt: z.date(),
});

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sessionData = SessionSchema.parse(req.body);

    const newSession = await session.create(sessionData);

    res.cookie('session', newSession.token, {
      maxAge: Date.now() + 1000 * 60 * 60 * 24 * 7 /* 1 week */,
    });
    res.json(newSession);
  } catch (err) {
    next(err);
  }
};

export const retrieve = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.json(req.user);
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
    res.sendStatus(202);
  } catch (err) {
    next(err);
  }
};

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
    const sessionTokenString = req.params.sessionToken;

    if (sessionTokenString === undefined) {
      return res.send(400).send('sessionToken is required');
    }

    await session.remove({
      sessionToken: sessionTokenString,
    });

    res.send(202);
  } catch (err) {
    next(err);
  }
};

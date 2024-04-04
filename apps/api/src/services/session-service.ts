import { NextFunction, Request, Response } from 'express';
import * as session from '../controllers/session-controller';

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

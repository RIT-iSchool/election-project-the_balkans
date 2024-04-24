import { Handler } from 'express';
import * as session from '../controllers/session-controller';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export const retrieve: Handler = async (req, res, next) => {
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

export const remove: Handler = async (req, res, next) => {
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

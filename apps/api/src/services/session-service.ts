import { Handler } from 'express';
import * as session from '../controllers/session-controller';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { BadRequestError } from '../errors/BadRequestError';

export const retrieve: Handler = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new UnauthorizedError('Unauthorized');
    }
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const sessionData = await session.retrieve({
      sessionToken: req.cookies.session,
      societyId: req.society.id,
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

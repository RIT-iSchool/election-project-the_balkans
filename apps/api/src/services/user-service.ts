import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as user from '../controllers/user-controller';

const UserSchema = z.object({
  email: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  admin: z.boolean().default(false),
});

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userData = UserSchema.parse(req.body);

    const newUser = await user.create({
      userData: {
        ...userData,
      },
    });

    res.send(newUser);
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
    const userIdString = req.params.userId;

    if (userIdString === undefined) {
      return res.send(400).send('userId are required');
    }

    const userIdNumber = parseInt(userIdString);

    if (isNaN(userIdNumber)) {
      return res.send(400).send('invalid userId');
    }

    const retrieveUser = await user.retrieve({
      userId: userIdNumber,
    });

    res.send(retrieveUser);
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    if (userEmail === undefined || userPassword === undefined) {
      return res.status(400).send('Invalid request body');
    }

    const loginUser = await user.login({
      email: userEmail,
      password: userPassword,
    });

    res.cookie('session', loginUser.token, {
      maxAge: Date.now() + 1000 * 60 * 60 * 24 * 7 /* 1 week */,
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

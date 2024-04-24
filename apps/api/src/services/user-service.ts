import { Handler } from 'express';
import { z } from 'zod';
import * as user from '../controllers/user-controller';

const UserSchema = z.object({
  email: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  admin: z.boolean().default(false),
});

export const create: Handler = async (req, res, next) => {
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

const UpdateUserParamsSchema = z.object({
  userId: z.string().transform((id) => parseInt(id)),
});

export const update: Handler = async (req, res, next) => {
  try {
    const { userId } = UpdateUserParamsSchema.parse(req.params);
    const userData = UserSchema.parse(req.body);

    const updatedUser = await user.update({
      userId: userId,
      userData: {
        ...userData,
      },
    });

    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
};

const RetrieveUserParamsSchema = z.object({
  userId: z.string().transform((id) => parseInt(id)),
});

export const retrieve: Handler = async (req, res, next) => {
  try {
    const { userId } = RetrieveUserParamsSchema.parse(req.params);

    const retrieveUser = await user.retrieve({
      userId: userId,
    });

    res.send(retrieveUser);
  } catch (err) {
    next(err);
  }
};

const ListUsersSchema = z.object({
  page: z.coerce.number().default(1),
});

export const list: Handler = async (req, res, next) => {
  try {
    const listUsersParams = ListUsersSchema.parse(req.query);
    const listUsers = await user.list(listUsersParams);

    res.send(listUsers);
  } catch (err) {
    next(err);
  }
};

const LoginParamsSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const login: Handler = async (req, res, next) => {
  try {
    const { email, password } = LoginParamsSchema.parse(req.body);

    const loginUser = await user.login({
      email: email,
      password: password,
    });

    res.cookie('session', loginUser.token, {
      maxAge: Date.now() + 1000 * 60 * 60 * 24 * 7 /* 1 week */,
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

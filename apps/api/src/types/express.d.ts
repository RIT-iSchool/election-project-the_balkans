import { Request } from 'express';
import { Society, User } from '../db/schema';

declare module 'express-serve-static-core' {
  interface Request {
    user: Omit<User, 'password'> | undefined;
    society: Society | undefined;
  }
}

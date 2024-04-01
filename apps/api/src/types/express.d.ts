import { Request } from 'express';
import { User } from '../db/schema';

declare module 'express-serve-static-core' {
  interface Request {
   user: User | undefined;
  }
}
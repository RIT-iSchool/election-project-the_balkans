import { NextFunction, Request, Response } from 'express';
import * as system from '../controllers/system-controller';

export const report = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const systemReport = await system.report();
    res.json(systemReport);
  } catch (err) {
    next(err);
  }
};

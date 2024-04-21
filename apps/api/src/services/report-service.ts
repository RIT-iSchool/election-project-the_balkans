import { NextFunction, Request, Response } from 'express';
import * as report from '../controllers/report-controller';
import { BadRequestError } from '../errors/BadRequestError';

export const society = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const societyReport = await report.society({ societyId: req.society.id });

    res.json(societyReport);
  } catch (err) {
    next(err);
  }
};

export const system = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const systemReport = await report.system();
    res.json(systemReport);
  } catch (err) {
    next(err);
  }
};

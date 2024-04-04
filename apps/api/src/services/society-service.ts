import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as society from '../controllers/society-controller';

const SocietySchema = z.object({
  name: z.string(),
  ownerId: z.number(),
});

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const societyData = SocietySchema.parse(req.body);

    const newSociety = await society.create({
      societyData: {
        ...societyData,
      },
    });

    res.send(newSociety);
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
    res.send(req.society);
  } catch (err) {
    next(err);
  }
};

import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as election from '../controllers/election-controller';

const ElectionSchema = z.object({
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  photoURL: z.string().optional(),
});

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Parse req body to make sure it is valid
    const electionData = ElectionSchema.parse(req.body);

    const newElection = await election.create({
      electionData: {
        ...electionData,
        societyId: res.locals.societyId,
      },
    });

    res.send(newElection);
  } catch (err) {
    next(err);
  }
};

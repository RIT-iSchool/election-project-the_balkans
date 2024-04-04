import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as electionOffice from '../controllers/election-office-controller';
import { BadRequestError } from '../errors/BadRequestError';

const ElectionOfficeSchema = z.object({
  electionId: z.number(),
  officeName: z.string(),
  maxVotes: z.number(),
});

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const electionOfficeData = ElectionOfficeSchema.parse(req.body);

    const newElectionOffice = await electionOffice.create({
      electionOfficeData: {
        ...electionOfficeData,
        societyId: req.society.id,
      },
    });

    res.send(newElectionOffice);
  } catch (err) {
    next(err);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const electionIdString = req.params.electionId;

    if (electionIdString === undefined) {
      return res.send(400).send('electionId is required');
    }

    const electionIdNumber = parseInt(electionIdString);

    if (isNaN(electionIdNumber)) {
      return res.send(400).send('invalid electionId');
    }

    const listElectionOffices = await electionOffice.list({
      electionId: electionIdNumber,
      societyId: req.society.id,
    });

    res.send(listElectionOffices);
  } catch (err) {
    next(err);
  }
};

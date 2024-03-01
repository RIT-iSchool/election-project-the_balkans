import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as electionOffice from '../controllers/election-office-controller';

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
    const electionOfficeData = ElectionOfficeSchema.parse(req.body);

    const newElectionOffice = await electionOffice.create({
      electionOfficeData: {
        ...electionOfficeData,
      },
    });

    res.send(newElectionOffice);
  } catch (err) {
    next(err);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const electionIdString = req.params.electionId;
    const societyIdString = req.params.societyId;

    if (electionIdString === undefined) {
      return res.send(400).send('electionId is required');
    }

    if (societyIdString === undefined) {
      return res.send(400).send('societyId is required');
    }

    const electionIdNumber = parseInt(electionIdString);
    const societyIdNumber = parseInt(societyIdString);

    if (isNaN(electionIdNumber)) {
      return res.send(400).send('invalid electionId');
    }

    if (isNaN(societyIdNumber)) {
      return res.send(400).send('invalid societyId');
    }

    const listElectionOffices = await electionOffice.list({
      electionId: electionIdNumber,
      societyId: societyIdNumber,
    });

    res.send(listElectionOffices);
  } catch (err) {
    next(err);
  }
};

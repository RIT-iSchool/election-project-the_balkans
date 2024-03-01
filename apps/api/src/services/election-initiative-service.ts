import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as electionInitiative from '../controllers/election-initiative-controller';

const ElectionInitiativeSchema = z.object({
  electionId: z.number(),
  initiativeName: z.string(),
  description: z.string(),
});

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const electionInitiativeData = ElectionInitiativeSchema.parse(req.body);

    const newElectionInitiative = await electionInitiative.create({
      electionInitiativeData: {
        ...electionInitiativeData,
      },
    });

    res.send(newElectionInitiative);
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

    const listElectionInitiatives = await electionInitiative.list({
      electionId: electionIdNumber,
      societyId: societyIdNumber,
    });

    res.send(listElectionInitiatives);
  } catch (err) {
    next(err);
  }
};

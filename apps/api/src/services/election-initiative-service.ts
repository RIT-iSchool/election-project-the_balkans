import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as electionInitiative from '../controllers/election-initiative-controller';
import { BadRequestError } from '../errors/BadRequestError';

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
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const electionInitiativeData = ElectionInitiativeSchema.parse(req.body);

    const newElectionInitiative = await electionInitiative.create({
      electionInitiativeData: {
        ...electionInitiativeData,
        societyId: req.society.id,
      },
    });

    res.send(newElectionInitiative);
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

    const listElectionInitiatives = await electionInitiative.list({
      electionId: electionIdNumber,
      societyId: req.society.id,
    });

    res.send(listElectionInitiatives);
  } catch (err) {
    next(err);
  }
};

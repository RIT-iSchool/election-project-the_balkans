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

const ListElectionInitiativesParamsSchema = z.object({
  election_id: z.string().transform((id) => parseInt(id)),
});

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { election_id: electionId } =
      ListElectionInitiativesParamsSchema.parse(req.params);

    const listElectionInitiatives = await electionInitiative.list({
      electionId,
      societyId: req.society.id,
    });

    res.send(listElectionInitiatives);
  } catch (err) {
    next(err);
  }
};

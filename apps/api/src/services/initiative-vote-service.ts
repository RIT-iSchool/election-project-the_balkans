import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as initiativeVote from '../controllers/initiative-vote-controller';

const InitiativeVoteSchema = z.object({
  memberId: z.number(),
  electionInitiativeId: z.number(),
  electionInitiativeOptionId: z.number(),
});

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const initiativeVoteData = InitiativeVoteSchema.parse(req.body);

    const newInitiativeVote = await initiativeVote.create({
      initiativeVoteData: {
        ...initiativeVoteData,
      },
    });

    res.send(newInitiativeVote);
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

    const listInitiativeVotes = await initiativeVote.list({
      electionId: electionIdNumber,
      societyId: societyIdNumber,
    });

    res.send(listInitiativeVotes);
  } catch (err) {
    next(err);
  }
};

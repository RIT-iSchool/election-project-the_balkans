import { NextFunction, Request, Response } from 'express';
import * as ballot from '../controllers/ballot-controller';
import { z } from 'zod';
import { AuthenticationError } from '../errors/AuthenticationError';

const BallotSchema = z.object({
  candidateVoteData: z.object({
    memberId: z.number(),
    electionMemberId: z.number(),
    electionCandidateId: z.number(),
  }),
  initiativeVoteData: z.object({
    memberId: z.number(),
    electionInitiativeId: z.number(),
    electionInitiativeOptionId: z.number(),
  }),
});

export const submit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const submitBallot = await ballot.submit(BallotSchema.parse(req.body));
    res.send(submitBallot);
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
    if (!req.society) throw new AuthenticationError('Society ID missing');

    const electionIdString = req.params.electionId;

    if (electionIdString === undefined) {
      return res.send(400).send('electionId is required');
    }

    const electionIdNumber = parseInt(electionIdString);

    if (isNaN(electionIdNumber)) {
      return res.send(400).send('invalid electionId');
    }

    const retrieveBallot = await ballot.retrieve({
      electionId: electionIdNumber,
      societyId: req.society.id,
    });

    res.send(retrieveBallot);
  } catch (err) {
    next(err);
  }
};

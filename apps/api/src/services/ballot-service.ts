import { NextFunction, Request, Response } from 'express';
import * as ballot from '../controllers/ballot-controller';
import { z } from 'zod';
import { AuthenticationError } from '../errors/AuthenticationError';

const BallotSchema = z.object({
  candidateVotesData: z.array(
    z.object({
      memberId: z.number(),
      electionMemberId: z.number(),
      electionCandidateId: z.number(),
    }),
  ),
  initiativeVotesData: z.array(
    z.object({
      memberId: z.number(),
      electionInitiativeId: z.number(),
      electionInitiativeOptionId: z.number(),
    }),
  ),
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

const RetrieveBallotParamsSchema = z.object({
  election_id: z.string().transform((id) => parseInt(id)),
});

export const retrieve = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.society) throw new AuthenticationError('Society ID missing');

    const { election_id: electionId } = RetrieveBallotParamsSchema.parse(
      req.params,
    );

    const retrieveBallot = await ballot.retrieve({
      electionId,
      societyId: req.society.id,
    });

    res.send(retrieveBallot);
  } catch (err) {
    next(err);
  }
};

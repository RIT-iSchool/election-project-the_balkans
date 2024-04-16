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
  electionId: z.number(),
  writeIn: z
    .object({
      electionOfficeId: z.number(),
      name: z.string(),
    })
    .optional(),
});

export const submit = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.society) throw new AuthenticationError('Society ID missing');
    const submitBallotData = BallotSchema.parse(req.body);

    const submitBallot = await ballot.submit({
      candidateVotesData: submitBallotData.candidateVotesData,
      initiativeVotesData: submitBallotData.initiativeVotesData,
      electionId: submitBallotData.electionId,
      societyId: req.society.id,
      writeIn: submitBallotData.writeIn
        ? {
            electionOfficeId: submitBallotData.writeIn?.electionOfficeId,
            name: submitBallotData.writeIn?.name,
            societyId: req.society.id,
            description: '',
          }
        : undefined,
    });

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

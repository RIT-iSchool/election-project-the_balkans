import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as candidateVote from '../controllers/candidate-vote-controller';

const CandidateVoteSchema = z.object({
  memberId: z.number(),
  electionCandidateId: z.number(),
});

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const candidateVoteData = CandidateVoteSchema.parse(req.body);

    const newCandidateVote = await candidateVote.create({
      candidateVoteData: {
        ...candidateVoteData,
      },
    });

    res.send(newCandidateVote);
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

    const listCandidateVotes = await candidateVote.list({
      electionId: electionIdNumber,
      societyId: societyIdNumber,
    });

    res.send(listCandidateVotes);
  } catch (err) {
    next(err);
  }
};

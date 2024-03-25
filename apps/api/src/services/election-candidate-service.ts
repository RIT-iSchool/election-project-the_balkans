import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as electionCandidate from '../controllers/election-candidate-controller';

const ElectionCandidateSchema = z.object({
  electionOfficeId: z.number(),
  name: z.string(),
  photoURL: z.string().optional(),
  description: z.string(),
});

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const electionCandidateData = ElectionCandidateSchema.parse(req.body);

    const newElectionCandidate = await electionCandidate.create({
      electionCandidateData: {
        ...electionCandidateData,
      },
    });

    res.send(newElectionCandidate);
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

    const listElectionCandidates = await electionCandidate.list({
      electionId: electionIdNumber,
      societyId: societyIdNumber,
    });

    res.send(listElectionCandidates);
  } catch (err) {
    next(err);
  }
};

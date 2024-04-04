import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as electionCandidate from '../controllers/election-candidate-controller';
import { BadRequestError } from '../errors/BadRequestError';

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
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const electionCandidateData = ElectionCandidateSchema.parse(req.body);

    const newElectionCandidate = await electionCandidate.create({
      electionCandidateData: {
        ...electionCandidateData,
        societyId: req.society.id,
      },
    });

    res.send(newElectionCandidate);
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

    const listElectionCandidates = await electionCandidate.list({
      electionId: electionIdNumber,
      societyId: req.society.id,
    });

    res.send(listElectionCandidates);
  } catch (err) {
    next(err);
  }
};

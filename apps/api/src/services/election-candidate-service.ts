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

const ListElectionCandidateParamsSchema = z.object({
  election_id: z.string().transform((id) => parseInt(id)),
});

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { election_id: electionId } = ListElectionCandidateParamsSchema.parse(
      req.params,
    );

    const listElectionCandidates = await electionCandidate.list({
      electionId,
      societyId: req.society.id,
    });

    res.send(listElectionCandidates);
  } catch (err) {
    next(err);
  }
};

const RetrieveElectionCandidateParamsSchema = z.object({
  election_id: z.string().transform((id) => parseInt(id)),
  electionOfficeId: z.number(),
  name: z.string(),
});

export const retrieve = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const electionCandidateData = RetrieveElectionCandidateParamsSchema.parse(
      req.body,
    );

    const retrieveElectionCandidate = await electionCandidate.retrieve({
      name: electionCandidateData.name,
      electionOfficeId: electionCandidateData.electionOfficeId,
      electionId: electionCandidateData.election_id,
      societyId: req.society.id,
    });

    res.send(retrieveElectionCandidate);
  } catch (err) {
    next(err);
  }
};

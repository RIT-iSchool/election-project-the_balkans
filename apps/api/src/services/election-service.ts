import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as election from '../controllers/election-controller';
import { BadRequestError } from '../errors/BadRequestError';

const ElectionSchema = z.object({
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  photoURL: z.string().optional(),
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

    // Parse req body to make sure it is valid
    const electionData = ElectionSchema.parse(req.body);

    const newElection = await election.create({
      electionData: {
        ...electionData,
        societyId: req.society.id,
      },
    });

    res.send(newElection);
  } catch (err) {
    next(err);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const listElections = await election.list({
      societyId: req.society.id,
      admin: req.role !== 'member',
    });

    res.send(listElections);
  } catch (err) {
    next(err);
  }
};

const RetrieveElectionParamsSchema = z.object({
  election_id: z.string().transform((id) => parseInt(id)),
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

    const { election_id: electionId } = RetrieveElectionParamsSchema.parse(
      req.params,
    );

    const retrieveElection = await election.retrieve({
      electionId,
      societyId: req.society.id,
    });

    res.send(retrieveElection);
  } catch (err) {
    next(err);
  }
};

const UpdateElectionParamsSchema = z.object({
  election_id: z.string().transform((id) => parseInt(id)),
});

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    // Parse req body to make sure it is valid
    const electionData = ElectionSchema.parse(req.body);
    const { election_id: electionId } = UpdateElectionParamsSchema.parse(
      req.params,
    );

    const updateElection = await election.update({
      electionData,
      electionId,
      societyId: req.society.id,
    });

    res.send(updateElection);
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

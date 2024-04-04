import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as election from '../controllers/election-controller';
import { BadRequestError } from '../errors/BadRequestError';

const ElectionSchema = z.object({
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
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
    });

    res.send(listElections);
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

    const retrieveElection = await election.retrieve({
      electionId: electionIdNumber,
      societyId: req.society.id,
    });

    res.send(retrieveElection);
  } catch (err) {
    next(err);
  }
};

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

    const updateElection = await election.create({
      electionData: {
        ...electionData,
        societyId: res.locals.societyId,
      },
    });

    res.send(updateElection);
  } catch (err) {
    next(err);
  }
};

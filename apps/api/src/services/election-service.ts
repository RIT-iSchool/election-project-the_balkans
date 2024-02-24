import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as election from '../controllers/election-controller';

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
    // Parse req body to make sure it is valid
    const electionData = ElectionSchema.parse(req.body);

    const newElection = await election.create({
      electionData: {
        ...electionData,
        societyId: res.locals.societyId,
      },
    });

    res.send(newElection);
  } catch (err) {
    next(err);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const societyIdString = req.params.societyId;

    if (societyIdString === undefined) {
      return res.send(400).send('societyId is required');
    }

    const societyIdNumber = parseInt(societyIdString);

    if (isNaN(societyIdNumber)) {
      return res.send(400).send('invalid societyId');
    }

    const listElection = await election.list({
      societyId: societyIdNumber,
    });

    res.send(listElection);
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
    const societyIdString = req.params.societyId;
    const electionIdString = req.params.electionId;

    if (societyIdString === undefined || electionIdString === undefined) {
      return res.send(400).send('societyId and electionId are required');
    }

    const societyIdNumber = parseInt(societyIdString);
    const electionIdNumber = parseInt(electionIdString);

    if (isNaN(societyIdNumber) || isNaN(electionIdNumber)) {
      return res.send(400).send('invalid societyId or electionId');
    }

    const retrieveElection = await election.retrieve({
      societyId: societyIdNumber,
      electionId: electionIdNumber,
    });

    res.send(retrieveElection);
  } catch (err) {
    next(err);
  }
};

import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as initiativeOption from '../controllers/initiative-option-controller';
import { BadRequestError } from '../errors/BadRequestError';

const InitiativeOptionSchema = z.object({
  electionInitiativeId: z.number(),
  title: z.string(),
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

    const initiativeOptionData = InitiativeOptionSchema.parse(req.body);

    const newInitiativeOption = await initiativeOption.create({
      initiativeOptionData: {
        ...initiativeOptionData,
        societyId: req.society.id,
      },
    });

    res.send(newInitiativeOption);
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

    const listInitiativeOptions = await initiativeOption.list({
      electionId: electionIdNumber,
      societyId: req.society.id,
    });

    res.send(listInitiativeOptions);
  } catch (err) {
    next(err);
  }
};

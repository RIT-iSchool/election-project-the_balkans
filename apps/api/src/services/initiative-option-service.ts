import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as initiativeOption from '../controllers/initiative-option-controller';

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
    const initiativeOptionData = InitiativeOptionSchema.parse(req.body);

    const newInitiativeOption = await initiativeOption.create({
      initiativeOptionData: {
        ...initiativeOptionData,
      },
    });

    res.send(newInitiativeOption);
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

    const listInitiativeOptions = await initiativeOption.list({
      electionId: electionIdNumber,
      societyId: societyIdNumber,
    });

    res.send(listInitiativeOptions);
  } catch (err) {
    next(err);
  }
};

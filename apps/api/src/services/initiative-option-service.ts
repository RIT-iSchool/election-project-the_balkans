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

const ListInitiativeOptionsParamsSchema = z.object({
  election_id: z.string().transform((id) => parseInt(id)),
});

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { election_id: electionId } = ListInitiativeOptionsParamsSchema.parse(
      req.params,
    );

    const listInitiativeOptions = await initiativeOption.list({
      electionId,
      societyId: req.society.id,
    });

    res.send(listInitiativeOptions);
  } catch (err) {
    next(err);
  }
};

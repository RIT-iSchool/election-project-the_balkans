import { Handler } from 'express';
import { z } from 'zod';
import * as initiativeOption from '../controllers/initiative-option-controller';
import { BadRequestError } from '../errors/BadRequestError';

const InitiativeOptionSchema = z.object({
  electionInitiativeId: z.number(),
  title: z.string(),
});

export const create: Handler = async (req, res, next) => {
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

export const list: Handler = async (req, res, next) => {
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

const RetrieveInitiativeOptionParamsSchema = z.object({
  initiative_option_id: z.string().transform((id) => parseInt(id)),
});

export const retrieve: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { initiative_option_id: initiativeOptionId } =
      RetrieveInitiativeOptionParamsSchema.parse(req.params);

    const retrieveInitiativeOption = await initiativeOption.retrieve({
      initiativeOptionId,
    });

    res.send(retrieveInitiativeOption);
  } catch (err) {
    next(err);
  }
};

const UpdateInitiativeOptionParamsSchema = z.object({
  initiative_option_id: z.string().transform((id) => parseInt(id)),
});

export const update: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { initiative_option_id: initiativeOptionId } =
      UpdateInitiativeOptionParamsSchema.parse(req.params);

    const initiativeOptionData = InitiativeOptionSchema.parse(req.body);

    const updatedInitiativeOption = await initiativeOption.update({
      initiativeOptionId,
      initiativeOptionData: {
        ...initiativeOptionData,
      },
    });

    res.send(updatedInitiativeOption);
  } catch (err) {
    next(err);
  }
};

import { Handler } from 'express';
import { z } from 'zod';
import * as initiativeOption from '../controllers/initiative-option-controller';
import { BadRequestError } from '../errors/BadRequestError';

const InitiativeOptionParamsSchema = z.object({
  initiative_id: z.string().transform((id) => parseInt(id)),
});

const InitiativeOptionSchema = z.object({
  title: z.string(),
});

export const create: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { initiative_id: initiativeId } = InitiativeOptionParamsSchema.parse(
      req.params,
    );
    const { title } = InitiativeOptionSchema.parse(req.body);

    const newInitiativeOption = await initiativeOption.create({
      initiativeOptionData: {
        title,
        electionInitiativeId: initiativeId,
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
  initiative_id: z.string().transform((id) => parseInt(id)),
});

export const list: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { election_id: electionId, initiative_id: initiativeId } =
      ListInitiativeOptionsParamsSchema.parse(req.params);

    const listInitiativeOptions = await initiativeOption.list({
      electionId,
      initiativeId,
      societyId: req.society.id,
    });

    res.send(listInitiativeOptions);
  } catch (err) {
    next(err);
  }
};

const RetrieveInitiativeOptionParamsSchema = z.object({
  option_id: z.string().transform((id) => parseInt(id)),
  initiative_id: z.string().transform((id) => parseInt(id)),
});

export const retrieve: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { option_id: initiativeOptionId, initiative_id: initiativeId } =
      RetrieveInitiativeOptionParamsSchema.parse(req.params);

    const retrieveInitiativeOption = await initiativeOption.retrieve({
      initiativeOptionId,
      initiativeId,
      societyId: req.society.id,
    });

    res.send(retrieveInitiativeOption);
  } catch (err) {
    next(err);
  }
};

const UpdateInitiativeOptionParamsSchema = z.object({
  option_id: z.string().transform((id) => parseInt(id)),
  initiative_id: z.string().transform((id) => parseInt(id)),
});

export const update: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { option_id: initiativeOptionId, initiative_id: initiativeId } =
      UpdateInitiativeOptionParamsSchema.parse(req.params);

    const initiativeOptionData = InitiativeOptionSchema.parse(req.body);

    const updatedInitiativeOption = await initiativeOption.update({
      initiativeOptionId,
      initiativeId,
      societyId: req.society.id,
      initiativeOptionData: {
        ...initiativeOptionData,
      },
    });

    res.send(updatedInitiativeOption);
  } catch (err) {
    next(err);
  }
};

const RemoveInitiativeOptionParamsSchema = z.object({
  option_id: z.string().transform((id) => parseInt(id)),
  initiative_id: z.string().transform((id) => parseInt(id)),
});

export const remove: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { option_id: initiativeOptionId, initiative_id: initiativeId } =
      RemoveInitiativeOptionParamsSchema.parse(req.params);

    await initiativeOption.remove({
      initiativeOptionId,
      initiativeId,
      societyId: req.society.id,
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

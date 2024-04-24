import { Handler } from 'express';
import { z } from 'zod';
import * as electionInitiative from '../controllers/election-initiative-controller';
import { BadRequestError } from '../errors/BadRequestError';

const ElectionInitiativeSchema = z.object({
  electionId: z.number(),
  initiativeName: z.string(),
  description: z.string(),
});

export const create: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const electionInitiativeData = ElectionInitiativeSchema.parse(req.body);

    const newElectionInitiative = await electionInitiative.create({
      electionInitiativeData: {
        ...electionInitiativeData,
        societyId: req.society.id,
      },
    });

    res.send(newElectionInitiative);
  } catch (err) {
    next(err);
  }
};

const ListElectionInitiativesParamsSchema = z.object({
  election_id: z.string().transform((id) => parseInt(id)),
});

export const list: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { election_id: electionId } =
      ListElectionInitiativesParamsSchema.parse(req.params);

    const listElectionInitiatives = await electionInitiative.list({
      electionId,
      societyId: req.society.id,
    });

    res.send(listElectionInitiatives);
  } catch (err) {
    next(err);
  }
};

const RetrieveElectionInitiativeParamsSchema = z.object({
  election_initiative_id: z.string().transform((id) => parseInt(id)),
});

export const retrieve: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { election_initiative_id: electionInitiativeId } =
      RetrieveElectionInitiativeParamsSchema.parse(req.params);

    const retrieveElectionInitiative = await electionInitiative.retrieve({
      electionInitiativeId,
    });

    res.send(retrieveElectionInitiative);
  } catch (err) {
    next(err);
  }
};

const UpdateElectionInitiativeParamsSchema = z.object({
  election_initiative_id: z.string().transform((id) => parseInt(id)),
});

export const update: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { election_initiative_id: electionInitiativeId } =
      UpdateElectionInitiativeParamsSchema.parse(req.params);

    const electionInitiativeData = ElectionInitiativeSchema.parse(req.body);

    const updatedElectionInitiative = await electionInitiative.update({
      electionInitiativeId,
      electionInitiativeData: electionInitiativeData,
    });

    res.send(updatedElectionInitiative);
  } catch (err) {
    next(err);
  }
};

const RemoveElectionInitiativeParamsSchema = z.object({
  election_initiative_id: z.string().transform((id) => parseInt(id)),
});

export const remove: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { election_initiative_id: electionInitiativeId } =
      RemoveElectionInitiativeParamsSchema.parse(req.params);

    await electionInitiative.remove({
      electionInitiativeId,
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

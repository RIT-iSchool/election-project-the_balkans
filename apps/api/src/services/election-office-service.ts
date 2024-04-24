import { Handler } from 'express';
import { z } from 'zod';
import * as electionOffice from '../controllers/election-office-controller';
import { BadRequestError } from '../errors/BadRequestError';

const ElectionOfficeSchema = z.object({
  electionId: z.number(),
  officeName: z.string(),
  maxVotes: z.number(),
});

export const create: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const electionOfficeData = ElectionOfficeSchema.parse(req.body);

    const newElectionOffice = await electionOffice.create({
      electionOfficeData: {
        ...electionOfficeData,
        societyId: req.society.id,
      },
    });

    res.send(newElectionOffice);
  } catch (err) {
    next(err);
  }
};

const ListElectionOfficesParamsSchema = z.object({
  election_id: z.string().transform((id) => parseInt(id)),
});

export const list: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { election_id: electionId } = ListElectionOfficesParamsSchema.parse(
      req.params,
    );

    const listElectionOffices = await electionOffice.list({
      electionId,
      societyId: req.society.id,
    });

    res.send(listElectionOffices);
  } catch (err) {
    next(err);
  }
};

const RetrieveElectionOfficeParamsSchema = z.object({
  election_office_id: z.string().transform((id) => parseInt(id)),
});

export const retrieve: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { election_office_id: electionOfficeId } =
      RetrieveElectionOfficeParamsSchema.parse(req.params);

    const retrieveElectionOffice = await electionOffice.retrieve({
      electionOfficeId,
    });

    res.send(retrieveElectionOffice);
  } catch (err) {
    next(err);
  }
};

const UpdateElectionOfficeParamsSchema = z.object({
  election_office_id: z.string().transform((id) => parseInt(id)),
});

export const update: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { election_office_id: electionOfficeId } =
      UpdateElectionOfficeParamsSchema.parse(req.params);

    const electionOfficeData = ElectionOfficeSchema.parse(req.body);

    const updatedElectionOffice = await electionOffice.update({
      electionOfficeId,
      electionOfficeData,
    });

    res.send(updatedElectionOffice);
  } catch (err) {
    next(err);
  }
};

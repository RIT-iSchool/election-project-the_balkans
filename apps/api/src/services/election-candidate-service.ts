import { Handler } from 'express';
import { z } from 'zod';
import * as electionCandidate from '../controllers/election-candidate-controller';
import { BadRequestError } from '../errors/BadRequestError';

const ElectionCandidateSchema = z.object({
  name: z.string(),
  photoURL: z.string().optional(),
  description: z.string(),
});

const CreateElectionCandidateSchema = z.object({
  office_id: z.string().transform((id) => parseInt(id)),
});

export const create: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { office_id: officeId } = CreateElectionCandidateSchema.parse(
      req.params,
    );
    const electionCandidateData = ElectionCandidateSchema.parse(req.body);

    const newElectionCandidate = await electionCandidate.create({
      electionCandidateData: {
        ...electionCandidateData,
        electionOfficeId: officeId,
        societyId: req.society.id,
      },
    });

    res.send(newElectionCandidate);
  } catch (err) {
    next(err);
  }
};

const ListElectionCandidateParamsSchema = z.object({
  election_id: z.string().transform((id) => parseInt(id)),
  office_id: z.string().transform((id) => parseInt(id)),
});

export const list: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { election_id: electionId, office_id: officeId } =
      ListElectionCandidateParamsSchema.parse(req.params);

    const listElectionCandidates = await electionCandidate.list({
      electionId,
      officeId,
      societyId: req.society.id,
    });

    res.send(listElectionCandidates);
  } catch (err) {
    next(err);
  }
};

const RetrieveElectionCandidateParamsSchema = z.object({
  election_id: z.string().transform((id) => parseInt(id)),
  office_id: z.string().transform((id) => parseInt(id)),
  candidate_id: z.string().transform((id) => parseInt(id)),
});

export const retrieve: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const {
      candidate_id: electionCandidateId,
      election_id: electionId,
      office_id: officeId,
    } = RetrieveElectionCandidateParamsSchema.parse(req.params);

    const retrieveElectionCandidate = await electionCandidate.retrieve({
      electionCandidateId,
      officeId,
      electionId,
      societyId: req.society.id,
    });

    res.send(retrieveElectionCandidate);
  } catch (err) {
    next(err);
  }
};

const UpdateElectionCandidateParamsSchema = z.object({
  office_id: z.string().transform((id) => parseInt(id)),
  candidate_id: z.string().transform((id) => parseInt(id)),
});

export const update: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { candidate_id: electionCandidateId, office_id: officeId } =
      UpdateElectionCandidateParamsSchema.parse(req.params);

    const electionCandidateData = ElectionCandidateSchema.parse(req.body);

    const updatedElectionCandidate = await electionCandidate.update({
      electionCandidateId,
      officeId,
      societyId: req.society.id,
      electionCandidateData: {
        ...electionCandidateData,
      },
    });

    res.send(updatedElectionCandidate);
  } catch (err) {
    next(err);
  }
};

const RemoveElectionCandidateParamsSchema = z.object({
  office_id: z.string().transform((id) => parseInt(id)),
  candidate_id: z.string().transform((id) => parseInt(id)),
});

export const remove: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { office_id: officeId, candidate_id: candidateId } =
      RemoveElectionCandidateParamsSchema.parse(req.params);

    await electionCandidate.remove({
      officeId,
      candidateId,
      societyId: req.society.id,
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

import { Handler } from 'express';
import * as ballot from '../controllers/ballot-controller';
import { z } from 'zod';
import { AuthenticationError } from '../errors/AuthenticationError';
import { db } from '../db';
import { societyMember } from '../db/schema';
import { and, eq } from 'drizzle-orm';
import { UnauthorizedError } from '../errors/UnauthorizedError';

const WriteInSchema = z.object({
  officeId: z.number(),
  name: z.string(),
});

const OfficeSchema = z.object({
  candidates: z.array(z.number()),
  writeIn: WriteInSchema.optional(),
});

const OfficeVotesSchema = z.record(OfficeSchema);

const InitiativeVotesSchema = z.record(z.number());

const BallotSchema = z.object({
  officeVotes: OfficeVotesSchema,
  initiativeVotes: InitiativeVotesSchema,
  electionId: z.string().transform((id) => parseInt(id)),
});

export const submit: Handler = async (req, res, next) => {
  try {
    if (!req.society) throw new AuthenticationError('Society ID missing');
    if (!req.user) throw new UnauthorizedError('Not logged in');
    const submitBallotData = BallotSchema.parse(req.body);

    const [member] = await db
      .select()
      .from(societyMember)
      .where(
        and(
          eq(societyMember.userId, req.user.id),
          eq(societyMember.societyId, req.society.id),
        ),
      );

    if (!member) {
      throw new UnauthorizedError('Not a member of this society');
    }

    await ballot.submit(submitBallotData, member.id, req.society.id);

    res.send(202);
  } catch (err) {
    next(err);
  }
};

const RetrieveBallotParamsSchema = z.object({
  election_id: z.string().transform((id) => parseInt(id)),
});

export const retrieve: Handler = async (req, res, next) => {
  try {
    if (!req.society) throw new AuthenticationError('Society ID missing');

    const { election_id: electionId } = RetrieveBallotParamsSchema.parse(
      req.params,
    );

    const retrieveBallot = await ballot.retrieve({
      electionId,
      societyId: req.society.id,
    });

    res.send(retrieveBallot);
  } catch (err) {
    next(err);
  }
};

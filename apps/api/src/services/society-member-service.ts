import { Handler } from 'express';
import { z } from 'zod';
import * as societyMember from '../controllers/society-member-controller';
import { BadRequestError } from '../errors/BadRequestError';

const SocietyMemberSchema = z.object({
  userId: z.number(),
  societyId: z.number(),
  role: z.enum(['member', 'officer', 'employee']),
});

export const create: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const societyMemberData = SocietyMemberSchema.parse(req.body);

    const newSocietyMember = await societyMember.create({
      societyMemberData: {
        ...societyMemberData,
      },
      societyId: req.society.id,
    });

    res.send(newSocietyMember);
  } catch (err) {
    next(err);
  }
};

const ListSocietyMembersSchema = z.object({
  page: z.coerce.number().default(1),
});

export const list: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const { page } = ListSocietyMembersSchema.parse(req.query);

    const listSocietyMember = await societyMember.list({
      societyId: req.society.id,
      page,
    });

    res.send(listSocietyMember);
  } catch (err) {
    next(err);
  }
};

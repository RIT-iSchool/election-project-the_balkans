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

export const list: Handler = async (req, res, next) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const listSocietyMember = await societyMember.list({
      societyId: req.society.id,
    });

    res.send(listSocietyMember);
  } catch (err) {
    next(err);
  }
};

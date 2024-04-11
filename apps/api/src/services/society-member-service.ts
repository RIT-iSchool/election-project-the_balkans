import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as societyMember from '../controllers/society-member-controller';
import { BadRequestError } from '../errors/BadRequestError';

const SocietyMemberSchema = z.object({
  userId: z.number(),
  societyId: z.number(),
  role: z.enum(['member', 'officer', 'employee']),
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

const ListSocietyMembersParams = z.object({
  society_id: z.string().transform((id) => parseInt(id)),
});

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { society_id } = ListSocietyMembersParams.parse(req.params);

    const listSocietyMember = await societyMember.list({
      societyId: society_id,
    });

    res.send(listSocietyMember);
  } catch (err) {
    next(err);
  }
};

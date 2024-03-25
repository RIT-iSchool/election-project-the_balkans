import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as societyMember from '../controllers/society-member-controller';

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
    const societyMemberData = SocietyMemberSchema.parse(req.body);

    const newSocietyMember = await societyMember.create({
      societyMemberData: {
        ...societyMemberData,
      },
      societyId: res.locals.societyId,
    });

    res.send(newSocietyMember);
  } catch (err) {
    next(err);
  }
};

export const retrieve = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const societyMemberIdString = req.params.societyMemberId;
    const societyIdString = req.params.societyId;

    if (societyMemberIdString === undefined || societyIdString === undefined) {
      return res.send(400).send('societyMemberId and societyId are required');
    }

    const societyMemberIdNumber = parseInt(societyMemberIdString);
    const societyIdNumber = parseInt(societyIdString);

    if (isNaN(societyMemberIdNumber) || isNaN(societyIdNumber)) {
      return res.send(400).send('invalid societyMemberId or societyId');
    }

    const retrieveSocietyMember = await societyMember.retrieve({
      societyMemberId: societyMemberIdNumber,
      societyId: societyIdNumber,
    });

    res.send(retrieveSocietyMember);
  } catch (err) {
    next(err);
  }
};

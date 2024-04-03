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

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const societyIdString = req.params.societyId;

    if (societyIdString === undefined) {
      return res.send(400).send('societyId is required');
    }

    const societyIdNumber = parseInt(societyIdString);

    if (isNaN(societyIdNumber)) {
      return res.send(400).send('invalid societyId');
    }

    const listSocietyMember = await societyMember.list({
      societyId: societyIdNumber,
    });

    res.send(listSocietyMember);
  } catch (err) {
    next(err);
  }
};

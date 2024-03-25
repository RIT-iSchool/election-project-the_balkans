import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as society from '../controllers/society-controller';

const SocietySchema = z.object({
  name: z.string(),
  owner: z.number(),
});

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const societyData = SocietySchema.parse(req.body);

    const newSociety = await society.create({
      societyData: {
        ...societyData,
      },
    });

    res.send(newSociety);
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
    const societyIdString = req.params.societyId;

    if (societyIdString === undefined) {
      return res.send(400).send('societyId are required');
    }

    const societyIdNumber = parseInt(societyIdString);

    if (isNaN(societyIdNumber)) {
      return res.send(400).send('invalid societyId');
    }

    const retrieveSocietyMember = await society.retrieve({
      societyId: societyIdNumber,
    });

    res.send(retrieveSocietyMember);
  } catch (err) {
    next(err);
  }
};

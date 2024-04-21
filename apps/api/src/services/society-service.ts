import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import * as society from '../controllers/society-controller';
import { BadRequestError } from '../errors/BadRequestError';

const SocietySchema = z.object({
  name: z.string(),
  ownerId: z.number(),
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

const RetrieveSocietyParams = z.object({
  society_id: z.string().transform((id) => parseInt(id)),
});

export const retrieve = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { society_id } = RetrieveSocietyParams.parse(req.params);

    const societyData = await society.retrieve({ societyId: society_id });

    res.json(societyData);
  } catch (err) {
    next(err);
  }
};

const ListSocietiesSchema = z.object({
  search: z.string().optional(),
});

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = ListSocietiesSchema.parse(req.query);
    const listSocieties = await society.list({ search });

    res.send(listSocieties);
  } catch (err) {
    next(err);
  }
};

export const report = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.society) {
      throw new BadRequestError('Society ID missing from headers');
    }

    const societyReport = await society.report({ societyId: req.society.id });

    res.json(societyReport);
  } catch (err) {
    next(err);
  }
};

import { Handler } from 'express';
import fs from 'fs/promises';
import path from 'path';
import z from 'zod';

export const create: Handler = (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }

  res.send({ fileName: req.file.filename });
};

const RetrieveFileParamsSchema = z.object({
  type: z.string(),
  file_path: z.string(),
});

export const retrieve: Handler = async (req, res, next) => {
  try {
    const { type, file_path } = RetrieveFileParamsSchema.parse(req.params);
    let basePath = process.env.FILE_UPLOAD_DIRECTORY as string;

    if (type === 'election') {
      basePath += 'elections/';
    } else if (type === 'candidate') {
      basePath += 'candidates/';
    }

    const filePath = path.join(basePath, file_path);
    const fileData = await fs.readFile(filePath);

    res.send(fileData);
  } catch (err) {
    next(err);
  }
};

import auditLogger from 'express-requests-logger';
import { logger } from '../lib/logger';

export const audit = auditLogger({
  logger,
  request: {
    maskBody: ['password'],
    excludeHeaders: ['*'],
  },
  response: {
    maskHeaders: ['set-cookie'],
    excludeBody: ['*'],
    excludeHeaders: ['*'],
  },
});

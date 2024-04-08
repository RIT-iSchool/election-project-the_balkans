import bunyan from 'bunyan';
import path from 'path';

export const logger = bunyan.createLogger({
  name: 'american-dream-api',
  streams: [
    {
      level: 'info',
      stream: process.stdout,
    },
    {
      type: 'rotating-file',
      path: path.join(process.cwd(), 'logs', 'american-dream.log'),
      period: '1d',
    },
  ],
});

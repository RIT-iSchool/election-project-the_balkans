import bunyan from 'bunyan';
import path from 'path';

export const logger = bunyan.createLogger({
  name: 'american-dream-api',
  streams: [
    {
      type: 'rotating-file',
      path: path.join(process.cwd(), '../../var/logs', 'american-dream.log'),
      period: '1d',
    },
  ],
});

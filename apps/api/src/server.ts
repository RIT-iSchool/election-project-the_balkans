import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { apiReference } from '@scalar/express-api-reference';
import { router } from './router';
import { AuthenticationError } from './errors/AuthenticationError';
import cookieParser from 'cookie-parser';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { BadRequestError } from './errors/BadRequestError';

const PORT = process.env.port || 3001;

// Initialize app
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://cdn.jsdelivr.net'],
    },
  }),
);

// Log requests if not running tests
if (!process.env.TEST) app.use(morgan('dev'));

// API Routes
app.use(router);

// Docs
app.use(
  '/api-docs',
  apiReference({
    spec: {
      content: require('@repo/openapi-spec/spec.json'),
    },
  }),
);

// Internal docs
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/', (_req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html')),
);

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AuthenticationError || err instanceof BadRequestError) {
    return res.status(400).json({
      error: true,
      message: err.message,
    });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(401).json({
      error: true,
      message: err.message,
    });
  }

  // If we reach this statement, it means the application has an unhandled error. It should be logged.
  console.error(err);

  next();
});

// Listen for requests
export const server = app.listen(PORT, () => {
  if (!process.env.TEST) {
    console.log(`Listening on port ${PORT}`);
  }
});

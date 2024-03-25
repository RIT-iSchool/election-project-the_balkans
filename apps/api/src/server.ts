import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { apiReference } from '@scalar/express-api-reference';
import { router } from './router';
import { AuthenticationError } from './errors/AuthenticationError';

const PORT = process.env.port || 3001;

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://cdn.jsdelivr.net'],
    },
  }),
);
app.use(morgan('dev'));

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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AuthenticationError) {
    return res.status(400).json({
      error: true,
      message: err.message
    })
  }

  next();
})


// Listen for requests
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { apiReference } from '@scalar/express-api-reference';

const PORT = process.env.port || 3000;

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Default policy for loading content. 'self' refers to the current origin.
      scriptSrc: ["'self'", 'https://cdn.jsdelivr.net'], // Allows scripts from the current origin and cdn.jsdelivr.net.
    },
  }),
);
app.use(morgan('dev'));

// Docs
app.use(
  '/docs',
  apiReference({
    spec: {
      content: require('@repo/openapi-spec/spec.json'),
    },
  }),
);

// Listen for requests
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

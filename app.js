const fastify = require('fastify');
const dotenv = require('dotenv');
const cors = require('@fastify/cors');
const authenticate = require('./plugins/authenticate');
const db = require('./plugins/db');
const path = require('path');
const DistPath = path.join(__dirname, 'client', 'dist');

dotenv.config();

const build = (opts = {}) => {
  const app = fastify(opts);

  // add cors
  app.register(cors);

  app.register(require('fastify-auth0-verify'), {
    domain: process.env.AUTH0_DOMAIN,
    audience: process.env.AUTH0_AUDIENCE,
  });
  app.register(authenticate);

  if (process.env.NODE_ENV === 'production') {
    app.register(require('@fastify/static'), {
      root: DistPath,
    });
  }

  // add db plugin
  app.register(db);

  // register home route
  app.get('/', (_, reply) => {
    reply.send({ message: 'Hello! Go to /api/quotes instead' });
  });

  // register routes
  app.register(require('./routes/quotes'), { prefix: '/api/quotes' });

  return app;
};

module.exports = build;

const fastify = require('fastify');
const dotenv = require('dotenv');
const cors = require('@fastify/cors');
const db = require('./plugins/db');
const path = require('path');
const DistPath = path.join(__dirname, 'client', 'build');

dotenv.config();

const build = (opts = {}) => {
  const app = fastify(opts);

  // add cors
  app.register(cors);

  app.register(require('fastify-auth0-verify'), {
    domain: process.env.REACT_APP_DOMAIN,
    audience: process.env.AUTH0_AUDIENCE,
  });

  // add db plugin
  app.register(db);

  // register routes
  app.register(require('./routes/quotes'), { prefix: '/api/quotes' });

  if (process.env.NODE_ENV === 'production') {
    app.register(require('@fastify/static'), {
      root: DistPath,
    });
  }

  app.get('/', (request, reply) => {
    try {
      reply.sendFile('index.html');
    } catch (e) {
      console.log(e);
    }
  });

  return app;
};

module.exports = build;

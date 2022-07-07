const fastify = require('fastify');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('@fastify/cors');

dotenv.config();

const build = (opts = {}) => {
  const app = fastify(opts);

  // add cors
  app.register(cors);

  try {
    mongoose.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.error(e);
  }

  // register route
  app.get('/', (_, reply) => {
    reply.send({ message: 'Hello! Go to /api/quotes instead' });
  });

  app.register(require('./routes/quotes'), { prefix: '/api/quotes' });

  return app;
};

module.exports = build;

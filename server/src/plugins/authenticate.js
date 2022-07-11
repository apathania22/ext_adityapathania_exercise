const fp = require('fastify-plugin');

module.exports = fp(async (fastify, opts, next) => {
  fastify.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
  next();
});

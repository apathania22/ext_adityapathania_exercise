const {
  getQuotesOpts,
  getQuoteByIdOpts,
  createQuoteOpts,
  deleteQuoteOpts,
  updateQuoteOpts,
} = require('./schema.js');

/**------------------------------------------------
 ** Quotes
 **-----------------------------------------------*/
async function routes(fastify, options) {
  fastify.get('/', getQuotesOpts);
  fastify.post('/', createQuoteOpts);
  fastify.get('/:id', getQuoteByIdOpts);
  fastify.put('/:id', updateQuoteOpts);
  fastify.delete('/:id', deleteQuoteOpts);
}

module.exports = routes;

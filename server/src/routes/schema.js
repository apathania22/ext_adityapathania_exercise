const {
  getQuotes,
  createQuote,
  getQuoteById,
  updateQuote,
  deleteQuote,
} = require('../controllers/quotes.js');

const Quote = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    authorName: { type: 'string' },
    text: { type: 'string' },
    creator: { type: 'string' },
  },
};

// options for get all quotes
const getQuotesOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        quotes: Quote,
      },
    },
  },
  handler: getQuotes,
};

// get single quote
const getQuoteByIdOpts = {
  schema: {
    response: {
      200: Quote,
    },
  },
  handler: getQuoteById,
};

// create new quote
const createQuoteOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['authorName', 'text', 'creator'],
      properties: {
        id: { type: 'string' },
        authorName: { type: 'string' },
        text: { type: 'string' },
        creator: { type: 'string' },
      },
    },
    response: {
      201: Quote,
    },
  },
  handler: createQuote,
};

// delete quote
const deleteQuoteOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteQuote,
};

// update quote
const updateQuoteOpts = {
  schema: {
    response: {
      200: Quote,
    },
  },
  handler: updateQuote,
};

module.exports = {
  getQuotesOpts,
  getQuoteByIdOpts,
  createQuoteOpts,
  deleteQuoteOpts,
  updateQuoteOpts,
};

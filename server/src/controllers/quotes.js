const Quote = require('../models/quote.js');
const Joi = require('joi');
const mongoose = require('mongoose');
const { isStr, filteredQuotes, regex } = require('../utils/utils.js');

/**
 * Get list of all quotes from the database
 */
const getQuotes = async (req, reply) => {
  let quotes;

  try {
    // check if the query has authorName
    if (req.query.authorName) {
      // retrieve quotes by authorName
      quotes = await Quote.find({ authorName: regex });
      if (!quotes.length) throw { message: 'No results found' };
    } else {
      // retrieve all quotes
      quotes = await Quote.find();
    }
    // only return the fields we want (id, authorName, text)
    reply.code(200).send(filteredQuotes(quotes));
  } catch (error) {
    reply.code(404).send({ errorMessage: error.message });
  }
};

/**
 * Get a single quote by its ID
 */
const getQuoteById = async (req, reply) => {
  const { id } = req.params;

  try {
    const { _id, authorName, text } = await Quote.findById(id);
    reply.code(200).send({ id: _id, authorName, text });
  } catch (error) {
    reply.code(404).send({ errorMessage: error.message });
  }
};

/**
 * Create a new quote in the database
 */
const createQuote = async (req, reply) => {
  // validation schema
  const schema = Joi.object({
    authorName: Joi.string().min(3).required(),
    text: Joi.string().required(),
  });

  const { authorName, text } = req.body;

  if (isStr(authorName) || isStr(text))
    return reply.code(400).send({ errorMessage: 'Provided input is not a string' });

  // validate the request body against the schema
  const { error } = schema.validate({ authorName, text });
  if (error) return reply.code(400).send({ errorMessage: error.details[0].message });

  const newQuote = new Quote({ authorName, text });

  try {
    await newQuote.save();
    const id = newQuote._id.toString();

    reply.code(201).send({ id, authorName, text });
  } catch (error) {
    reply.code(404).send({ errorMessage: error.message });
  }
};

/**
 * Edit a quote by its ID
 */
const updateQuote = async (req, reply) => {
  const { id } = req.params;

  // validation schema
  const schema = Joi.object({
    authorName: Joi.string().min(3),
    text: Joi.string(),
  });

  const { authorName, text } = req.body;

  if (isStr(authorName) || isStr(text))
    return reply.code(400).send({ errorMessage: 'Provided input is not a string' });

  // validate the request body against the schema
  const { error } = schema.validate({ authorName, text });
  if (error) return reply.code(400).send({ errorMessage: error.details[0].message });

  try {
    await Quote.findById(id);

    const updatedQuote = { id, authorName, text };
    await Quote.findByIdAndUpdate(id, updatedQuote, { new: true });

    reply.send(updatedQuote);
  } catch (err) {
    reply.code(404).send({ errorMessage: err.message });
  }
};

/**
 * Remove a quote by its ID
 */
const deleteQuote = async (req, reply) => {
  const { id } = req.params;

  // validate if the id is a valid mongo id
  const isValidQuote = mongoose.Types.ObjectId.isValid(id);
  if (!isValidQuote) return reply.code(404).send({ errorMessage: `Invalid id: ${id}` });

  await Quote.findByIdAndRemove(id);
  reply.send({ errorMessage: 'Quote deleted successfully.' });
};

module.exports = {
  getQuotes,
  getQuoteById,
  createQuote,
  updateQuote,
  deleteQuote,
};

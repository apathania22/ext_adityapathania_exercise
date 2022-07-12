const fp = require('fastify-plugin');
const mongoose = require('mongoose');

const db = async (fastify, options, next) => {
  try {
    mongoose.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.error(e);
  }

  next();
};

module.exports = fp(db);

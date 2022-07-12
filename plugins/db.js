const dotenv = require('dotenv');
const fp = require('fastify-plugin');
const mongoose = require('mongoose');
dotenv.config();

const db = async (fastify, options, next) => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.error(e);
  }

  next();
};

module.exports = fp(db);

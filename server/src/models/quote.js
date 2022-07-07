const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quoteSchema = new Schema({
  // The full display name of the quote's author
  authorName: { type: String, required: true },
  // The text of the quote
  text: { type: String, required: true },
});

const Quote = model("Quote", quoteSchema);

module.exports = Quote;

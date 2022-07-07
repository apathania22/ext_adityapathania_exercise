const isStr = (value) => {
  return /^\d+$/.test(value);
};

const filteredQuotes = (quotes) => {
  return quotes.map((quote) => {
    return {
      id: quote._id.toString(),
      authorName: quote.authorName,
      text: quote.text,
    };
  });
};

var regex = (str) => new RegExp(['^', str, '$'].join(''), 'i');

module.exports = { isStr, filteredQuotes, regex };

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8080;

const server = require('./app')({
  logger: {
    level: 'info',
  },
});

const start = async () => {
  try {
    await server.listen({ port, host: '0.0.0.0' });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();

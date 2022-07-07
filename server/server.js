const server = require('./src/app')({
  logger: {
    level: 'info',
  },
});

const start = async () => {
  try {
    await server.listen(8080, '0.0.0.0');
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();

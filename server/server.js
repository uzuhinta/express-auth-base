require('dotenv').config();

const nodeEnv = process.env.NODE_ENV;

// config dotenv by environment
require('dotenv').config({
  path: `.env.${nodeEnv}`,
});

const PORT = process.env.PORT || 3000;

const app = require('./src/app');
const server = app.listen(PORT, () => {
  console.log(
    `------::----${process.env.SERVICE_NAME} start with port ${PORT}`
  );
});

process.on('SIGINT', () => {
  console.log('Exit server express');
  server.close('Exit server express');
  // notify send (ping....)
});

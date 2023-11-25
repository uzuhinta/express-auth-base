const { createClient } = require('redis');
const {
  redis: { host, port, username, password },
} = require('./config');

const connectString = `redis://${username}:${password}@${host}:${port}`;

const client = createClient({
  url: connectString,
});

client.on('error', (err) =>
  console.log(`Redis::: error::: ${JSON.stringify(err)}`)
);

client.on('connect', () => {
  console.log(`Redis::: connected::: host ${host} port ${port}!`);
});

client.connect();

process.on('SIGINT', async () => {
  console.log('Redis::: closing');
  await client.disconnect();
});

module.exports = client;

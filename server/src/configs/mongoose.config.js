const mongoose = require('mongoose');
const {
  mongo_db: { host, name, username, password },
} = require('./config');

mongoose.set('strictQuery', true);
mongoose.set('debug', true);
mongoose.set('debug', { color: true });

const connectString = `mongodb+srv://${username}:${password}@${host}/${name}?retryWrites=true&w=majority`;
const MAX_POLL_SIZE = 50;
const TIME_OUT_CONNECT = 3000;

mongoose.connect(connectString, {
  serverSelectionTimeoutMS: TIME_OUT_CONNECT,
  maxPoolSize: MAX_POLL_SIZE,
});

mongoose.connection.on('connected', () => {
  console.log(`MongoDB::: connected::: ${this.name} host ${host}`);
});

mongoose.connection.on('disconnected', () => {
  console.log(`MongoDB::: disconnected::: ${this.name}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`MongoDB::: error:::${JSON.stringify(err)}`);
});

process.on('SIGINT', async () => {
  console.log('MongoDB::: closing');
  await mongoose.connection.close();
});

module.exports = mongoose;

const config = {
  app: {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
  },
  mongo_db: {
    enable: process.env.MONGO_ENABLE,
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_DATABASE,
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
  },
  redis: {
    enable: process.env.REDIS_ENABLE,
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  },
  jwt: {
    accessToken: process.env.ACCESS_TOKEN,
    refreshToken: process.env.REFRESH_TOKEN,
  },
};

module.exports = config;

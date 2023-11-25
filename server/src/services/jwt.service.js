const createError = require('http-errors');
const JWT = require('jsonwebtoken');
const config = require('../configs/config');
const client = require('../configs/redis.config');
const { refreshTokenKey } = require('../utils/redis-key');
const { yearToSecond } = require('../utils/time');

const HEADER = {
  AUTHORIZATION: 'authorization',
};

const signAccessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    };

    const SECRET = config.jwt.accessToken;

    const options = {
      expiresIn: '1m',
    };

    JWT.sign(payload, SECRET, options, (err, token) => {
      if (err) reject(err);

      resolve(token);
    });
  });
};

const verifyAccessToken = (req, res, next) => {
  const authorizationHeader = req.headers[HEADER.AUTHORIZATION];
  if (!authorizationHeader) {
    return next(createError(401));
  }
  const accessToken = authorizationHeader.split(' ')[1];

  const SECRET = config.jwt.accessToken;

  JWT.verify(accessToken, SECRET, (err, payload) => {
    if (err) {
      return next(createError(401, err.message));
    }
    req.payload = payload;
    next();
  });
};

const signRefreshToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    };

    const SECRET = config.jwt.refreshToken;

    const options = {
      expiresIn: '1y',
    };

    JWT.sign(payload, SECRET, options, async (err, token) => {
      if (err) reject(err);
      await client.set(refreshTokenKey(userId), token, {
        EX: yearToSecond(1),
      });
      resolve(token);
    });
  });
};

const verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    JWT.verify(token, config.jwt.refreshToken, async (err, payload) => {
      if (err) reject(err);
      console.log(payload);

      const storedRefreshToken = await client.get(refreshTokenKey(payload.userId));

      if (storedRefreshToken === token) {
        resolve(payload);
      }
      reject(createError(401));
    });
  });
};

module.exports = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};

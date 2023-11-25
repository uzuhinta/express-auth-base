const client = require('../configs/redis.config');
const User = require('../models/user.model');
const createError = require('http-errors');
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../services/jwt.service');
const { refreshTokenKey } = require('../utils/redis-key');

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isExist = await User.findOne({ email });

    if (isExist) {
      throw createError(409, `${email} has been registered`);
    }

    const user = new User({
      email,
      password,
    });

    const savedUser = await user.save();

    return res.json({
      status: 201,
      message: savedUser,
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw next(createError(400));
    }

    const { userId } = await verifyRefreshToken(refreshToken);
    const newrefreshToken = await signRefreshToken(userId);
    const accessToken = await signAccessToken(userId);

    return res.json({
      status: 200,
      accessToken,
      refreshToken: newrefreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(401, 'Email or password is not correct!');
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      throw createError(401, 'Email or password is not correct!');
    }

    const accessToken = await signAccessToken(user._id);
    const refreshToken = await signRefreshToken(user._id);
    res.json({
      status: 200,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw createError(400);
    }

    const { userId } = await verifyRefreshToken(refreshToken);

    await client.del(refreshTokenKey(userId));

    res.json({
      status: 200,
      message: 'Logout successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  refreshToken,
  login,
  logout,
};

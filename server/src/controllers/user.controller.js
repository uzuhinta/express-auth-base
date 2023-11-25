const User = require('../models/user.model');

const getUser = async (req, res, next) => {
  const users = await User.find();

  return res.json({
    status: 200,
    users: users.map((user) => ({
      email: user.email,
    })),
  });
};

module.exports = {
  getUser,
};

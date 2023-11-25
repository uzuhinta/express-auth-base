const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required(),
}).options({ abortEarly: false });

module.exports = registerSchema;

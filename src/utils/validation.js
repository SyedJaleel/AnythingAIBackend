const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const taskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500),
  status: Joi.string().valid('pending', 'in-progress', 'completed')
});

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    req.body = value;
    next();
  };
};

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  taskSchema
};

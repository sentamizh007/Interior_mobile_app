const { body, validationResult } = require('express-validator');
const { sendError } = require('./response');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return sendError(res, 422, 'Validation failed', extractedErrors);
};

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 or more characters'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').exists().withMessage('Password is required'),
];

const designValidation = [
  body('designStyle').notEmpty().withMessage('Design style is required'),
  body('roomType').notEmpty().withMessage('Room type is required'),
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  designValidation,
};

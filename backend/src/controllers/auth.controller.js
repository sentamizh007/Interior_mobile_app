const authService = require('../services/auth.service');
const { sendResponse, sendError } = require('../utils/response');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const userData = await authService.registerUser(req.body);
    const { token, ...data } = userData;
    return sendResponse(res, 201, true, 'User registered successfully', data, token);
  } catch (error) {
    if (error.message === 'User already exists') {
      return sendError(res, 400, error.message);
    }
    next(error);
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await authService.loginUser(email, password);
    const { token, ...data } = userData;
    return sendResponse(res, 200, true, 'Login successful', data, token);
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      return sendError(res, 401, error.message);
    }
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    return sendResponse(res, 200, true, 'Profile fetched successfully', req.user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile,
};

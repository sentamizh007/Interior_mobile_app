const sendResponse = (res, statusCode, success, message, data = null, token = null) => {
  const response = {
    success,
    message,
  };

  if (data) {
    response.data = data;
  }

  if (token) {
    response.token = token;
  }

  return res.status(statusCode).json(response);
};

const sendError = (res, statusCode, message, error = 'ERROR') => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
    statusCode,
  });
};

module.exports = {
  sendResponse,
  sendError,
};

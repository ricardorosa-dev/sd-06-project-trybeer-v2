class ThrowError extends Error {
  constructor(statusCode, message) {
  super();
  this.statusCode = statusCode;
  this.message = message;
  }
  }

  const sendError = (err, res) => {
  const { statusCode, message } = err;

  res.status(statusCode).json({
  message,
  });
  };
  
  module.exports = {
  ThrowError,
  sendError,
  };

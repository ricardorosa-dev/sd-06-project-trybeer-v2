const { sendError } = require('./errorHandler/errorHandler');

const errorMiddleware = (error, _req, res, _next) => {
console.log(error);
sendError(error, res);
};

module.exports = errorMiddleware;

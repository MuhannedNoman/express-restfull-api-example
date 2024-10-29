import logger from './logger.js';

export default (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    params: req.params,
    body: req.body,
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
  });
};

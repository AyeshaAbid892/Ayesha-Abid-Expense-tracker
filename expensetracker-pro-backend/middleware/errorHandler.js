/**
 * Global error handler. Must have exactly 4 parameters so Express
 * recognizes it as an error-handling middleware. Must be registered
 * last, after all routes.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';
  console.error(`[ERROR] ${statusCode}: ${message}`);
  res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;

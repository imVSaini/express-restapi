import logger from '../utils/logger.js'

/**
 * Middleware to format error responses.
 *
 * @param {Object} err - The error object.
 * @param {number} [err.statusCode] - The HTTP status code of the error.
 * @param {string} [err.message] - The error message.
 * @param {string} [err.errorCode] - The custom error code.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 *
 * @returns {void}
 *
 * @description
 * This middleware function formats the error response to be sent to the client.
 * It sets default values for unknown errors and hides detailed error stack traces
 * in production environment for non-operational errors.
 */
export default function formatError(err, req, res, next) {
  let { statusCode, message, errorCode } = err

  // Default values for unknown errors
  if (!statusCode) statusCode = 500
  if (!message) message = 'Oops! Something went wrong!'
  if (!errorCode) errorCode = 'INTERNAL_SERVER_ERROR'

  // For production environment, hide detailed error stack traces
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    message = 'An unexpected error occurred.'
  }

  // Log the error using the logger
  logger.error(message, {
    path: req.originalUrl,
    method: req.method,
    status: statusCode,
    stack: err.stack,
  })

  const responseError = {
    message,
    success: false,
    method: req.method,
    path: req.originalUrl,
    status: statusCode,
    extensions: {
      code: errorCode,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
      ...(err.details && { details: err.details }),
    },
    timestamp: new Date().toISOString(),
  }

  res.status(statusCode).json(responseError)
}

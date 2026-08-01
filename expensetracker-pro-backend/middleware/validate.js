/**
 * Factory function - takes required field names and returns a middleware
 * that checks req.body for their presence.
 * Usage: validate('title', 'amount', 'category')
 */
const validate = (...requiredFields) => (req, res, next) => {
  const missingFields = requiredFields.filter(
    (field) => !req.body[field] && req.body[field] !== false
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(', ')}`,
    });
  }

  next();
};

module.exports = validate;

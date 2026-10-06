const {
  isValidEmail,
  isRequired,
  isValidPassword,
  isValidUrl
} = require("../utils/validators");

const validateRequest = (fields = []) => {
  return (req, res, next) => {
    const errors = {};

    fields.forEach((field) => {
      if (!isRequired(req.body[field])) {
        errors[field] = `${field} is required`;
      }
    });

    if (
      req.body.email &&
      !isValidEmail(req.body.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (
      req.body.password &&
      !isValidPassword(req.body.password)
    ) {
      errors.password =
        "Password must be at least 6 characters";
    }

    if (
      req.body.github_url &&
      !isValidUrl(req.body.github_url)
    ) {
      errors.github_url = "Invalid GitHub URL";
    }

    if (
      req.body.live_url &&
      !isValidUrl(req.body.live_url)
    ) {
      errors.live_url = "Invalid live URL";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }

    next();
  };
};

module.exports = validateRequest;
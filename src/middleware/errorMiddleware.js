const errorMiddleware = (error, req, res, next) => {
  console.error("SERVER ERROR:", error);

  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error"
  });
};

module.exports = errorMiddleware;
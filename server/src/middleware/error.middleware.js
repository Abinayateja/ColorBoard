// Catches requests to routes that don't exist, e.g. GET /api/nonexistent
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

// Global error handler — catches every error passed to next(error)
// instead of repeating try/catch error responses in every route.
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong on the server.",
  });
};

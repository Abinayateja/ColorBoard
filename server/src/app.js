import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

const app = express();

// Allow the React frontend (a different port) to call this API
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

// Parses incoming JSON request bodies into req.body
app.use(express.json());

// Simple health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "ColorBoard API is running" });
});

// Mount all board/card routes under /api
app.use("/api", routes);

// 404 handler for unknown routes
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

export default app;

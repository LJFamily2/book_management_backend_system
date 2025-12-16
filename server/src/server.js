const express = require("express");
const dotenv = require("dotenv");

// Load env vars
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
const routes = require("./routes");
app.use("/api", routes);

// MonngoDB connection
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err.message || err);
      process.exit(1);
    });
}

// Start the server
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;

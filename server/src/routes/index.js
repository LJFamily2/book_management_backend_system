const express = require("express");
const router = express.Router();
const bookRoutes = require("./bookRoutes");
const authRoutes = require("./authRoutes");

router.use("/books", bookRoutes);
router.use("/auth", authRoutes);

module.exports = router;

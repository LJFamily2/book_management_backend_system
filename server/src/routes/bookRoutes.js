const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const verifyToken = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBook);

// Protect write operations
router.post("/", verifyToken, checkRole(["ADMIN"]), bookController.createBook);
router.put(
  "/:id",
  verifyToken,
  checkRole(["ADMIN"]),
  bookController.updateBook
);
router.delete(
  "/:id",
  verifyToken,
  checkRole(["ADMIN"]),
  bookController.deleteBook
);

module.exports = router;

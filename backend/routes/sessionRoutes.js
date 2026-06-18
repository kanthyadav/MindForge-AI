const express = require("express");
const {
  getAllSessions,
} = require("../controllers/sessionController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getAllSessions
);

module.exports = router;
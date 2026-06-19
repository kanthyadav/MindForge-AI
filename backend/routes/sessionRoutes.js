const express = require("express");

const {
  getAllSessions,
  deleteSession,
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

router.delete(
  "/:id",
  authMiddleware,
  deleteSession
);

module.exports = router;
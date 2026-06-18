const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");

const {
  uploadAudio,
} = require("../controllers/uploadController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

// TEMPORARILY REMOVE FILE FILTER
const upload = multer({
  storage,
});

router.post(
  "/",
  authMiddleware,
  upload.single("audio"),
  uploadAudio
);

module.exports = router;
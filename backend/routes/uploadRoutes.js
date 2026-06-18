const express = require("express");
const multer = require("multer");

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

const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedTypes = [
    "audio/mpeg",
    "audio/wav",
    "audio/x-wav",
    "audio/mp4",
    "audio/x-m4a",
    "audio/aac",
  ];

  if (
    allowedTypes.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only audio files are allowed"
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
});

router.post(
  "/",
  upload.single("audio"),
  uploadAudio
);

module.exports = router;
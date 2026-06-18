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
  console.log(
    "Uploaded File Type:",
    file.mimetype
  );

  if (
    file.mimetype.startsWith("audio/")
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Only audio files are allowed. Received: ${file.mimetype}`
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
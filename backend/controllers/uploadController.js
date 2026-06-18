const Session = require("../models/session");
const {
  generateTranscript,
} = require("../services/transcriptionService");

const {
  analyzeTranscript,
} = require("../services/analysisService");

const uploadAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No audio file uploaded",
      });
    }

    const session = await Session.create({
      title: req.file.originalname,
      audioUrl: req.file.path,
    });

    console.log("Generating transcript...");

    const transcript =
      await generateTranscript(req.file.path);

    if (
      !transcript ||
      transcript.trim().length < 10
    ) {
      return res.status(400).json({
        success: false,
        message:
          "No meaningful speech detected in audio",
      });
    }

    session.transcript = transcript;

    console.log(
      "Analyzing transcript with Gemini..."
    );

    const analysis =
      await analyzeTranscript(transcript);

    console.log("Analysis Result:");
    console.log(analysis);

    session.contentType =
      analysis.contentType || "other";

    session.summary =
      analysis.summary || "Summary unavailable";

    session.keyPoints =
      analysis.keyPoints || [];

    await session.save();

    res.status(201).json({
      success: true,
      message:
        "Audio processed successfully",
      session,
    });
  } catch (error) {
    console.error(
      "Upload Controller Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Internal Server Error",
    });
  }
};

module.exports = {
  uploadAudio,
};
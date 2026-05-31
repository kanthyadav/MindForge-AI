const Session = require("../models/Session");
const { generateTranscript } = require("../services/transcriptionService");
const { analyzeTranscript } = require("../services/analysisService");

const uploadAudio = async (req, res) => {
  try {
    const session = await Session.create({
      title: req.file.originalname,
      audioUrl: req.file.path,
    });

    console.log("Generating transcript...");

    const transcript = await generateTranscript(req.file.path);

    session.transcript = transcript;

    console.log("Analyzing transcript with AI...");

    const analysis = await analyzeTranscript(transcript);

    session.contentType = analysis.contentType;
    session.summary = analysis.summary;
    session.keyPoints = analysis.keyPoints;

    await session.save();

    res.status(201).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadAudio,
};
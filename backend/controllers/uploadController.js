const Session = require("../models/session");
const { generateTranscript } = require("../services/transcriptionService");
const { analyzeTranscript } = require("../services/analysisService");

const uploadAudio = async (req, res) => {
  try {
    console.log("STEP 1: Upload started");

    const session = await Session.create({
      title: req.file.originalname,
      audioUrl: req.file.path,
    });

    console.log("STEP 2: Session created");

    const transcript = await generateTranscript(req.file.path);

    console.log("STEP 3: Transcript generated");

    session.transcript = transcript;

    const analysis = await analyzeTranscript(transcript);

    console.log("STEP 4: Analysis completed");

    session.contentType = analysis.contentType;
    session.summary = analysis.summary;
    session.keyPoints = analysis.keyPoints;

    await session.save();

    console.log("STEP 5: Session saved");

    res.status(201).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error("UPLOAD CONTROLLER ERROR:");
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
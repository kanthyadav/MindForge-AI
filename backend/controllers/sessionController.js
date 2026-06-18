const Session = require("../models/session");

const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: sessions.length,
      sessions,
    });
  } catch (error) {
    console.error("Fetch Sessions Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch sessions",
    });
  }
};

module.exports = {
  getAllSessions,
};
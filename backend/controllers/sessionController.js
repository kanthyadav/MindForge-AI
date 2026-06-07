const Session = require("../models/session");

const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find().sort({
      createdAt: -1,
    });

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllSessions,
};
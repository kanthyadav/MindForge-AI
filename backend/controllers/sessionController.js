const Session = require("../models/session");

const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: sessions.length,
      sessions,
    });
  } catch (error) {
    console.error(
      "Fetch Sessions Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch sessions",
    });
  }
};

const deleteSession = async (
  req,
  res
) => {
  try {
    const session =
      await Session.findOneAndDelete({
        _id: req.params.id,
        user: req.user.userId,
      });

    if (!session) {
      return res.status(404).json({
        success: false,
        message:
          "Session not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Session deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Session Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete session",
    });
  }
};

module.exports = {
  getAllSessions,
  deleteSession,
};
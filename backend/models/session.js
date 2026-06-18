const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    audioUrl: {
      type: String,
      default: "",
    },

    contentType: {
      type: String,
      default: "unknown",
    },

    transcript: {
      type: String,
      default: "",
    },

    summary: {
      type: String,
      default: "",
    },

    keyPoints: {
      type: [String],
      default: [],
    },

    quiz: {
      type: [String],
      default: [],
    },

    revisionNotes: {
      type: String,
      default: "",
    },

    actionItems: {
      type: [String],
      default: [],
    },

    interviewFeedback: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Session",
  sessionSchema
);
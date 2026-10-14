const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    maximumMarks: {
      type: Number,
      required: true,
    },

    obtainedMarks: {
      type: Number,
      required: true,
    },

    grade: {
      type: String,
      required: true,
    },

    exam: {
      type: String,
      default: "Final Examination",
    },

    year: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
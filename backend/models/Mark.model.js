const mongoose = require("mongoose");

const markSchema = new mongoose.Schema(
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

    unitTest: {
      type: Number,
      default: 0,
    },

    assignment: {
      type: Number,
      default: 0,
    },

    midTerm: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Mark = mongoose.model("Mark", markSchema);

module.exports = Mark;
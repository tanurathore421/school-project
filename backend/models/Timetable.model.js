const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },

    section: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    day: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Timetable = mongoose.model("Timetable", timetableSchema);

module.exports = Timetable;
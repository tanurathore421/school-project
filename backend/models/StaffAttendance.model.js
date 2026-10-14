const mongoose = require("mongoose");

const staffAttendanceSchema = new mongoose.Schema(
  {
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const StaffAttendance = mongoose.model(
  "StaffAttendance",
  staffAttendanceSchema
);

module.exports = StaffAttendance;
const Mark = require("../models/Mark.model");
const Attendance = require("../models/Attendance.model");
const Timetable = require("../models/Timetable.model");
const Result = require("../models/Result.model");
const Notice = require("../models/Notice.model");
const User = require("../models/User.model");

// =========================
// Get Student Marks
// =========================
const getStudentMarks = async (req, res) => {
  try {
    const marks = await Mark.find({
      student: req.user.userId,
    });

    res.status(200).json(marks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// Get Student Attendance
// =========================
const getStudentAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      student: req.user.userId,
    }).sort({ date: -1 });

    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// Get Student Timetable
// =========================
const getStudentTimetable = async (req, res) => {
  try {
    const student = await User.findById(req.user.userId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const timetable = await Timetable.find({
      className: student.className,
      section: student.section,
    }).sort({ day: 1, time: 1 });

    res.status(200).json(timetable);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// Get Student Result
// =========================
const getStudentResult = async (req, res) => {
  try {
    const results = await Result.find({
      student: req.user.userId,
    });

    res.status(200).json(results);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// Get Student Notices
// =========================
const getStudentNotices = async (req, res) => {
  try {
    const notices = await Notice.find({
      $or: [
        { target: "all" },
        { target: "student" },
      ],
    })
      .sort({ postedOn: -1 })
      .populate("postedBy", "name");

    res.status(200).json(notices);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getStudentMarks,
  getStudentAttendance,
  getStudentTimetable,
  getStudentResult,
  getStudentNotices,
};
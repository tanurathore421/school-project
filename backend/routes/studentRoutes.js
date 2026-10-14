const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const {
  getStudentMarks,
  getStudentAttendance,
  getStudentTimetable,
  getStudentResult,
  getStudentNotices,
} = require("../controllers/studentController");

// Marks
router.get(
  "/marks",
  authMiddleware,
  roleMiddleware("student"),
  getStudentMarks
);

// Attendance
router.get(
  "/attendance",
  authMiddleware,
  roleMiddleware("student"),
  getStudentAttendance
);

// Timetable
router.get(
  "/timetable",
  authMiddleware,
  roleMiddleware("student"),
  getStudentTimetable
);

// Result
router.get(
  "/result",
  authMiddleware,
  roleMiddleware("student"),
  getStudentResult
);

// Notices
router.get(
  "/notices",
  authMiddleware,
  roleMiddleware("student"),
  getStudentNotices
);

module.exports = router;
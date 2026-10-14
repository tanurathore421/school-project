const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const {
  getStudents,

  getStudentAttendance,
  markAttendance,

  getStudentMarks,
  saveStudentMarks,

  getStaffTimetable,
  createTimetable,
  updateTimetable,
  deleteTimetable,

  getStudentResults,
  createResult,

  getStaffNotices,
  createNotice,
  deleteNotice,
} = require("../controllers/staffController");


// =====================================================
// STUDENTS
// =====================================================

router.get(
  "/students",
  authMiddleware,
  roleMiddleware("staff"),
  getStudents
);


// =====================================================
// ATTENDANCE
// =====================================================

router.get(
  "/attendance/:studentId",
  authMiddleware,
  roleMiddleware("staff"),
  getStudentAttendance
);

router.post(
  "/attendance",
  authMiddleware,
  roleMiddleware("staff"),
  markAttendance
);


// =====================================================
// MARKS
// =====================================================

router.get(
  "/marks/:studentId",
  authMiddleware,
  roleMiddleware("staff"),
  getStudentMarks
);

router.post(
  "/marks",
  authMiddleware,
  roleMiddleware("staff"),
  saveStudentMarks
);


// =====================================================
// TIMETABLE
// =====================================================

router.get(
  "/timetable",
  authMiddleware,
  roleMiddleware("staff"),
  getStaffTimetable
);

router.post(
  "/timetable",
  authMiddleware,
  roleMiddleware("staff"),
  createTimetable
);

router.put(
  "/timetable/:id",
  authMiddleware,
  roleMiddleware("staff"),
  updateTimetable
);

router.delete(
  "/timetable/:id",
  authMiddleware,
  roleMiddleware("staff"),
  deleteTimetable
);


// =====================================================
// RESULTS
// =====================================================

router.get(
  "/results/:studentId",
  authMiddleware,
  roleMiddleware("staff"),
  getStudentResults
);

router.post(
  "/results",
  authMiddleware,
  roleMiddleware("staff"),
  createResult
);


// =====================================================
// NOTICES
// =====================================================

router.get(
  "/notices",
  authMiddleware,
  roleMiddleware("staff"),
  getStaffNotices
);

router.post(
  "/notices",
  authMiddleware,
  roleMiddleware("staff"),
  createNotice
);

router.delete(
  "/notices/:id",
  authMiddleware,
  roleMiddleware("staff"),
  deleteNotice
);


module.exports = router;
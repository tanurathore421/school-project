const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getMarks,
  saveMarks,
  getAttendance,
  markAttendance,
  deleteMarks,

  getResults,
  saveResult,
  deleteResult,

  getStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  getStaffAttendance,
  markStaffAttendance,

  getNotices,
  createNotice,
  deleteNotice,

  getTimetable,
  createTimetable,
  updateTimetable,
  deleteTimetable,

} = require("../controllers/adminController");

// All admin routes require authentication + admin role
router.use(authMiddleware, roleMiddleware("admin"));

// Student routes
router.get("/students", getStudents);
router.post("/students", createStudent);
router.put("/students/:id", updateStudent);

// DELETE student
router.delete("/students/:id", deleteStudent);

// Student Attendance
router.get("/attendance", getAttendance);
router.post("/attendance", markAttendance);

//student Marks
router.get("/marks", getMarks);
router.post("/marks", saveMarks);
router.delete("/marks/:id", deleteMarks);

// student final Results
router.get("/results", getResults);
router.post("/results", saveResult);
router.delete("/results/:id", deleteResult);



// Staff routes
router.get("/staff", getStaff);
router.post("/staff", createStaff);
router.put("/staff/:id", updateStaff);
router.delete("/staff/:id", deleteStaff);

// Staff Attendance
router.get("/staff-attendance", getStaffAttendance);
router.post("/staff-attendance", markStaffAttendance);


// Notices
router.get("/notices", getNotices);
router.post("/notices", createNotice);
router.delete("/notices/:id", deleteNotice);


// Timetable
router.get("/timetable", getTimetable);
router.post("/timetable", createTimetable);
router.put("/timetable/:id", updateTimetable);
router.delete("/timetable/:id", deleteTimetable);

module.exports = router;

const User = require("../models/User.model");
const Mark = require("../models/Mark.model");
const Attendance = require("../models/Attendance.model");
const Timetable = require("../models/Timetable.model");
const Result = require("../models/Result.model");
const Notice = require("../models/Notice.model");


// =====================================================
// STUDENTS
// =====================================================

// Get all students
const getStudents = async (req, res) => {
  try {
    const { className, section } = req.query;

    if (!className || !section) {
      return res.status(400).json({
        message: "Class and section are required",
      });
    }

    const students = await User.find(
      {
        role: "student",
        className: className,
        section: section,
      },
      "name email className section phone fatherName motherName dateOfBirth address"
    ).sort({ name: 1 });

    res.status(200).json(students);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// =====================================================
// ATTENDANCE
// =====================================================

// Get attendance of a student
const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    const attendance = await Attendance.find({
      student: studentId,
    }).sort({ date: -1 });

    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Mark attendance
const markAttendance = async (req, res) => {
  try {
    const { student, date, status } = req.body;

    if (!student || !date || !status) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const existingAttendance = await Attendance.findOne({
      student,
      date,
    });

    // Attendance already exists → update it
    if (existingAttendance) {
      existingAttendance.status = status;

      await existingAttendance.save();

      const updatedAttendance = await existingAttendance.populate(
        "student",
        "name email className section"
      );

      return res.status(200).json({
        message: "Attendance updated successfully",
        attendance: updatedAttendance,
      });
    }

    // Attendance doesn't exist → create it
    const attendance = new Attendance({
      student,
      date,
      status,
    });

    await attendance.save();

    const populatedAttendance = await attendance.populate(
      "student",
      "name email className section"
    );

    return res.status(201).json({
      message: "Attendance marked successfully",
      attendance: populatedAttendance,
    });
  } catch (error) {
    console.error("STAFF STUDENT ATTENDANCE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================================
// MARKS
// =====================================================

// Get marks of a student
const getStudentMarks = async (req, res) => {
  try {
    const { studentId } = req.params;

    const marks = await Mark.find({
      student: studentId,
    }).sort({ subject: 1 });

    res.status(200).json(marks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Add or update marks
const saveStudentMarks = async (req, res) => {
  try {
    const {
      student,
      subject,
      unitTest,
      assignment,
      midTerm,
    } = req.body;

    if (!student || !subject) {
      return res.status(400).json({
        message: "Student and subject are required",
      });
    }

    const existingMark = await Mark.findOne({
      student,
      subject,
    });

    if (existingMark) {
      existingMark.unitTest = unitTest ?? 0;
      existingMark.assignment = assignment ?? 0;
      existingMark.midTerm = midTerm ?? 0;

      await existingMark.save();

      return res.status(200).json({
        message: "Marks updated successfully",
        marks: existingMark,
      });
    }

    const marks = new Mark({
      student,
      subject,
      unitTest: unitTest ?? 0,
      assignment: assignment ?? 0,
      midTerm: midTerm ?? 0,
    });

    await marks.save();

    res.status(201).json({
      message: "Marks added successfully",
      marks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// =====================================================
// TIMETABLE
// =====================================================

// Get timetable for a class and section
const getStaffTimetable = async (req, res) => {
  try {
    const {
      className,
      section,
    } = req.query;

    if (!className || !section) {
      return res.status(400).json({
        message: "Class and section are required",
      });
    }

    const timetable = await Timetable.find({
      className,
      section,
    });

    res.status(200).json(timetable);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Add timetable
const createTimetable = async (req, res) => {
  try {
    const {
      className,
      section,
      day,
      time,
      subject,
    } = req.body;

    if (
      !className ||
      !section ||
      !day ||
      !time ||
      !subject
    ) {
      return res.status(400).json({
        message: "Please fill all timetable fields",
      });
    }

    // Check if this period is already occupied
    const existingTimetable = await Timetable.findOne({
      className,
      section,
      day,
      time,
    });

    if (existingTimetable) {
      return res.status(400).json({
        message: "This period already has a subject",
      });
    }

    const timetable = new Timetable({
      className,
      section,
      day,
      time,
      subject,
    });

    await timetable.save();

    res.status(201).json({
      message: "Timetable added successfully",
      timetable,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Update timetable
const updateTimetable = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      className,
      section,
      day,
      time,
      subject,
    } = req.body;

    const timetable = await Timetable.findById(id);

    if (!timetable) {
      return res.status(404).json({
        message: "Timetable entry not found",
      });
    }

    timetable.className = className;
    timetable.section = section;
    timetable.day = day;
    timetable.time = time;
    timetable.subject = subject;

    await timetable.save();

    res.status(200).json({
      message: "Timetable updated successfully",
      timetable,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Delete timetable
const deleteTimetable = async (req, res) => {
  try {
    const { id } = req.params;

    const timetable = await Timetable.findById(id);

    if (!timetable) {
      return res.status(404).json({
        message: "Timetable entry not found",
      });
    }

    await Timetable.findByIdAndDelete(id);

    res.status(200).json({
      message: "Timetable deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// =====================================================
// RESULTS
// =====================================================

// Get results of a student
const getStudentResults = async (req, res) => {
  try {
    const { studentId } = req.params;

    const results = await Result.find({
      student: studentId,
    }).sort({ subject: 1 });

    res.status(200).json(results);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Add result
const createResult = async (req, res) => {
  try {
    const {
      student,
      subject,
      maximumMarks,
      obtainedMarks,
      grade,
      exam,
      year,
    } = req.body;

    if (
      !student ||
      !subject ||
      maximumMarks === undefined ||
      obtainedMarks === undefined ||
      !grade ||
      !year
    ) {
      return res.status(400).json({
        message: "Please fill all result fields",
      });
    }

    const result = new Result({
      student,
      subject,
      maximumMarks,
      obtainedMarks,
      grade,
      exam: exam || "Final Examination",
      year,
    });

    await result.save();

    res.status(201).json({
      message: "Result added successfully",
      result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// =====================================================
// NOTICES
// =====================================================

// Get notices
const getStaffNotices = async (req, res) => {
  try {
    const notices = await Notice.find()
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


// Create notice
const createNotice = async (req, res) => {
  try {
    const {
      title,
      message,
      target,
    } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        message: "Title and message are required",
      });
    }

    const notice = new Notice({
      title,
      message,
      target: target || "all",
      postedBy: req.user.userId,
    });

    await notice.save();

    const populatedNotice = await Notice.findById(
      notice._id
    ).populate("postedBy", "name");

    res.status(201).json({
      message: "Notice created successfully",
      notice: populatedNotice,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Delete notice
const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const notice = await Notice.findById(id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    await Notice.findByIdAndDelete(id);

    res.status(200).json({
      message: "Notice deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// =====================================================
// EXPORTS
// =====================================================

module.exports = {
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
};
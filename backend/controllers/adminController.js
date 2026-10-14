const User = require("../models/User.model");
const StaffAttendance = require("../models/StaffAttendance.model");
const Attendance = require("../models/Attendance.model");
const Mark = require("../models/Mark.model");
const Result = require("../models/Result.model");
const Notice = require("../models/Notice.model");
const Timetable = require("../models/Timetable.model");
const bcrypt = require("bcryptjs");

// GET ALL STUDENTS
const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      students,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch students",
    });
  }
};

// CREATE STUDENT
const createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      className,
      section,
      phone,
      fatherName,
      motherName,
      dateOfBirth,
      address,
    } = req.body;

    if (!name || !email || !password || !className || !section) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new User({
      name,
      email,
      password: hashedPassword,
      role: "student",
      className,
      section,
      phone,
      fatherName,
      motherName,
      dateOfBirth,
      address,
    });

    await student.save();

    res.status(201).json({
      message: "Student created successfully",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
        className: student.className,
        section: student.section,
        phone: student.phone,
        fatherName: student.fatherName,
        motherName: student.motherName,
        dateOfBirth: student.dateOfBirth,
        address: student.address,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create student",
    });
  }
};

// UPDATE STUDENT
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      password,
      className,
      section,
      phone,
      fatherName,
      motherName,
      dateOfBirth,
      address,
    } = req.body;

    const student = await User.findOne({
      _id: id,
      role: "student",
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    if (email && email !== student.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }
    }

    student.name = name;
    student.email = email;
    student.className = className;
    student.section = section;
    student.phone = phone;
    student.fatherName = fatherName;
    student.motherName = motherName;
    student.dateOfBirth = dateOfBirth;
    student.address = address;

    // Change password only if a new password is provided
    if (password) {
      student.password = await bcrypt.hash(password, 10);
    }

    await student.save();

    res.status(200).json({
      message: "Student updated successfully",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
        className: student.className,
        section: student.section,
        phone: student.phone,
        fatherName: student.fatherName,
        motherName: student.motherName,
        dateOfBirth: student.dateOfBirth,
        address: student.address,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update student",
    });
  }
};

// DELETE STUDENT
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await User.findOne({
      _id: id,
      role: "student",
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete student",
    });
  }
};



// GET ALL ATTENDANCE
const getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("student", "name email className section")
      .sort({ date: -1 });

    res.status(200).json({ attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch attendance",
    });
  }
};


// MARK ATTENDANCE
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

    // If attendance already exists → UPDATE it
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

    // Otherwise → CREATE new attendance
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

    res.status(201).json({
      message: "Attendance marked successfully",
      attendance: populatedAttendance,
    });
  } catch (error) {
    console.error("STUDENT ATTENDANCE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL STUDENT MARKS
const getMarks = async (req, res) => {
  try {
    const marks = await Mark.find()
      .populate("student", "name email className section")
      .sort({ createdAt: -1 });

    res.status(200).json({
      marks,
    });
  } catch (error) {
    console.error("GET MARKS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch marks",
    });
  }
};

// CREATE / UPDATE STUDENT MARKS
const saveMarks = async (req, res) => {
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

    // If marks already exist → UPDATE
    if (existingMark) {
      existingMark.unitTest = unitTest ?? 0;
      existingMark.assignment = assignment ?? 0;
      existingMark.midTerm = midTerm ?? 0;

      await existingMark.save();

      const updatedMark = await existingMark.populate(
        "student",
        "name email className section"
      );

      return res.status(200).json({
        message: "Marks updated successfully",
        marks: updatedMark,
      });
    }

    // Otherwise → CREATE
    const marks = new Mark({
      student,
      subject,
      unitTest: unitTest ?? 0,
      assignment: assignment ?? 0,
      midTerm: midTerm ?? 0,
    });

    await marks.save();

    const populatedMarks = await marks.populate(
      "student",
      "name email className section"
    );

    res.status(201).json({
      message: "Marks saved successfully",
      marks: populatedMarks,
    });
  } catch (error) {
    console.error("SAVE MARKS ERROR:", error);

    res.status(500).json({
      message: "Failed to save marks",
    });
  }
};

// DELETE STUDENT MARKS
const deleteMarks = async (req, res) => {
  try {
    const { id } = req.params;

    const marks = await Mark.findByIdAndDelete(id);

    if (!marks) {
      return res.status(404).json({
        message: "Marks not found",
      });
    }

    res.status(200).json({
      message: "Marks deleted successfully",
    });
  } catch (error) {
    console.error("DELETE MARKS ERROR:", error);

    res.status(500).json({
      message: "Failed to delete marks",
    });
  }
};


// GET ALL STUDENT RESULTS

const getResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate("student", "name email className section")
      .sort({ createdAt: -1 });

    res.status(200).json({ results });
  } catch (error) {
    console.error("GET RESULTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch results" });
  }
};

  // CREATE / UPDATE STUDENT RESULT
const saveResult = async (req, res) => {
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
        message: "Please fill all required fields",
      });
    }

    const existingResult = await Result.findOne({
      student,
      subject,
      exam,
      year,
    });

    if (existingResult) {
      existingResult.maximumMarks = maximumMarks;
      existingResult.obtainedMarks = obtainedMarks;
      existingResult.grade = grade;

      await existingResult.save();

      const updatedResult = await existingResult.populate(
        "student",
        "name email className section"
      );

      return res.status(200).json({
        message: "Result updated successfully",
        result: updatedResult,
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

    const populatedResult = await result.populate(
      "student",
      "name email className section"
    );

    res.status(201).json({
      message: "Result saved successfully",
      result: populatedResult,
    });
  } catch (error) {
    console.error("SAVE RESULT ERROR:", error);
    res.status(500).json({
      message: "Failed to save result",
    });
  }
};

// DELETE STUDENT RESULT

const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Result.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: "Result not found",
      });
    }

    res.status(200).json({
      message: "Result deleted successfully",
    });
  } catch (error) {
    console.error("DELETE RESULT ERROR:", error);
    res.status(500).json({
      message: "Failed to delete result",
    });
  }
};




// GET ALL STAFF
const getStaff = async (req, res) => {
  try {
    const staff = await User.find({ role: "staff" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({ staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch staff" });
  }
};


// CREATE STAFF
const createStaff = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      dateOfBirth,
      address,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const staff = new User({
      name,
      email,
      password: hashedPassword,
      role: "staff",
      phone,
      dateOfBirth,
      address,
    });

    await staff.save();

    res.status(201).json({
      message: "Staff created successfully",
      staff: {
        id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        phone: staff.phone,
        dateOfBirth: staff.dateOfBirth,
        address: staff.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create staff",
    });
  }
};



// UPDATE STAFF
const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      password,
      phone,
      dateOfBirth,
      address,
    } = req.body;

    const staff = await User.findOne({
      _id: id,
      role: "staff",
    });

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    if (email && email !== staff.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }
    }

    staff.name = name;
    staff.email = email;
    staff.phone = phone;
    staff.dateOfBirth = dateOfBirth;
    staff.address = address;

    if (password) {
      staff.password = await bcrypt.hash(password, 10);
    }

    await staff.save();

    res.status(200).json({
      message: "Staff updated successfully",
      staff: {
        id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        phone: staff.phone,
        dateOfBirth: staff.dateOfBirth,
        address: staff.address,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update staff",
    });
  }
};


// DELETE STAFF
const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await User.findOne({
      _id: id,
      role: "staff",
    });

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "Staff deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete staff",
    });
  }
};

// GET ALL STAFF ATTENDANCE
const getStaffAttendance = async (req, res) => {
  try {
    const attendance = await StaffAttendance.find()
      .populate("staff", "name email role phone")
      .sort({ date: -1 });

    res.status(200).json({ attendance });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch staff attendance",
    });
  }
};


// MARK STAFF ATTENDANCE
const markStaffAttendance = async (req, res) => {
  try {
    const { staff, date, status } = req.body;

    if (!staff || !date || !status) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const existingAttendance = await StaffAttendance.findOne({
      staff,
      date,
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Staff attendance already exists for this date",
      });
    }

    const attendance = new StaffAttendance({
      staff,
      date,
      status,
    });

    await attendance.save();

    res.status(201).json({
      message: "Staff attendance marked successfully",
      attendance,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to mark staff attendance",
    });
  }
};


// GET ALL NOTICES

const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find()
      .populate("postedBy", "name email role")
      .sort({ postedOn: -1 });

    res.status(200).json({ notices });
  } catch (error) {
    console.error("GET NOTICES ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch notices",
    });
  }
};

// CREATE NOTICE

const createNotice = async (req, res) => {
  try {
    const { title, message, target } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        message: "Title and message are required",
      });
    }

    const notice = new Notice({
      title,
      message,
      postedBy: req.user.userId,
      target: target || "all",
    });

    await notice.save();

    const populatedNotice = await notice.populate(
      "postedBy",
      "name email role"
    );

    res.status(201).json({
      message: "Notice created successfully",
      notice: populatedNotice,
    });
  } catch (error) {
    console.error("CREATE NOTICE ERROR:", error);
    res.status(500).json({
      message: "Failed to create notice",
    });
  }
};

// DELETE NOTICE

const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const notice = await Notice.findByIdAndDelete(id);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    res.status(200).json({
      message: "Notice deleted successfully",
    });
  } catch (error) {
    console.error("DELETE NOTICE ERROR:", error);
    res.status(500).json({
      message: "Failed to delete notice",
    });
  }
};


// GET TIMETABLE
const getTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.find()
      .populate("teacher", "name email phone")
      .sort({
        className: 1,
        section: 1,
        day: 1,
        time: 1,
      });

    res.status(200).json({ timetable });
  } catch (error) {
    console.error("GET TIMETABLE ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch timetable",
    });
  }
};

// CREATE TIMETABLE

const createTimetable = async (req, res) => {
  try {
    const {
      className,
      section,
      day,
      time,
      subject,
      teacher,
    } = req.body;

    if (
      !className ||
      !section ||
      !day ||
      !time ||
      !subject ||
      !teacher
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const timetable = new Timetable({
      className,
      section: section.toUpperCase(),
      day,
      time,
      subject,
      teacher,
    });

    await timetable.save();

    const populatedTimetable = await timetable.populate(
      "teacher",
      "name email phone"
    );

    res.status(201).json({
      message: "Timetable created successfully",
      timetable: populatedTimetable,
    });
  } catch (error) {
    console.error("CREATE TIMETABLE ERROR:", error);
    res.status(500).json({
      message: "Failed to create timetable",
    });
  }
};

// UPDATE TIMETABLE
const updateTimetable = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      className,
      section,
      day,
      time,
      subject,
      teacher,
    } = req.body;

    if (
      !className ||
      !section ||
      !day ||
      !time ||
      !subject ||
      !teacher
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const timetable = await Timetable.findById(id);

    if (!timetable) {
      return res.status(404).json({
        message: "Timetable entry not found",
      });
    }

    timetable.className = className;
    timetable.section = section.toUpperCase();
    timetable.day = day;
    timetable.time = time;
    timetable.subject = subject;
    timetable.teacher = teacher;

    await timetable.save();

    const updatedTimetable = await timetable.populate(
      "teacher",
      "name email phone"
    );

    res.status(200).json({
      message: "Timetable updated successfully",
      timetable: updatedTimetable,
    });
  } catch (error) {
    console.error("UPDATE TIMETABLE ERROR:", error);

    res.status(500).json({
      message: "Failed to update timetable",
    });
  }
};

// DELETE TIMETABLE

const deleteTimetable = async (req, res) => {
  try {
    const { id } = req.params;

    const timetable = await Timetable.findByIdAndDelete(id);

    if (!timetable) {
      return res.status(404).json({
        message: "Timetable entry not found",
      });
    }

    res.status(200).json({
      message: "Timetable deleted successfully",
    });
  } catch (error) {
    console.error("DELETE TIMETABLE ERROR:", error);
    res.status(500).json({
      message: "Failed to delete timetable",
    });
  }
};





module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getAttendance,
  markAttendance,
  getMarks,
  saveMarks,
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
  deleteTimetable
};
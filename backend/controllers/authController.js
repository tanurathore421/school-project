const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =========================
// REGISTER STUDENT
// =========================
/* const registerUser = async (req, res) => {
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
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
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

    await user.save();

    res.status(201).json({
      message: "Student registered successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        className: user.className,
        section: user.section,
        phone: user.phone,
        fatherName: user.fatherName,
        motherName: user.motherName,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
}; */
// =========================
// LOGIN USER
// =========================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // all fields are required
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// CREATE ADMIN
// =========================
const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // all fields are required
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // check if admin already exists
    const existingAdmin = await User.findOne({
      role: "admin",
    });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    // check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create admin
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await user.save();

    res.status(201).json({
      message: "Admin created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// CREATE STAFF
// =========================
const createStaff = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // all fields are required
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create staff
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "staff",
    });

    await user.save();

    res.status(201).json({
      message: "Staff created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// LOGOUT USER
// =========================
const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });
  res.status(200).json({
    message: "User logged out successfully",
  });
};

// =========================
// EXPORT
// =========================
module.exports = {
 //registerUser,
  loginUser,
  createAdmin,
  createStaff,
  logoutUser,
};

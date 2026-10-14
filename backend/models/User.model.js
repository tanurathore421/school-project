const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "staff", "student"],
      required: true,
    },

    className: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    section: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    phone: {
      type: String,
      trim: true,
    },

    fatherName: {
      type: String,
      trim: true,
    },

    motherName: {
      type: String,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
    },

    address: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
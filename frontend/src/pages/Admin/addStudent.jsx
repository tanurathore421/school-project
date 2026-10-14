import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./addStudent.css";

function AddStudent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    className: "",
    section: "",
    phone: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(
        " https://school-project-ql8x.onrender.com/api/admin/students",
        formData,
        { withCredentials: true }
      );

      alert("Student added successfully");
      navigate("/admin/students");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add student"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-student-page">
      <div className="add-student-card">
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/admin/students")}
        >
          ← Back to Students
        </button>

        <h1>Add New Student</h1>
        <p className="form-description">
          Enter the student's details below.
        </p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="student-form-grid">
            <div className="student-form-group">
              <label htmlFor="name">Student Name *</label>
              <input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="student-form-group">
              <label htmlFor="email">Email *</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="student-form-group">
              <label htmlFor="password">Password *</label>
              <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="student-form-group">
              <label htmlFor="className">Class *</label>
              <input id="className" name="className" value={formData.className} onChange={handleChange} required />
            </div>

            <div className="student-form-group">
              <label htmlFor="section">Section *</label>
              <input id="section" name="section" value={formData.section} onChange={handleChange} required />
            </div>

            <div className="student-form-group">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="student-form-group">
              <label htmlFor="fatherName">Father's Name</label>
              <input id="fatherName" name="fatherName" value={formData.fatherName} onChange={handleChange} />
            </div>

            <div className="student-form-group">
              <label htmlFor="motherName">Mother's Name</label>
              <input id="motherName" name="motherName" value={formData.motherName} onChange={handleChange} />
            </div>

            <div className="student-form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
            </div>
          </div>

          <div className="student-form-group address-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="student-form-actions">
            <button
              type="button"
              className="cancel-student-btn"
              onClick={() => navigate("/admin/students")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-student-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
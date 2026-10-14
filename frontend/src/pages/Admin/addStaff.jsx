import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./addStaff.css";

function AddStaff() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/staff",
        formData,
        {
          withCredentials: true,
        }
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/admin/staff");
      }, 800);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to create staff"
      );
    }
  };

  return (
    <div className="add-staff-page">
      <h1>Add Staff</h1>
      <p>Create a new staff account</p>

      {message && <div className="staff-message">{message}</div>}

      <form className="add-staff-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin/staff")}
          >
            Cancel
          </button>

          <button type="submit" className="save-staff-btn">
            Create Staff
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStaff;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./addStaff.css";

function EditStaff() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/staff",
          {
            withCredentials: true,
          }
        );

        const member = response.data.staff.find(
          (item) => item._id === id
        );

        if (member) {
          setFormData({
            name: member.name || "",
            email: member.email || "",
            password: "",
            phone: member.phone || "",
            dateOfBirth: member.dateOfBirth
              ? member.dateOfBirth.split("T")[0]
              : "",
            address: member.address || "",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/api/admin/staff/${id}`,
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
      console.log(error);

      setMessage(
        error.response?.data?.message ||
          "Failed to update staff"
      );
    }
  };

  if (loading) {
    return <p>Loading staff information...</p>;
  }

  return (
    <div className="add-staff-page">
      <h1>Edit Staff</h1>
      <p>Update staff information</p>

      {message && (
        <div className="staff-message">
          {message}
        </div>
      )}

      <form
        className="add-staff-form"
        onSubmit={handleSubmit}
      >
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
          <label>New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave empty to keep current password"
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

          <button
            type="submit"
            className="save-staff-btn"
          >
            Update Staff
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditStaff;
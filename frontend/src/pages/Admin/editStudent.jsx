
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./editStudent.css";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          "https://school-project-ql8x.onrender.com/api/admin/students",
          { withCredentials: true }
        );

        const student = response.data.students.find(
          (item) => item._id === id
        );

        if (!student) {
          setMessage("Student not found");
          return;
        }

        setFormData({
          name: student.name || "",
          email: student.email || "",
          password: "",
          className: student.className || "",
          section: student.section || "",
          phone: student.phone || "",
          fatherName: student.fatherName || "",
          motherName: student.motherName || "",
          dateOfBirth: student.dateOfBirth
            ? student.dateOfBirth.split("T")[0]
            : "",
          address: student.address || "",
        });
      } catch (error) {
        console.error(error);
        setMessage(
          error.response?.data?.message ||
            "Failed to load student"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
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
      const { password, ...studentData } = formData;

      const updateData = password
        ? { ...studentData, password }
        : studentData;

      const response = await axios.put(
        `https://school-project-ql8x.onrender.com/api/admin/students/${id}`,
        updateData,
        { withCredentials: true }
      );

      setMessage(
        response.data.message || "Student updated successfully"
      );

      setTimeout(() => {
        navigate("/admin/students");
      }, 800);
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message ||
          "Failed to update student"
      );
    }
  };

  if (loading) {
    return <p>Loading student information...</p>;
  }

  return (
    <div className="edit-student">
      <h2>Edit Student</h2>
      <p>Update student information</p>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        {[
          ["name", "Name", "text"],
          ["email", "Email", "email"],
          ["password", "New Password", "password"],
          ["className", "Class", "text"],
          ["section", "Section", "text"],
          ["phone", "Phone", "text"],
          ["fatherName", "Father Name", "text"],
          ["motherName", "Mother Name", "text"],
          ["dateOfBirth", "Date of Birth", "date"],
        ].map(([name, label, type]) => (
          <div key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              id={name}
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={
                name === "password"
                  ? "Leave empty to keep current password"
                  : ""
              }
              required={
                ["name", "email", "className", "section"].includes(name)
              }
            />
          </div>
        ))}

        <div>
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/admin/students")}
          >
            Cancel
          </button>

          <button type="submit">Update Student</button>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;

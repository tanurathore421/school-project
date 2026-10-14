import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/students",
        { withCredentials: true }
      );

      setStudents(response.data.students || []);
    } catch (error) {
      console.error(
        "Fetch students error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/api/admin/students/${id}`,
        { withCredentials: true }
      );

      setStudents((current) =>
        current.filter((student) => student._id !== id)
      );
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to delete student"
      );
    }
  };

  if (loading) {
    return <p>Loading students...</p>;
  }

  return (
    <div className="students-page">
      <div className="students-header">
        <div>
          <h1>Students</h1>
          <p>Manage all students</p>
        </div>

        <button
          type="button"
          className="add-student-btn"
          onClick={() => navigate("/admin/students/add")}
        >
          + Add Student
        </button>
      </div>

      <div className="students-table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Class</th>
              <th>Section</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-students">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.className}</td>
                  <td>{student.section}</td>
                  <td>{student.phone || "-"}</td>
                  <td className="student-actions">
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() =>
                        navigate(`/admin/students/edit/${student._id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;


/* import React, { useEffect, useState } from "react";
import axios from "axios";
import "./students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/students",
        {
          withCredentials: true,
        }
      );

      setStudents(response.data.students);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) {
    return <p>Loading students...</p>;
  }

  return (
    <div className="students-page">
      <div className="students-header">
        <div>
          <h1>Students</h1>
          <p>Manage all students</p>
        </div>

        <button className="add-student-btn">
          + Add Student
        </button>
      </div>

      <div className="students-table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Class</th>
              <th>Section</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-students">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.className}</td>
                  <td>{student.section}</td>
                  <td>{student.phone || "-"}</td>
                  <td>
                    <button className="edit-btn">Edit</button>

                    <button className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students; */
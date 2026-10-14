import React, { useState } from "react";
import axios from "axios";
import "./students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const getStudents = async () => {
    if (!selectedClass || !selectedSection) {
      alert("Please select class and section");
      return;
    }

    try {
      setLoading(true);
      setSelectedStudent(null);

      const response = await axios.get(
        ` https://school-project-ql8x.onrender.com/api/staff/students?className=${selectedClass}&section=${selectedSection}`,
        {
          withCredentials: true,
        }
      );

      setStudents(response.data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="staff-students-page">
      {/* HEADER */}
      <div className="students-header">
        <div>
          <h1>Students</h1>
          <p>View students according to class and section.</p>
        </div>

        <div className="students-count">
          <span>👨‍🎓</span>

          <div>
            <strong>{students.length}</strong>
            <small>Total Students</small>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="students-filters">
        <div className="students-field">
          <label>Class</label>

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
              <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>

        <div className="students-field">
          <label>Section</label>

          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
             <option value="D">D</option>
              <option value="E">E</option>
               <option value="F">F</option>
          </select>
        </div>

        <button
          className="load-students-btn"
          onClick={getStudents}
        >
          Load Students
        </button>
      </div>

      {/* TABLE */}
      <div className="students-table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Class</th>
              <th>Section</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">Loading students...</td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="6">
                  Select class and section to view students.
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr key={student._id}>
                  <td>{index + 1}</td>

                  <td>
                    <div className="student-name">
                      <div className="student-avatar">👤</div>
                      <span>{student.name}</span>
                    </div>
                  </td>

                  <td>{student.email}</td>

                  <td>{student.className}</td>

                  <td>{student.section}</td>

                  <td>
                    <button
                      className="view-student-btn"
                      onClick={() => handleViewStudent(student)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PERSONAL DETAILS */}
      {selectedStudent && (
        <div className="student-details">
          <div className="student-details-header">
            <div>
              <h2>Student Details</h2>
              <p>Personal information</p>
            </div>

            <button
              className="close-details-btn"
              onClick={() => setSelectedStudent(null)}
            >
              ✕
            </button>
          </div>

          <div className="student-profile">
            <div className="student-details-avatar">
              👤
            </div>

            <div>
              <h3>{selectedStudent.name}</h3>
              <p>
                Class {selectedStudent.className} - Section{" "}
                {selectedStudent.section}
              </p>
            </div>
          </div>

          <div className="student-details-grid">
            <div className="detail-item">
              <span> Email</span>
              <strong>
                {selectedStudent.email || "Not available"}
              </strong>
            </div>

            <div className="detail-item">
              <span> Phone Number</span>
              <strong>
                {selectedStudent.phone || "Not available"}
              </strong>
            </div>

            <div className="detail-item">
              <span> Father&apos;s Name</span>
              <strong>
                {selectedStudent.fatherName || "Not available"}
              </strong>
            </div>

            <div className="detail-item">
              <span> Mother&apos;s Name</span>
              <strong>
                {selectedStudent.motherName || "Not available"}
              </strong>
            </div>

            <div className="detail-item">
              <span> Date of Birth</span>
              <strong>
                {selectedStudent.dateOfBirth
                  ? new Date(
                      selectedStudent.dateOfBirth
                    ).toLocaleDateString()
                  : "Not available"}
              </strong>
            </div>

            <div className="detail-item">
              <span>Class</span>
              <strong>{selectedStudent.className}</strong>
            </div>

            <div className="detail-item">
              <span>Section</span>
              <strong>{selectedStudent.section}</strong>
            </div>

            <div className="detail-item detail-address">
              <span> Address</span>
              <strong>
                {selectedStudent.address || "Not available"}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;
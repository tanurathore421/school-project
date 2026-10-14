import React, { useState } from "react";
import axios from "axios";
import "./attendance.css";

function Attendance() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);

  const loadStudents = async () => {
    if (!selectedClass || !selectedSection || !selectedDate) {
      alert("Please select class, section and date");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(
        ` https://school-project-ql8x.onrender.com/api/staff/students?className=${selectedClass}&section=${selectedSection}`,
        {
          withCredentials: true,
        }
      );

      setStudents(response.data);

      const attendanceResponse = {};

      response.data.forEach((student) => {
        attendanceResponse[student._id] = "Present";
      });

      setAttendance(attendanceResponse);
    } catch (error) {
      console.error("Failed to load students:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (studentId, status) => {
    setAttendance((previous) => ({
      ...previous,
      [studentId]: status,
    }));
  };

  const saveAttendance = async () => {
    if (students.length === 0) {
      alert("Please load students first");
      return;
    }

    try {
      for (const student of students) {
        await axios.post(
          " https://school-project-ql8x.onrender.com/api/staff/attendance",
          {
            student: student._id,
            date: selectedDate,
            status: attendance[student._id],
          },
          {
            withCredentials: true,
          }
        );
      }

      alert("Attendance saved successfully");
    } catch (error) {
      console.error("Failed to save attendance:", error);

      alert(
        error.response?.data?.message ||
          "Failed to save attendance"
      );
    }
  };

  return (
    <div className="staff-attendance-page">
      <div className="attendance-header">
        <div>
          <h1>Attendance</h1>
          <p>Mark and manage student attendance.</p>
        </div>

        <div className="attendance-date">
          📅
          <span>Attendance</span>
        </div>
      </div>

      {/* FILTERS */}
      <div className="attendance-controls">
        <div className="attendance-field">
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

        <div className="attendance-field">
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

        <div className="attendance-field">
          <label>Date</label>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <button
          className="load-students-btn"
          onClick={loadStudents}
        >
          Load Students
        </button>
      </div>

      {/* TABLE */}
      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">Loading students...</td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan="5">
                  Select class, section and date to load students.
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr key={student._id}>
                  <td>{index + 1}</td>

                  <td>
                    <div className="attendance-student">
                      <div className="attendance-avatar">
                        👤
                      </div>

                      <span>{student.name}</span>
                    </div>
                  </td>

                  <td>{student.className}</td>

                  <td>{student.section}</td>

                  <td>
                    <div className="attendance-status">
                      <label>
                        <input
                          type="radio"
                          name={`student-${student._id}`}
                          checked={
                            attendance[student._id] ===
                            "Present"
                          }
                          onChange={() =>
                            handleStatusChange(
                              student._id,
                              "Present"
                            )
                          }
                        />
                        Present
                      </label>

                      <label>
                        <input
                          type="radio"
                          name={`student-${student._id}`}
                          checked={
                            attendance[student._id] ===
                            "Absent"
                          }
                          onChange={() =>
                            handleStatusChange(
                              student._id,
                              "Absent"
                            )
                          }
                        />
                        Absent
                      </label>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {students.length > 0 && (
        <button
          className="save-attendance-btn"
          onClick={saveAttendance}
        >
          Save Attendance
        </button>
      )}
    </div>
  );
}

export default Attendance;
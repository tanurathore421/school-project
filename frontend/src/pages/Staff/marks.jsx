import React, { useState } from "react";
import axios from "axios";
import "./marks.css";

function Marks() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(false);

  const loadStudents = async () => {
    if (!selectedClass || !selectedSection || !selectedSubject) {
      alert("Please select class, section and subject");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:3000/api/staff/students?className=${selectedClass}&section=${selectedSection}`,
        {
          withCredentials: true,
        }
      );

      setStudents(response.data);

      const marksData = {};

      response.data.forEach((student) => {
        marksData[student._id] = {
          unitTest: "",
          assignment: "",
          midTerm: "",
        };
      });

      setMarks(marksData);
    } catch (error) {
      console.error("Failed to load students:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarksChange = (studentId, field, value) => {
    setMarks((previous) => ({
      ...previous,
      [studentId]: {
        ...previous[studentId],
        [field]: value,
      },
    }));
  };

  const saveMarks = async (student) => {
    try {
      const studentMarks = marks[student._id];

      await axios.post(
        "http://localhost:3000/api/staff/marks",
        {
          student: student._id,
          subject: selectedSubject,
          unitTest: Number(studentMarks.unitTest) || 0,
          assignment: Number(studentMarks.assignment) || 0,
          midTerm: Number(studentMarks.midTerm) || 0,
        },
        {
          withCredentials: true,
        }
      );

      alert(`${student.name}'s marks saved successfully`);
    } catch (error) {
      console.error("Failed to save marks:", error);

      alert(
        error.response?.data?.message ||
          "Failed to save marks"
      );
    }
  };

  return (
    <div className="staff-marks-page">
      <div className="marks-header">
        <div>
          <h1>Marks</h1>
          <p>Add and manage student marks.</p>
        </div>

        <div className="marks-icon">📝</div>
      </div>

      {/* FILTERS */}
      <div className="marks-controls">
        <div className="marks-field">
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

        <div className="marks-field">
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

        <div className="marks-field">
          <label>Subject</label>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            <option value="English">English</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="Computer">Computer</option>
          </select>
        </div>

        <button
          className="load-marks-btn"
          onClick={loadStudents}
        >
          Load Students
        </button>
      </div>

      {/* TABLE */}
      <div className="marks-table-container">
        <table className="marks-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Unit Test</th>
              <th>Assignment</th>
              <th>Mid Term</th>
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
                  Select class, section and subject to load students.
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr key={student._id}>
                  <td>{index + 1}</td>

                  <td>
                    <div className="marks-student">
                      <div className="marks-avatar">
                        👤
                      </div>

                      <span>{student.name}</span>
                    </div>
                  </td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      value={marks[student._id]?.unitTest || ""}
                      onChange={(e) =>
                        handleMarksChange(
                          student._id,
                          "unitTest",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      value={
                        marks[student._id]?.assignment || ""
                      }
                      onChange={(e) =>
                        handleMarksChange(
                          student._id,
                          "assignment",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      value={marks[student._id]?.midTerm || ""}
                      onChange={(e) =>
                        handleMarksChange(
                          student._id,
                          "midTerm",
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <button
                      className="save-marks-btn"
                      onClick={() => saveMarks(student)}
                    >
                      Save
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

export default Marks;
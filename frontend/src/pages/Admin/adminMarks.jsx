import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminMarks.css";

function AdminMarks() {
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [unitTest, setUnitTest] = useState("");
  const [assignment, setAssignment] = useState("");
  const [midTerm, setMidTerm] = useState("");

  useEffect(() => {
    fetchStudents();
    fetchMarks();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/students",
        { withCredentials: true }
      );

      setStudents(response.data.students);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMarks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/marks",
        { withCredentials: true }
      );

      setMarks(response.data.marks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/api/admin/marks",
        {
          student: studentId,
          subject,
          unitTest: Number(unitTest) || 0,
          assignment: Number(assignment) || 0,
          midTerm: Number(midTerm) || 0,
        },
        { withCredentials: true }
      );

      alert("Marks saved successfully");

      setStudentId("");
      setSubject("");
      setUnitTest("");
      setAssignment("");
      setMidTerm("");

      fetchMarks();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save marks");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete these marks?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/api/admin/marks/${id}`,
        {
          withCredentials: true,
        }
      );

      alert("Marks deleted successfully");

      fetchMarks();
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to delete marks"
      );
    }
  };

  return (
    <div className="admin-marks">
      <h1>Marks Management</h1>

      <section className="marks-form-section">
        <h2>📝 Add / Update Marks</h2>

        <form onSubmit={handleSubmit}>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          >
            <option value="">Select Student</option>

            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name} - {student.className} {student.section}
              </option>
            ))}
          </select>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value="">Select Subject</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="Social Science">Social Science</option>
            <option value="Computer">Computer</option>
          </select>

          <input
            type="number"
            placeholder="Unit Test"
            value={unitTest}
            onChange={(e) => setUnitTest(e.target.value)}
            min="0"
          />

          <input
            type="number"
            placeholder="Assignment"
            value={assignment}
            onChange={(e) => setAssignment(e.target.value)}
            min="0"
          />

          <input
            type="number"
            placeholder="Mid Term"
            value={midTerm}
            onChange={(e) => setMidTerm(e.target.value)}
            min="0"
          />

          <button type="submit">Save Marks</button>
        </form>
      </section>

      <section className="marks-table-section">
        <h2>Student Marks</h2>

        <div className="marks-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Section</th>
                <th>Subject</th>
                <th>Unit Test</th>
                <th>Assignment</th>
                <th>Mid Term</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {marks.map((mark) => (
                <tr key={mark._id}>
                  <td>{mark.student?.name}</td>
                  <td>{mark.student?.className}</td>
                  <td>{mark.student?.section}</td>
                  <td>{mark.subject}</td>
                  <td>{mark.unitTest}</td>
                  <td>{mark.assignment}</td>
                  <td>{mark.midTerm}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(mark._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminMarks;
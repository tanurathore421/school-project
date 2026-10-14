import React, { useEffect, useState } from "react";
import axios from "axios";
import "./results.css";

function AdminResults() {
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [maximumMarks, setMaximumMarks] = useState("");
  const [obtainedMarks, setObtainedMarks] = useState("");
  const [grade, setGrade] = useState("");
  const [exam, setExam] = useState("Final Examination");
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchStudents();
    fetchResults();
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

  const fetchResults = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/results",
        { withCredentials: true }
      );

      setResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/api/admin/results",
        {
          student: studentId,
          subject,
          maximumMarks: Number(maximumMarks),
          obtainedMarks: Number(obtainedMarks),
          grade,
          exam,
          year: Number(year),
        },
        { withCredentials: true }
      );

      alert("Result saved successfully");

      setStudentId("");
      setSubject("");
      setMaximumMarks("");
      setObtainedMarks("");
      setGrade("");
      setExam("Final Examination");
      setYear(new Date().getFullYear());

      fetchResults();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save result");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this result?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/admin/results/${id}`,
        { withCredentials: true }
      );

      alert("Result deleted successfully");
      fetchResults();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete result");
    }
  };

  return (
    <div className="admin-results">
      <h1>Results Management</h1>

      <section className="results-form-section">
        <h2>📊 Add / Update Result</h2>

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
            placeholder="Maximum Marks"
            value={maximumMarks}
            onChange={(e) => setMaximumMarks(e.target.value)}
            min="0"
            required
          />

          <input
            type="number"
            placeholder="Obtained Marks"
            value={obtainedMarks}
            onChange={(e) => setObtainedMarks(e.target.value)}
            min="0"
            required
          />

          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          >
            <option value="">Select Grade</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>

          <select
            value={exam}
            onChange={(e) => setExam(e.target.value)}
          >
            <option value="Final Examination">Final Examination</option>
            <option value="Mid Term">Mid Term</option>
            <option value="Unit Test">Unit Test</option>
          </select>

          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />

          <button type="submit">Save Result</button>
        </form>
      </section>

      <section className="results-table-section">
        <h2>Student Results</h2>

        <div className="results-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Section</th>
                <th>Subject</th>
                <th>Maximum Marks</th>
                <th>Obtained Marks</th>
                <th>Grade</th>
                <th>Exam</th>
                <th>Year</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {results.map((result) => (
                <tr key={result._id}>
                  <td>{result.student?.name}</td>
                  <td>{result.student?.className}</td>
                  <td>{result.student?.section}</td>
                  <td>{result.subject}</td>
                  <td>{result.maximumMarks}</td>
                  <td>{result.obtainedMarks}</td>
                  <td>{result.grade}</td>
                  <td>{result.exam}</td>
                  <td>{result.year}</td>
                  <td>
                    <button
                      className="delete-result-btn"
                      onClick={() => handleDelete(result._id)}
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

export default AdminResults;
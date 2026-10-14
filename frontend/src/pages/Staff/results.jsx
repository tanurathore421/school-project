import React, { useState } from "react";
import axios from "axios";
import "./results.css";

function Results() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");

  const [subject, setSubject] = useState("");
  const [maximumMarks, setMaximumMarks] = useState("");
  const [obtainedMarks, setObtainedMarks] = useState("");
  const [grade, setGrade] = useState("");
  const [exam, setExam] = useState("Final Examination");
  const [year, setYear] = useState("2026");

  const [results, setResults] = useState([]);


  const loadStudents = async () => {
    if (!selectedClass || !selectedSection) {
      alert("Please select class and section");
      return;
    }

    try {
   

      const response = await axios.get(
        ` https://school-project-ql8x.onrender.com/api/staff/students?className=${selectedClass}&section=${selectedSection}`,
        {
          withCredentials: true,
        }
      );

      setStudents(response.data);
      setSelectedStudent("");
      setResults([]);
    } catch (error) {
      console.error("Failed to load students:", error);
      setStudents([]);
    } 
  };

  const loadResults = async (studentId) => {
    if (!studentId) {
      setResults([]);
      return;
    }

    try {
      const response = await axios.get(
        ` https://school-project-ql8x.onrender.com/api/staff/results/${studentId}`,
        {
          withCredentials: true,
        }
      );

      setResults(response.data);
    } catch (error) {
      console.error("Failed to load results:", error);
      setResults([]);
    }
  };

  const handleStudentChange = (e) => {
    const studentId = e.target.value;

    setSelectedStudent(studentId);

    loadResults(studentId);
  };

  const addResult = async (e) => {
    e.preventDefault();

    if (
      !selectedStudent ||
      !subject ||
      maximumMarks === "" ||
      obtainedMarks === "" ||
      !grade ||
      !year
    ) {
      alert("Please fill all result fields");
      return;
    }

    if (Number(obtainedMarks) > Number(maximumMarks)) {
      alert("Obtained marks cannot be greater than maximum marks");
      return;
    }

    try {
      await axios.post(
        " https://school-project-ql8x.onrender.com/api/staff/results",
        {
          student: selectedStudent,
          subject,
          maximumMarks: Number(maximumMarks),
          obtainedMarks: Number(obtainedMarks),
          grade,
          exam,
          year: Number(year),
        },
        {
          withCredentials: true,
        }
      );

      alert("Result added successfully");

      setSubject("");
      setMaximumMarks("");
      setObtainedMarks("");
      setGrade("");

      loadResults(selectedStudent);
    } catch (error) {
      console.error("Failed to add result:", error);

      alert(
        error.response?.data?.message ||
          "Failed to add result"
      );
    }
  };

  return (
    <div className="staff-results-page">
      {/* HEADER */}
      <div className="results-header">
        <div>
          <h1>Results</h1>
          <p>Manage final examination results.</p>
        </div>

        <div className="results-icon">🏆</div>
      </div>

      {/* CLASS & SECTION */}
      <div className="results-filters">
        <div className="results-field">
          <label>Class</label>

          <select
            value={selectedClass}
            onChange={(e) =>
              setSelectedClass(e.target.value)
            }
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

        <div className="results-field">
          <label>Section</label>

          <select
            value={selectedSection}
            onChange={(e) =>
              setSelectedSection(e.target.value)
            }
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
          className="load-results-students-btn"
          onClick={loadStudents}
        >
          Load Students
        </button>
      </div>

      {/* STUDENT */}
      {students.length > 0 && (
        <div className="student-selection">
          <label>Select Student</label>

          <select
            value={selectedStudent}
            onChange={handleStudentChange}
          >
            <option value="">Select Student</option>

            {students.map((student) => (
              <option
                key={student._id}
                value={student._id}
              >
                {student.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ADD RESULT */}
      {selectedStudent && (
        <div className="add-result-card">
          <h2>Add Result</h2>

          <form onSubmit={addResult}>
            <div className="result-form-grid">
              <div className="results-field">
                <label>Subject</label>

                <select
                  value={subject}
                  onChange={(e) =>
                    setSubject(e.target.value)
                  }
                >
                  <option value="">
                    Select Subject
                  </option>
                  <option value="English">
                    English
                  </option>
                  <option value="Mathematics">
                    Mathematics
                  </option>
                  <option value="Science">
                    Science
                  </option>
                  <option value="Computer">
                    Computer
                  </option>
                </select>
              </div>

              <div className="results-field">
                <label>Maximum Marks</label>

                <input
                  type="number"
                  min="1"
                  value={maximumMarks}
                  onChange={(e) =>
                    setMaximumMarks(e.target.value)
                  }
                  placeholder="e.g. 100"
                />
              </div>

              <div className="results-field">
                <label>Obtained Marks</label>

                <input
                  type="number"
                  min="0"
                  value={obtainedMarks}
                  onChange={(e) =>
                    setObtainedMarks(e.target.value)
                  }
                  placeholder="e.g. 85"
                />
              </div>

              <div className="results-field">
                <label>Grade</label>

                <select
                  value={grade}
                  onChange={(e) =>
                    setGrade(e.target.value)
                  }
                >
                  <option value="">
                    Select Grade
                  </option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
              </div>

              <div className="results-field">
                <label>Exam</label>

                <input
                  type="text"
                  value={exam}
                  onChange={(e) =>
                    setExam(e.target.value)
                  }
                />
              </div>

              <div className="results-field">
                <label>Year</label>

                <input
                  type="number"
                  value={year}
                  onChange={(e) =>
                    setYear(e.target.value)
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="add-result-btn"
            >
              + Add Result
            </button>
          </form>
        </div>
      )}

      {/* RESULTS TABLE */}
      {selectedStudent && (
        <div className="results-table-container">
          <div className="results-table-header">
            <h2>Student Results</h2>
          </div>

          {results.length === 0 ? (
            <p className="no-results">
              No results added for this student.
            </p>
          ) : (
            <table className="results-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Subject</th>
                  <th>Maximum Marks</th>
                  <th>Obtained Marks</th>
                  <th>Grade</th>
                  <th>Exam</th>
                  <th>Year</th>
                </tr>
              </thead>

              <tbody>
                {results.map((result, index) => (
                  <tr key={result._id}>
                    <td>{index + 1}</td>
                    <td>{result.subject}</td>
                    <td>{result.maximumMarks}</td>
                    <td>{result.obtainedMarks}</td>
                    <td>
                      <span className="grade-badge">
                        {result.grade}
                      </span>
                    </td>
                    <td>{result.exam}</td>
                    <td>{result.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Results;
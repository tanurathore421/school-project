import React, { useEffect, useState } from "react";
import axios from "axios";
import "./result.css";

function Result() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getResult = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/student/result",
          {
            withCredentials: true,
          }
        );

        setResults(response.data);
      } catch (error) {
        console.error("Error fetching result:", error);
      } finally {
        setLoading(false);
      }
    };

    getResult();
  }, []);

  const totalMarks = results.reduce(
    (total, item) => total + item.obtainedMarks,
    0
  );

  const maximumMarks = results.reduce(
    (total, item) => total + item.maximumMarks,
    0
  );

  const percentage =
    maximumMarks > 0
      ? Math.round((totalMarks / maximumMarks) * 100)
      : 0;

  if (loading) {
    return <p>Loading result...</p>;
  }

  return (
    <div className="student-result-page">
      <div className="student-result-header">
        <h1>My Result</h1>
        <p>View your final examination result.</p>
      </div>

      {results.length > 0 ? (
        <>
          <div className="result-summary">
            <div className="result-card">
              <h3>Total Marks</h3>
              <p>
                {totalMarks} / {maximumMarks}
              </p>
            </div>

            <div className="result-card">
              <h3>Percentage</h3>
              <p>{percentage}%</p>
            </div>

            <div className="result-card">
              <h3>Grade</h3>
              <p>{results[0].grade}</p>
            </div>

            <div className="result-card">
              <h3>Status</h3>
              <p>Pass</p>
            </div>
          </div>

          <div className="student-result-table-container">
            <table className="student-result-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Maximum Marks</th>
                  <th>Obtained Marks</th>
                  <th>Grade</th>
                </tr>
              </thead>

              <tbody>
                {results.map((item) => (
                  <tr key={item._id}>
                    <td>{item.subject}</td>
                    <td>{item.maximumMarks}</td>
                    <td>{item.obtainedMarks}</td>
                    <td>{item.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>No result available</p>
      )}
    </div>
  );
}

export default Result;
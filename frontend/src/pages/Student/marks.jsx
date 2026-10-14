import React, { useEffect, useState } from "react";
import axios from "axios";
import "./marks.css";

function Marks() {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMarks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/student/marks",
          {
            withCredentials: true,
          }
        );

        setMarks(response.data);
      } catch (error) {
        console.error("Error fetching marks:", error);
      } finally {
        setLoading(false);
      }
    };

    getMarks();
  }, []);

  if (loading) {
    return <p>Loading marks...</p>;
  }

  return (
    <div className="student-marks-page">
      <div className="student-marks-header">
        <h1>My Marks</h1>
        <p>View your unit test, assignment and mid-term marks.</p>
      </div>

      <div className="student-marks-table-container">
        <table className="student-marks-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Unit Test</th>
              <th>Assignment</th>
              <th>Mid Term</th>
            </tr>
          </thead>

          <tbody>
            {marks.length > 0 ? (
              marks.map((mark) => (
                <tr key={mark._id}>
                  <td>{mark.subject}</td>
                  <td>{mark.unitTest}</td>
                  <td>{mark.assignment}</td>
                  <td>{mark.midTerm}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No marks available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Marks;
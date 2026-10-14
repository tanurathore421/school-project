import React, { useEffect, useState } from "react";
import axios from "axios";
import "./attendance.css";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("2026-10");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAttendance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/student/attendance",
          {
            withCredentials: true,
          }
        );

        setAttendance(response.data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    getAttendance();
  }, []);

  // Selected month ki attendance
  const monthlyAttendance = attendance.filter((item) => {
    const date = new Date(item.date);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${year}-${month}` === selectedMonth;
  });

  const presentDays = monthlyAttendance.filter(
    (item) => item.status === "Present"
  ).length;

  const absentDays = monthlyAttendance.filter(
    (item) => item.status === "Absent"
  ).length;

  const totalDays = monthlyAttendance.length;

  const percentage =
    totalDays > 0
      ? Math.round((presentDays / totalDays) * 100)
      : 0;

  if (loading) {
    return <p>Loading attendance...</p>;
  }

  return (
    <div className="student-attendance-page">

      {/* HEADER */}
      <div className="student-attendance-header">
        <div>
          <h1>My Attendance</h1>
          <p>View your monthly attendance record.</p>
        </div>

        {/* MONTH PICKER */}
        <div className="attendance-month-selector">
          <label>Select Month</label>

          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>
      </div>

      {/* SUMMARY */}
      <div className="attendance-summary">

        <div className="attendance-card">
          <h3>Present</h3>
          <p>{presentDays} Days</p>
        </div>

        <div className="attendance-card">
          <h3>Absent</h3>
          <p>{absentDays} Days</p>
        </div>

        <div className="attendance-card">
          <h3>Total</h3>
          <p>{totalDays} Days</p>
        </div>

        <div className="attendance-card">
          <h3>Percentage</h3>
          <p>{percentage}%</p>
        </div>

      </div>

      {/* ATTENDANCE TABLE */}
      <div className="student-attendance-table-container">
        <table className="student-attendance-table">

          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {monthlyAttendance.length > 0 ? (
              monthlyAttendance.map((item) => (
                <tr key={item._id}>

                  <td>
                    {new Date(item.date).toLocaleDateString()}
                  </td>

                  <td>
                    {new Date(item.date).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                      }
                    )}
                  </td>

                  <td>{item.status}</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">
                  No attendance available for this month.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default Attendance;
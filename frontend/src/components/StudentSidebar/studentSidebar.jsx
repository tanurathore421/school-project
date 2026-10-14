import React from "react";
import "./studentSidebar.css";
import axios from "axios";

function StudentSidebar() {

    const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="student-common-sidebar">

      <div className="student-common-logo">
        <span>🏫</span>
        <span>School Portal</span>
      </div>

      <nav className="student-common-nav">

        <a href="/student">
          <span>🏠</span>
          Dashboard
        </a>

        <a href="/student/marks">
          <span>📊</span>
          Marks
        </a>

        <a href="/student/attendance">
          <span>📅</span>
          Attendance
        </a>

        <a href="/student/timetable">
          <span>🕐</span>
          Timetable
        </a>

        <a href="/student/result">
          <span>📄</span>
          Results
        </a>

        <a href="/student/notices">
          <span>📢</span>
          Notices
        </a>

      </nav>

      <button className="student-common-logout" onClick={handleLogout}>
        <span>🚪</span>
        Logout
      </button>

    </aside>
  );
}

export default StudentSidebar;
import React from "react";
import axios from "axios";
import "./staffSidebar.css";

function StaffSidebar() {
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="staff-common-sidebar">
      <div className="staff-common-logo">
        <span>🏫</span>
        <span>School Portal</span>
      </div>

      <nav className="staff-common-nav">
        <a href="/staff">
          <span>🏠</span>
          Dashboard
        </a>

        <a href="/staff/students">
          <span>👨‍🎓</span>
          Students
        </a>

        <a href="/staff/attendance">
          <span>📅</span>
          Attendance
        </a>

        <a href="/staff/marks">
          <span>📝</span>
          Marks
        </a>

        <a href="/staff/timetable">
          <span>🕐</span>
          Timetable
        </a>

        <a href="/staff/results">
          <span>🏆</span>
          Results
        </a>

        <a href="/staff/notices">
          <span>📢</span>
          Notices
        </a>
      </nav>

      <button className="staff-common-logout" onClick={handleLogout}>
        <span>🚪</span>
        Logout
      </button>
    </aside>
  );
}

export default StaffSidebar;

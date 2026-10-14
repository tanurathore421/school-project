import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./adminSidebar.css";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h2>🏫 School Admin</h2>
      </div>

      <nav className="admin-sidebar-nav">
        <NavLink to="/admin">🏠 Dashboard</NavLink>

        <NavLink to="/admin/students">👨‍🎓 Students</NavLink>

        <NavLink to="/admin/staff">👨‍🏫 Staff</NavLink>

        <NavLink to="/admin/attendance">📋 Attendance</NavLink>

        <NavLink to="/admin/marks">📝 Marks</NavLink>

        <NavLink to="/admin/timetable">🗓️ Timetable</NavLink>

        <NavLink to="/admin/results">📊 Results</NavLink>

        <NavLink to="/admin/notices">📢 Notices</NavLink>
      </nav>

      <button className="admin-logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>
    </aside>
  );
}

export default AdminSidebar;
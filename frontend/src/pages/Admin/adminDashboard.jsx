import React from "react";
import { useNavigate } from "react-router-dom";
import "./adminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "👨‍🎓 Students",
      description: "Manage students",
      path: "/admin/students",
    },
    {
      title: "👨‍🏫 Staff",
      description: "Manage staff members",
      path: "/admin/staff",
    },
    {
      title: "📋 Attendance",
      description: "Manage attendance",
      path: "/admin/attendance",
    },
    {
      title: "📝 Marks",
      description: "Manage marks",
      path: "/admin/marks",
    },
    {
      title: "📊 Results",
      description: "Manage results",
      path: "/admin/results",
    },
    {
      title: "📢 Notices",
      description: "Manage notices",
      path: "/admin/notices",
    },
      {
      title: "📅 Timetable",
      description: "Manage timetable",
      path: "/admin/timetable",
    },
  ];

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the School Management System.</p>

      <div className="admin-dashboard-cards">
        {cards.map((card) => (
          <div
            className="admin-card"
            key={card.path}
            onClick={() => navigate(card.path)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate(card.path);
              }
            }}
          >
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;


/* import React from "react";
import "./adminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the School Management System.</p>

      <div className="admin-dashboard-cards">
        <div className="admin-card">
          <h3>👨‍🎓 Students</h3>
          <p>Manage students</p>
        </div>

        <div className="admin-card">
          <h3>👨‍🏫 Staff</h3>
          <p>Manage staff members</p>
        </div>

        <div className="admin-card">
          <h3>📋 Attendance</h3>
          <p>Manage attendance</p>
        </div>

        <div className="admin-card">
          <h3>📝 Marks</h3>
          <p>Manage marks</p>
        </div>

        <div className="admin-card">
          <h3>📊 Results</h3>
          <p>Manage results</p>
        </div>

        <div className="admin-card">
          <h3>📢 Notices</h3>
          <p>Manage notices</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard; */
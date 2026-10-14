import React from "react";
import { useNavigate } from "react-router-dom";
import "./staffDashboard.css";

function StaffDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      icon: "👨‍🎓",
      title: "Students",
      description: "View and manage students assigned to you.",
      button: "View Students",
      path: "/staff/students",
    },
    {
      icon: "📅",
      title: "Attendance",
      description: "Mark and view student attendance.",
      button: "Manage Attendance",
      path: "/staff/attendance",
    },
    {
      icon: "📝",
      title: "Marks",
      description: "Add and update student marks.",
      button: "Manage Marks",
      path: "/staff/marks",
    },
    {
      icon: "🕐",
      title: "Timetable",
      description: "View your class timetable.",
      button: "View Timetable",
      path: "/staff/timetable",
    },
    {
      icon: "📢",
      title: "Notices",
      description: "View important school announcements.",
      button: "Manage Notices",
      path: "/staff/notices",
    },
       {
      icon: "📊",
      title: "Results",
      description: "View student results.",
      button: "Manage Results",
      path: "/staff/results",
    },
  ];

  return (
    <>
      <header className="staff-topbar">
        <div>
          <h1>Staff Dashboard</h1>
          <p>Manage your classes and student activities.</p>
        </div>

        <div className="staff-profile">
          <div className="staff-profile-icon">👤</div>
          <div>
            <strong>Staff Member</strong>
            <span>Teacher</span>
          </div>
        </div>
      </header>

      <section className="staff-grid">
        {cards.map((card) => (
          <div className="staff-card" key={card.path}>
            <div className="staff-card-icon">{card.icon}</div>

            <h2>{card.title}</h2>
            <p>{card.description}</p>

            <button onClick={() => navigate(card.path)}>
              {card.button}
            </button>
          </div>
        ))}
      </section>
    </>
  );
}

export default StaffDashboard;
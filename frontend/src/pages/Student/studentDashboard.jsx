import React from "react";
import "./studentDashboard.css";

function StudentDashboard() {
  return (
    <div className="student-dashboard">

      {/* Header */}
      <header className="student-topbar">
        <div>
          <h1>Student Dashboard</h1>
          <p>Welcome back! Here's your academic overview.</p>
        </div>

        <div className="student-profile">
          <div className="profile-icon">👤</div>

          <div>
            <strong>Student</strong>
            <span>Class 10</span>
          </div>
        </div>
      </header>

      {/* Dashboard Cards */}
      <section className="dashboard-grid">

        {/* Marks */}
        <div className="dashboard-card">
          <div className="card-icon">📊</div>

          <div className="card-content">
            <h2>Marks</h2>
            <p>
              View your subject-wise marks and performance.
            </p>
          </div>

          <button
            onClick={() =>
              (window.location.href = "/student/marks")
            }
          >
            View Marks
          </button>
        </div>

        {/* Attendance */}
        <div className="dashboard-card">
          <div className="card-icon">📅</div>

          <div className="card-content">
            <h2>Attendance</h2>
            <p>
              Check your daily and monthly attendance.
            </p>
          </div>

          <button
            onClick={() =>
              (window.location.href = "/student/attendance")
            }
          >
            View Attendance
          </button>
        </div>

        {/* Timetable */}
        <div className="dashboard-card">
          <div className="card-icon">🕐</div>

          <div className="card-content">
            <h2>Timetable</h2>
            <p>
              Check your daily class schedule.
            </p>
          </div>

          <button
            onClick={() =>
              (window.location.href = "/student/timetable")
            }
          >
            View Timetable
          </button>
        </div>

        {/* Results */}
        <div className="dashboard-card">
          <div className="card-icon">📄</div>

          <div className="card-content">
            <h2>Results</h2>
            <p>
              View your examination results and grades.
            </p>
          </div>

          <button
            onClick={() =>
              (window.location.href = "/student/result")
            }
          >
            View Results
          </button>
        </div>

        {/* Notices */}
        <div className="dashboard-card">
          <div className="card-icon">📢</div>

          <div className="card-content">
            <h2>Notices</h2>
            <p>
              Read important school announcements.
            </p>
          </div>

          <button
            onClick={() =>
              (window.location.href = "/student/notices")
            }
          >
            View Notices
          </button>
        </div>

      </section>
    </div>
  );
}

export default StudentDashboard;
import React from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../StudentSidebar/studentSidebar";

function StudentLayout() {
  return (
    <div className="student-layout">

      <StudentSidebar />

      <main className="student-main">
        <Outlet />
      </main>

    </div>
  );
}

export default StudentLayout;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adminAttendance.css";

function AdminAttendance() {
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [staffAttendance, setStaffAttendance] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  useEffect(() => {
    fetchStudents();
    fetchStaff();
    fetchAttendance();
    fetchStaffAttendance();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/students",
        { withCredentials: true }
      );

      setStudents(response.data.students);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/staff",
        { withCredentials: true }
      );

      setStaff(response.data.staff);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/attendance",
        { withCredentials: true }
      );

      setStudentAttendance(response.data.attendance);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStaffAttendance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/staff-attendance",
        { withCredentials: true }
      );

      setStaffAttendance(response.data.attendance);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStudentAttendance = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/api/admin/attendance",
        {
          student: studentId,
          date,
          status,
        },
        { withCredentials: true }
      );

      alert("Student attendance marked successfully");

      setStudentId("");
      setDate("");
      setStatus("Present");

      fetchAttendance();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to mark attendance");
    }
  };

  const handleStaffAttendance = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/api/admin/staff-attendance",
        {
          staff: staffId,
          date,
          status,
        },
        { withCredentials: true }
      );

      alert("Staff attendance marked successfully");

      setStaffId("");
      setDate("");
      setStatus("Present");

      fetchStaffAttendance();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to mark staff attendance"
      );
    }
  };

  return (
    <div className="admin-attendance">
      <h1>Attendance Management</h1>

      {/* STUDENT ATTENDANCE */}

      <section className="attendance-section">
        <h2>👨‍🎓 Student Attendance</h2>

        <form onSubmit={handleStudentAttendance}>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          >
            <option value="">Select Student</option>

            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name} - {student.className} {student.section}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <button type="submit">Mark Attendance</button>
        </form>

        <div className="attendance-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Section</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {studentAttendance.map((record) => (
                <tr key={record._id}>
                  <td>{record.student?.name}</td>
                  <td>{record.student?.className}</td>
                  <td>{record.student?.section}</td>
                  <td>
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* STAFF ATTENDANCE */}

      <section className="attendance-section">
        <h2>👨‍🏫 Staff Attendance</h2>

        <form onSubmit={handleStaffAttendance}>
          <select
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            required
          >
            <option value="">Select Staff</option>

            {staff.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <button type="submit">Mark Attendance</button>
        </form>

        <div className="attendance-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Staff</th>
                <th>Email</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {staffAttendance.map((record) => (
                <tr key={record._id}>
                  <td>{record.staff?.name}</td>
                  <td>{record.staff?.email}</td>
               
                  <td>
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminAttendance;
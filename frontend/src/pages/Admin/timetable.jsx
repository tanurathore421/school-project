import React, { useEffect, useState } from "react";
import axios from "axios";
import "./timetable.css";

function AdminTimetable() {
  const [timetable, setTimetable] = useState([]);
  const [staff, setStaff] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    className: "",
    section: "",
    day: "",
    time: "",
    subject: "",
    teacher: "",
  });

  const timeSlots = [
    "07:00 AM - 08:00 AM",
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const fetchTimetable = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/timetable",
        {
          withCredentials: true,
        }
      );

      setTimetable(response.data.timetable || []);
    } catch (error) {
      console.error("FETCH TIMETABLE ERROR:", error);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/staff",
        {
          withCredentials: true,
        }
      );

      setStaff(response.data.staff || []);
    } catch (error) {
      console.error("FETCH STAFF ERROR:", error);
    }
  };

  useEffect(() => {
    fetchTimetable();
    fetchStaff();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClassChange = (value) => {
    setSelectedClass(value);

    setFormData({
      ...formData,
      className: value,
    });
  };

  const handleSectionChange = (value) => {
    const section = value.toUpperCase();

    setSelectedSection(section);

    setFormData({
      ...formData,
      section,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:3000/api/admin/timetable/${editingId}`,
          formData,
          {
            withCredentials: true,
          }
        );

        alert("Timetable updated successfully");
      } else {
        await axios.post(
          "http://localhost:3000/api/admin/timetable",
          formData,
          {
            withCredentials: true,
          }
        );

        alert("Timetable added successfully");
      }

      setEditingId(null);

      setFormData({
        className: selectedClass,
        section: selectedSection,
        day: "",
        time: "",
        subject: "",
        teacher: "",
      });

      fetchTimetable();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to save timetable"
      );
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);

    setFormData({
      className: item.className,
      section: item.section,
      day: item.day,
      time: item.time,
      subject: item.subject,
      teacher: item.teacher?._id || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this timetable entry?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/api/admin/timetable/${id}`,
        {
          withCredentials: true,
        }
      );

      fetchTimetable();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete timetable"
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);

    setFormData({
      className: selectedClass,
      section: selectedSection,
      day: "",
      time: "",
      subject: "",
      teacher: "",
    });
  };

  const getTimetableEntry = (day, time) => {
    return timetable.find(
      (item) =>
        item.className === selectedClass &&
        item.section === selectedSection &&
        item.day === day &&
        item.time === time
    );
  };

  return (
    <div className="admin-timetable">

      <div className="admin-timetable-header">
        <h1>Weekly Timetable</h1>

        <p>
          Manage timetable for selected class and section
        </p>
      </div>

      {/* CLASS AND SECTION */}

      <div className="timetable-selection">

        <div>
          <label>Class</label>

          <select
            value={selectedClass}
            onChange={(e) =>
              handleClassChange(e.target.value)
            }
          >
            <option value="">Select Class</option>

            {Array.from({ length: 12 }, (_, index) => (
              <option
                key={index + 1}
                value={String(index + 1)}
              >
                Class {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Section</label>

          <select
            value={selectedSection}
            onChange={(e) =>
              handleSectionChange(e.target.value)
            }
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

      </div>

      {/* ADD / EDIT FORM */}

      {selectedClass && selectedSection && (
        <form
          className="admin-timetable-form"
          onSubmit={handleSubmit}
        >

          <h2>
            {editingId
              ? "Edit Timetable"
              : "Add Timetable"}
          </h2>

          <div className="form-grid">

            <div>
              <label>Day</label>

              <select
                name="day"
                value={formData.day}
                onChange={handleChange}
                required
              >
                <option value="">Select Day</option>

                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Time</label>

              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              >
                <option value="">Select Time</option>

                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Subject</label>

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Subject
                </option>

                <option value="English">
                  English
                </option>

                <option value="Hindi">
                  Hindi
                </option>

                <option value="Mathematics">
                  Mathematics
                </option>

                <option value="Science">
                  Science
                </option>

                <option value="Social Science">
                  Social Science
                </option>

                <option value="Computer">
                  Computer
                </option>

                <option value="Physics">
                  Physics
                </option>

                <option value="Chemistry">
                  Chemistry
                </option>

                <option value="Biology">
                  Biology
                </option>
              </select>
            </div>

            <div>
              <label>Teacher</label>

              <select
                name="teacher"
                value={formData.teacher}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Teacher
                </option>

                {staff.map((member) => (
                  <option
                    key={member._id}
                    value={member._id}
                  >
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="form-buttons">

            <button type="submit">
              {editingId
                ? "💾 Update Timetable"
                : "➕ Add Timetable"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}

          </div>

        </form>
      )}

      {/* WEEKLY TIMETABLE */}

      <div className="weekly-timetable">

        <div className="weekly-header">

          <h2>
            {selectedClass && selectedSection
              ? `Class ${selectedClass} - Section ${selectedSection}`
              : "Weekly Timetable"}
          </h2>

        </div>

        {!selectedClass || !selectedSection ? (
          <div className="select-message">
            Select class and section to view timetable.
          </div>
        ) : (
          <div className="timetable-scroll">

            <table>

              <thead>

                <tr>

                  <th>Day</th>

                  {timeSlots.map((time) => {
                    const [start, end] = time.split(" - ");

                    return (
                      <th key={time}>
                        <div className="time-start">
                          {start}
                        </div>

                        <div className="time-end">
                          {end}
                        </div>
                      </th>
                    );
                  })}

                </tr>

              </thead>

              <tbody>

                {days.map((day) => (
                  <tr key={day}>

                    <td className="day-cell">
                      {day}
                    </td>

                    {timeSlots.map((time) => {

                      const item =
                        getTimetableEntry(
                          day,
                          time
                        );

                      return (
                        <td
                          key={`${day}-${time}`}
                          className="timetable-cell"
                        >

                          {item ? (
                            <div className="class-content">

                              <strong>
                                {item.subject}
                              </strong>

                              <span>
                                {item.teacher?.name ||
                                  "Teacher"}
                              </span>

                              <div className="cell-actions">

                                <button
                                  type="button"
                                  className="edit-cell-btn"
                                  onClick={() =>
                                    handleEdit(item)
                                  }
                                >
                                  ✏️
                                </button>

                                <button
                                  type="button"
                                  className="delete-cell-btn"
                                  onClick={() =>
                                    handleDelete(
                                      item._id
                                    )
                                  }
                                >
                                  🗑️
                                </button>

                              </div>

                            </div>
                          ) : (
                            <span className="empty-cell">
                              -
                            </span>
                          )}

                        </td>
                      );
                    })}

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default AdminTimetable;
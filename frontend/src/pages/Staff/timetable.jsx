import React, { useState } from "react";
import axios from "axios";
import "./timetable.css";

function Timetable() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [timetable, setTimetable] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    day: "",
    time: "",
    subject: "",
  });

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const periods = [
    "07:00 AM - 08:00 AM",
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    
  ];

  const getTimetable = async () => {
    if (!selectedClass || !selectedSection) {
      alert("Please select class and section");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/api/staff/timetable?className=${selectedClass}&section=${selectedSection}`,
        {
          withCredentials: true,
        },
      );

      setTimetable(response.data);
    } catch (error) {
      console.error("Failed to fetch timetable:", error);
      setTimetable([]);
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openAddForm = () => {
    setEditingId(null);

    setFormData({
      day: "",
      time: "",
      subject: "",
    });

    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingId(item._id);

    setFormData({
      day: item.day,
      time: item.time,
      subject: item.subject,
    });

    setShowForm(true);
  };

  const saveTimetable = async (e) => {
    e.preventDefault();

    if (!selectedClass || !selectedSection) {
      alert("Please select class and section first");
      return;
    }

    if (!formData.day || !formData.time || !formData.subject) {
      alert("Please fill all timetable fields");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:3000/api/staff/timetable/${editingId}`,
          {
            className: selectedClass,
            section: selectedSection,
            day: formData.day,
            time: formData.time,
            subject: formData.subject,
          },
          {
            withCredentials: true,
          },
        );

        alert("Timetable updated successfully");
      } else {
        await axios.post(
          "http://localhost:3000/api/staff/timetable",
          {
            className: selectedClass,
            section: selectedSection,
            day: formData.day,
            time: formData.time,
            subject: formData.subject,
          },
          {
            withCredentials: true,
          },
        );

        alert("Timetable added successfully");
      }

      setShowForm(false);

      setEditingId(null);

      setFormData({
        day: "",
        time: "",
        subject: "",
      });

      getTimetable();
    } catch (error) {
      console.error("Failed to save timetable:", error);

      alert(error.response?.data?.message || "Failed to save timetable");
    }
  };

  const deleteTimetable = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this timetable entry?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/staff/timetable/${id}`, {
        withCredentials: true,
      });

      alert("Timetable deleted successfully");

      getTimetable();
    } catch (error) {
      console.error("Failed to delete timetable:", error);

      alert(error.response?.data?.message || "Failed to delete timetable");
    }
  };

  const getSubject = (day, time) => {
    const item = timetable.find(
      (entry) => entry.day === day && entry.time === time,
    );

    return item;
  };

  return (
    <div className="staff-timetable-page">
      {/* HEADER */}
      <div className="timetable-header">
        <div>
          <h1>Timetable</h1>
          <p>Manage weekly timetable according to class and section.</p>
        </div>

        <div className="timetable-icon">🕐</div>
      </div>

      {/* FILTERS */}
      <div className="timetable-filters">
        <div className="timetable-field">
          <label>Class</label>

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>

        <div className="timetable-field">
          <label>Section</label>

          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
        </div>

        <button className="view-timetable-btn" onClick={getTimetable}>
          View Timetable
        </button>

        <button className="add-timetable-btn" onClick={openAddForm}>
          + Add Timetable
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <form className="timetable-form" onSubmit={saveTimetable}>
          <h2>{editingId ? "Edit Timetable" : "Add Timetable"}</h2>

          <div className="timetable-form-row">
            <div className="timetable-field">
              <label>Day</label>

              <select
                name="day"
                value={formData.day}
                onChange={handleFormChange}
              >
                <option value="">Select Day</option>

                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div className="timetable-field">
              <label>Period</label>

              <select
                name="time"
                value={formData.time}
                onChange={handleFormChange}
              >
                <option value="">Select Period</option>

                {periods.map((period) => (
                  <option key={period} value={period}>
                    {period}
                  </option>
                ))}
              </select>
            </div>
<div className="timetable-field">
  <label>Subject</label>

  <select
    name="subject"
    value={formData.subject}
    onChange={handleFormChange}
  >
    <option value="">Select Subject</option>
    <option value="English">English</option>
    <option value="Hindi">Hindi</option>
    <option value="Mathematics">Mathematics</option>
    <option value="Science">Science</option>
    <option value="Social Science">Social Science</option>
    <option value="Computer">Computer</option>
    <option value="Physics">Physics</option>
    <option value="Chemistry">Chemistry</option>
    <option value="Biology">Biology</option>
  </select>
</div>

            <button type="submit" className="save-timetable-btn">
              {editingId ? "Update" : "Save"}
            </button>
          </div>
        </form>
      )}

      {/* WEEKLY TIMETABLE */}
      <div className="weekly-timetable-container">
        <div className="weekly-timetable-header">
          <h2>Weekly Timetable</h2>

          <span>
            {selectedClass && selectedSection
              ? `Class ${selectedClass} - Section ${selectedSection}`
              : "Select class and section"}
          </span>
        </div>

        <div className="weekly-timetable-wrapper">
          <table className="weekly-timetable">
            <thead>
              <tr>
                <th>Day</th>

                {periods.map((period) => (
                  <th key={period}>
                    {period.split(" - ")[0]}
                    <small>{period.split(" - ")[1]}</small>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {days.map((day) => (
                <tr key={day}>
                  <td className="day-column">
                    <strong>{day}</strong>
                  </td>

                  {periods.map((period) => {
                    const item = getSubject(day, period);

                    return (
                      <td key={period}>
                        {item ? (
                          <div className="subject-cell">
                            <strong>{item.subject}</strong>

                            <div className="cell-actions">
                              <button
                                className="edit-btn"
                                title="Edit"
                                onClick={() => handleEdit(item)}
                              >
                                ✎
                              </button>

                              <button
                                className="delete-btn"
                                title="Delete"
                                onClick={() => deleteTimetable(item._id)}
                              >
                                🗑
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Timetable;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./timetable.css";

function Timetable() {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

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
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
  ];

  const getTimetable = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/api/student/timetable",
        {
          withCredentials: true,
        }
      );

      setTimetable(response.data);
    } catch (error) {
      console.error("Failed to fetch timetable:", error);
      setTimetable([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTimetable();
  }, []);

  const getSubject = (day, time) => {
    const item = timetable.find(
      (entry) =>
        entry.day === day &&
        entry.time === time
    );

    return item;
  };

  return (
    <div className="student-timetable-page">

      {/* Header */}
      <div className="student-timetable-header">
        <div>
          <h1>My Timetable</h1>
          <p>View your weekly class timetable.</p>
        </div>

        <div className="student-timetable-icon">
          🕐
        </div>
      </div>

      {/* Timetable */}
      <div className="student-weekly-timetable-container">

        <div className="student-weekly-timetable-header">
          <h2>Weekly Timetable</h2>
        </div>

        {loading ? (
          <div className="student-timetable-loading">
            Loading timetable...
          </div>
        ) : (
          <div className="student-weekly-timetable-wrapper">

            <table className="student-weekly-timetable">

              <thead>
                <tr>
                  <th>Day</th>

                  {periods.map((period) => (
                    <th key={period}>
                      {period.split(" - ")[0]}
                      <small>
                        {period.split(" - ")[1]}
                      </small>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>

                {days.map((day) => (
                  <tr key={day}>

                    <td className="student-day-column">
                      <strong>{day}</strong>
                    </td>

                    {periods.map((period) => {

                      const item = getSubject(
                        day,
                        period
                      );

                      return (
                        <td key={period}>

                          {item ? (
                            <div className="student-subject-cell">
                              <strong>
                                {item.subject}
                              </strong>
                            </div>
                          ) : (
                            <span className="empty-period">
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

export default Timetable;
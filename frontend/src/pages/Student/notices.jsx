import React, { useEffect, useState } from "react";
import axios from "axios";
import "./notices.css";

function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNotices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/student/notices",
          {
            withCredentials: true,
          }
        );

        setNotices(response.data);
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    };

    getNotices();
  }, []);

  if (loading) {
    return <p>Loading notices...</p>;
  }

  return (
    <div className="student-notices-page">
      <div className="student-notices-header">
        <h1>Notices</h1>
        <p>Latest school announcements and notices.</p>
      </div>

      <div className="student-notices-list">
        {notices.length > 0 ? (
          notices.map((item) => (
            <div className="student-notice-card" key={item._id}>
              <h2>{item.title}</h2>

              <p>{item.message}</p>

              <div className="student-notice-footer">
                <span>
                  📅{" "}
                  {new Date(item.postedOn).toLocaleDateString()}
                </span>

                <span>
                  👤 {item.postedBy?.name || "School Admin"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No notices available</p>
        )}
      </div>
    </div>
  );
}

export default Notices;
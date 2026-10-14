import React, { useEffect, useState } from "react";
import axios from "axios";
import "./notice.css";

function Notices() {
  const [notices, setNotices] = useState([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("all");

  const [loading, setLoading] = useState(false);

  const getNotices = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/api/staff/notices",
        {
          withCredentials: true,
        }
      );

      setNotices(response.data);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotices();
  }, []);

  const createNotice = async (e) => {
    e.preventDefault();

    if (!title.trim() || !message.trim()) {
      alert("Please enter title and message");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/staff/notices",
        {
          title,
          message,
          target,
        },
        {
          withCredentials: true,
        }
      );

      alert("Notice created successfully");

      setTitle("");
      setMessage("");
      setTarget("all");

      getNotices();
    } catch (error) {
      console.error("Failed to create notice:", error);
      alert(error.response?.data?.message || "Failed to create notice");
    }
  };

  const deleteNotice = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/api/staff/notices/${id}`,
        {
          withCredentials: true,
        }
      );

      alert("Notice deleted successfully");

      getNotices();
    } catch (error) {
      console.error("Failed to delete notice:", error);
      alert(error.response?.data?.message || "Failed to delete notice");
    }
  };

  return (
    <div className="staff-notices-page">
      <div className="notices-header">
        <div>
          <h1>Notices</h1>
          <p>Create and manage school notices.</p>
        </div>

        <div className="notices-icon">📢</div>
      </div>

      <div className="create-notice-card">
        <h2>Create Notice</h2>

        <form onSubmit={createNotice}>
          <div className="notice-form-group">
            <label>Notice Title</label>

            <input
              type="text"
              placeholder="Enter notice title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="notice-form-group">
            <label>Message</label>

            <textarea
              rows="5"
              placeholder="Enter notice message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <div className="notice-form-group">
            <label>Send To</label>

            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            >
              <option value="all">Everyone</option>
              <option value="student">Students</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <button type="submit" className="create-notice-btn">
            📢 Publish Notice
          </button>
        </form>
      </div>

      <div className="notice-list-section">
        <div className="notice-list-header">
          <h2>Recent Notices</h2>
          <span>{notices.length} Notices</span>
        </div>

        {loading ? (
          <div className="notice-message">Loading notices...</div>
        ) : notices.length === 0 ? (
          <div className="notice-message">No notices available.</div>
        ) : (
          <div className="notice-list">
            {notices.map((notice) => (
              <div className="notice-card" key={notice._id}>
                <div className="notice-card-top">
                  <div className="notice-title-section">
                    <div className="notice-card-icon">📢</div>

                    <div>
                      <h3>{notice.title}</h3>

                      <p className="notice-date">
                        {notice.postedOn
                          ? new Date(
                              notice.postedOn
                            ).toLocaleDateString()
                          : "Date not available"}
                      </p>
                    </div>
                  </div>

                  <button
                    className="delete-notice-btn"
                    onClick={() => deleteNotice(notice._id)}
                    title="Delete Notice"
                  >
                    🗑
                  </button>
                </div>

                <p className="notice-message-text">
                  {notice.message}
                </p>

                <div className="notice-footer">
                  <div className="notice-posted-by">
                    <span className="notice-label">Posted by</span>
                    <strong>
                      {notice.postedBy?.name || "Staff"}
                    </strong>
                  </div>

                  <div className="notice-target">
                    <span className="notice-label">Target</span>
                    <strong>
                      {notice.target === "all"
                        ? "Everyone"
                        : notice.target === "student"
                        ? "Students"
                        : "Staff"}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notices;
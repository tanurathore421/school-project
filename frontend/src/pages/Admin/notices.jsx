import React, { useEffect, useState } from "react";
import axios from "axios";
import "./notices.css";

function AdminNotices() {
  const [notices, setNotices] = useState([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState("all");

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/notices",
        { withCredentials: true }
      );

      setNotices(response.data.notices);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/api/admin/notices",
        {
          title,
          message,
          target,
        },
        { withCredentials: true }
      );

      alert("Notice created successfully");

      setTitle("");
      setMessage("");
      setTarget("all");

      fetchNotices();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create notice");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/admin/notices/${id}`,
        { withCredentials: true }
      );

      alert("Notice deleted successfully");
      fetchNotices();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete notice");
    }
  };

  return (
    <div className="admin-notices">
      <h1>Notice Management</h1>

      <section className="notice-form-section">
        <h2>📢 Create Notice</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Notice Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Write notice message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          >
            <option value="all">Everyone</option>
            <option value="student">Students Only</option>
            <option value="staff">Staff Only</option>
          </select>

          <button type="submit">Publish Notice</button>
        </form>
      </section>

      <section className="notice-list-section">
        <h2>Published Notices</h2>

        <div className="notice-list">
          {notices.length === 0 ? (
            <p>No notices available.</p>
          ) : (
            notices.map((notice) => (
              <div className="notice-card" key={notice._id}>
                <div className="notice-card-content">
                  <h3>{notice.title}</h3>

                  <p>{notice.message}</p>

                  <div className="notice-info">
                    <span>
                      Target:{" "}
                      {notice.target === "all"
                        ? "Everyone"
                        : notice.target === "student"
                        ? "Students"
                        : "Staff"}
                    </span>

                    <span>
                      Posted by: {notice.postedBy?.name || "Admin"}
                    </span>

                    <span>
                      {new Date(notice.postedOn).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <button
                  className="delete-notice-btn"
                  onClick={() => handleDelete(notice._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default AdminNotices;
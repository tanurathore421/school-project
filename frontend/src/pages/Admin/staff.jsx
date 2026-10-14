import React, { useEffect, useState } from "react";
import axios from "axios";
import "./staff.css";
import { useNavigate } from "react-router-dom";

function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchStaff = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/staff",
        {
          withCredentials: true,
        },
      );

      setStaff(response.data.staff);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  if (loading) {
    return <p>Loading staff...</p>;
  }


  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this staff member?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    await axios.delete(
      `http://localhost:3000/api/admin/staff/${id}`,
      {
        withCredentials: true,
      }
    );

    setStaff((currentStaff) =>
      currentStaff.filter((member) => member._id !== id)
    );
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
        "Failed to delete staff"
    );
  }
};

  return (
    <div className="staff-page">
      <div className="staff-header">
        <div>
          <h1>Staff</h1>
          <p>Manage all staff members</p>
        </div>

        <button
          className="add-staff-btn"
          onClick={() => navigate("/admin/staff/add")}
        >
          + Add Staff
        </button>
      </div>

      <div className="staff-table-container">
        <table className="staff-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {staff.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-staff">
                  No staff found
                </td>
              </tr>
            ) : (
              staff.map((member) => (
                <tr key={member._id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.phone || "-"}</td>
                  <td>{member.role}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(`/admin/staff/edit/${member._id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(member._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Staff;

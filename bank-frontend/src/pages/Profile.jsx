import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function Profile() {
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Sinchana K S",
    email: "sinchanaks005@gmail.com",
    role: "System Administrator",
    department: "Bank Management System",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    toast.success("Profile Updated Successfully!");
    setEditing(false);
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container-fluid p-4 bg-light min-vh-100">
        <div
          className="card shadow-lg border-0 rounded-4 p-5 mx-auto"
          style={{ maxWidth: "650px" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/dashboard")}
            >
              ← Back
            </button>

            <h3 className="mb-0 text-primary">
              My Profile
            </h3>
          </div>

          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              width="120"
              className="rounded-circle mb-3"
            />

            <h2>{profile.name}</h2>
            <p className="text-muted">{profile.role}</p>
          </div>

          <hr />

          <div className="mb-3">
            <label className="fw-bold">👤 Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={profile.name}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          <div className="mb-3">
            <label className="fw-bold">📧 Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={profile.email}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          <div className="mb-3">
            <label className="fw-bold">👤 Role</label>
            <input
              type="text"
              name="role"
              className="form-control"
              value={profile.role}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          <div className="mb-4">
            <label className="fw-bold">🏦 Department</label>
            <input
              type="text"
              name="department"
              className="form-control"
              value={profile.department}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          {!editing ? (
            <button
              className="btn btn-primary w-100"
              onClick={() => setEditing(true)}
            >
              ✏️ Edit Profile
            </button>
          ) : (
            <>
              <button
                className="btn btn-success w-100 mb-2"
                onClick={saveProfile}
              >
                💾 Save Profile
              </button>

              <button
                className="btn btn-secondary w-100"
                onClick={() => setEditing(false)}
              >
                ❌ Cancel
              </button>
            </>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Profile;
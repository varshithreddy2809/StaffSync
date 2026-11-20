
import { useState } from "react";
import {
  FiUser,
  FiShield,
  FiBriefcase,
  FiMail,
  FiCamera,
  FiEdit2,
  FiSave,
  FiX
} from "react-icons/fi";
import "./Profile.css";

function Profile() {
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [editing, setEditing] = useState(false);
  const [savedName, setSavedName] = useState("Admin");
  const [savedEmail, setSavedEmail] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    setSavedName(name.trim());
    setSavedEmail(email.trim());
    setEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setName(savedName);
    setEmail(savedEmail);
    setEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-heading">
        <h2>My Profile</h2>
        <p>Manage your account information</p>
      </div>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {profileImage ? (
              <img src={profileImage} alt="Admin profile" />
            ) : (
              <FiUser />
            )}
          </div>

          <div className="profile-header-info">
            <h3>{savedName}</h3>
            <p>Administrator</p>
          </div>

          {!editing && (
            <button
              className="edit-profile-btn"
              onClick={() => setEditing(true)}
            >
              <FiEdit2 /> Edit Profile
            </button>
          )}
        </div>

        <div className="profile-divider"></div>

        {editing && (
          <div className="profile-image-upload">
            <label htmlFor="profile-image">
              <FiCamera /> Change Profile Picture
            </label>
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        )}

        <div className="profile-details">
          <div className="profile-detail">
            <FiUser />
            <div>
              <span>Full Name</span>
              {editing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <strong>{savedName}</strong>
              )}
            </div>
          </div>

          <div className="profile-detail">
            <FiShield />
            <div>
              <span>Role</span>
              <strong>Administrator</strong>
            </div>
          </div>

          <div className="profile-detail">
            <FiBriefcase />
            <div>
              <span>Application</span>
              <strong>Employee Service Portal</strong>
            </div>
          </div>

          <div className="profile-detail">
            <FiMail />
            <div>
              <span>Email</span>
              {editing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                />
              ) : (
                <strong>{savedEmail || "Not configured"}</strong>
              )}
            </div>
          </div>
        </div>

        {editing && (
          <div className="profile-actions">
            <button
              className="cancel-profile-btn"
              onClick={handleCancel}
            >
              <FiX /> Cancel
            </button>

            <button
              className="save-profile-btn"
              onClick={handleSave}
            >
              <FiSave /> Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;

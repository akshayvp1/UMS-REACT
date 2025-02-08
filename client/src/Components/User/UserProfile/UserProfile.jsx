import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import axiosInstance from "../../../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUser, setAuthState } from "../../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user); 
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    image: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setEditData({
        name: user?.name || "",
        email: user?.email || "",
        image: user?.image || "", 
      });
    }
  }, [isAuthenticated, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ad-upload");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dedrcfbxf/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Image upload failed");
      }
      const data = await response.json();
      setEditData({ ...editData, image: data.secure_url });
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    }
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.put("/auth/profile", editData);
      if (response.status === 200) {
        const { user } = response.data;
        dispatch(setUser(user));  
        dispatch(setAuthState());
        toast.success("Profile updated successfully");
        setIsEditing(false);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred while updating profile"
      );
    }
  };

  return (
    <div className="profile-container">
      {/* Background Header */}
      <div className="profile-header">
        <label htmlFor="coverPicInput" className="upload-icon">
          <i className="fa fa-camera"></i>
        </label>
        <input
          type="file"
          id="coverPicInput"
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>

      {/* Profile Details */}
      <div className="profile-details">
        <div className="profile-image-container">
          <label htmlFor="profilePicInput">
            {editData.image || user?.image ? (
              <img src={editData.image || user?.image} alt="Profile" className="profile-image" />
            ) : (
              <div className="placeholder-icon">+</div>
            )}
          </label>
          {isEditing && (
            <input
              type="file"
              id="profilePicInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          )}
        </div>
        <div className="profile-info">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleInputChange}
                className="profile-name-input"
                placeholder="Enter your name"
              />
              <p className="profile-email">{editData.email}</p>
            </>
          ) : (
            <>
              <h2 className="profile-name">{editData.name || user?.name || "Your Name"}</h2>
              <p className="profile-email">{editData.email || user?.email || "youremail@example.com"}</p>
            </>
          )}
          <p className="profile-description">
            {isEditing
              ? "Edit your photo and personal details here."
              : "Update your photo and personal details here."}
          </p>
        </div>
        {isEditing ? (
          <button onClick={handleSave} className="save-button">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="edit-button">
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

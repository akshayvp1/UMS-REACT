import React, { useState } from "react";
import adminInstance from '../../../utils/axiosInstance'; 
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });
const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to Cloudinary
    const cloudinaryData = new FormData();
    cloudinaryData.append("file", formData.image);
    cloudinaryData.append("upload_preset", "ad-upload");

    try {
      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dedrcfbxf/image/upload",
        {
          method: "POST",
          body: cloudinaryData,
        }
      );
      const cloudinaryResult = await cloudinaryResponse.json();

      if (cloudinaryResult.secure_url) {
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          image: cloudinaryResult.secure_url,
        };

        
        const response = await adminInstance.post("/admin/add-user", userData);
        
         if(response.data.success){
                   
                    toast.success("Added sucessfully")
                    navigate('/admin-dashbord')
                    }
      } else {
        console.error("Cloudinary image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image or saving user data:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New User</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter a new password"
          />
        </div>

        {/* Image Field */}
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            accept="image/*"
          />
          <div id="imagePreview" className="mt-4">
            {imagePreview && (
              <img
                id="imagePreviewImg"
                src={imagePreview}
                alt="Image Preview"
                className="w-32 h-32 rounded-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;

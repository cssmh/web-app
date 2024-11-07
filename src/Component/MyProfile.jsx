import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import BlogHelmet from "./BlogHelmet";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";

const MyProfile = () => {
  const { user, profileUpdate, loading, logOut } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [image, setImage] = useState(user?.photoURL || "");
  const [newImage, setNewImage] = useState(null);
  const [updating, setUpdating] = useState(false);

  const imgBbApiKey = import.meta.env.VITE_imgBbKey;

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      let imageUrl = image;

      if (newImage) {
        const formData = new FormData();
        formData.append("image", newImage);
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgBbApiKey}`,
          formData
        );
        imageUrl = response.data.data.url;
      }

      await profileUpdate(name, imageUrl);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewImage(file);
      setImage(imageUrl);
    }
  };

  const handleLogout = () => {
    logOut();
    toast.success("Logged out successfully");
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] px-4 py-8">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <BlogHelmet title="My Profile" />
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="relative">
            <img
              src={image}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover shadow-md"
            />
            <label
              htmlFor="imageUpload"
              className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full cursor-pointer border-2 border-gray-300 hover:bg-gray-300 transition"
            >
              <FaRegEdit className="text-gray-700 text-lg" />
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-600">
              {user?.email || "Email not available"}
            </div>
            <div className="text-lg font-semibold text-gray-800">
              {name || "Name not available"}
            </div>
          </div>
        </div>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <button
              type="submit"
              className="w-1/2 bg-red-600 hover:bg-red-700 text-white py-[5px] rounded-lg font-semibold transition duration-300"
            >
              {updating || loading ? (
                <div className="flex justify-center">
                  <TbFidgetSpinner className="animate-spin text-[24px]" />
                </div>
              ) : (
                "Update Profile"
              )}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-[5px] rounded-lg font-semibold transition duration-300"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;

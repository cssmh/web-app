import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import BlogHelmet from "./BlogHelmet";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";

const MyProfile = () => {
  const { user, profileUpdate, loading } = useAuth();
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

  return (
    <div className="my-8 space-y-3 lg:w-1/2 mx-auto px-4">
      <BlogHelmet title="My Profile" />
      <h1 className="text-2xl font-semibold text-center">My Profile</h1>
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <img
            src={image}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <label
            htmlFor="imageUpload"
            className="absolute bottom-0 right-0 bg-redBlog p-2 rounded-full cursor-pointer"
          >
            <FaRegEdit className="text-white" />
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="text-sm font-medium text-gray-700">
          {user?.email || "Not available"}
        </div>
        <form onSubmit={handleProfileUpdate} className="w-full space-y-5">
          <div className="space-y-1 text-sm">
            <label htmlFor="name" className="block dark:text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border"
              style={{ outline: "none" }}
            />
          </div>
          <button
            type="submit"
            className="block w-full p-3 text-center rounded-xl bg-redBlog text-white"
          >
            {updating || loading ? (
              <div className="flex justify-center">
                <TbFidgetSpinner className="animate-spin text-2xl" />
              </div>
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;

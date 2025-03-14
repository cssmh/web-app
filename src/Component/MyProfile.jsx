import { toast } from "react-toastify";
import { useState } from "react";
import BlogHelmet from "./BlogHelmet";
import useAuth from "../hooks/useAuth";
import { PiSpinnerGapLight } from "react-icons/pi";

const MyProfile = () => {
  const { user, profileUpdate, loading, logOut } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [image, setImage] = useState(user?.photoURL || "");
  const [updating, setUpdating] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await profileUpdate(name, image);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    logOut();
    toast.success("Logged out successfully");
  };

  return (
    <div className="flex justify-center items-center md:min-h-[76vh] text-white">
      <div className="w-full max-w-lg border border-gray-600 p-4 md:p-6 rounded-lg shadow-lg">
        <BlogHelmet title={`Profile of ${user?.displayName}`} />
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="relative">
            <img
              src={image}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover shadow-md"
            />
          </div>
        </div>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-400">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-[#27272a] text-gray-400"
              style={{ outline: "none" }}
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="image"
              className="text-sm font-medium text-gray-400"
            >
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-[#27272a] text-gray-400"
              style={{ outline: "none" }}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <button
              type="submit"
              className="w-1/2 bg-[#2f342a] text-white py-[5px] rounded-lg font-semibold transition duration-300"
            >
              {updating || loading ? (
                <div className="flex items-center gap-2 justify-center">
                  <PiSpinnerGapLight className="animate-spin text-2xl" />{" "}
                  <span className="text-base text-gray-300">Updating...</span>
                </div>
              ) : (
                "Update Profile"
              )}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-1/2 bg-gray-700 hover:bg-gray-600 text-gray-300 py-[5px] rounded-lg font-semibold transition duration-300"
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

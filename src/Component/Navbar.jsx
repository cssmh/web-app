import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import { LuNotepadText } from "react-icons/lu";
import { toast } from "sonner";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  console.log(user);

  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "text-white"
      : "hover:border hover:border-blue-500 rounded-lg";
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logOut();
    toast.success("Logged out successfully");
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#111111] text-gray-200 shadow-md md:px-6 border-b border-gray-700">
      <div className="navbar min-h-[59px] py-0 flex justify-between items-center">
        {/* Logo & Title */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-lg md:text-2xl">BlogApp</h1>
          </Link>
          <div className="relative ml-4">
            <input
              className="h-10 pl-10 pr-4  rounded-md bg-[#2e2e30] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500 sm:min-w-[250px] md:min-w-[350px] lg:min-w-[400px]"
              placeholder="Search blog..."
              type="search"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        {/* Right Section: Write & User Menu */}
        <div className="flex items-center gap-4">
          <Link to="/write-blog">
            <button className="flex items-center gap-1 py-1 md:py-2 text-gray-200 rounded-md transition-all duration-200">
              <IoCreateOutline className="text-xl" />
              Write
            </button>
          </Link>
          <Link to="/guide">
            <button className="flex items-center gap-1 py-1 md:py-2 text-gray-200 rounded-md transition-all duration-200">
              <LuNotepadText className="text-xl" />
              Guide
            </button>
          </Link>
          <div>
            {user && (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="text-gray-200 hover:text-blue-400 transition-all"
                >
                  {user ? (
                    <img src={user?.photoURL} alt="user" />
                  ) : (
                    <FaUserCircle className="text-4xl pt-2" />
                  )}
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-4 w-48 bg-[#111111] shadow-lg border border-gray-700 rounded-md text-sm overflow-hidden">
                    <div className="text-white">
                      <h1 className="p-2 font-semibold">
                        Sined in as <br /> {user?.displayName}
                      </h1>
                      <Link
                        to="/my-profile"
                        className={`block px-3 py-2 ${getLinkClasses(
                          "/my-profile"
                        )}`}
                        onClick={toggleUserMenu}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/my-blogs"
                        className={`block px-3 py-2 ${getLinkClasses(
                          "/my-blogs"
                        )}`}
                        onClick={toggleUserMenu}
                      >
                        My Blogs
                      </Link>
                      <Link
                        to="/my-bookmarks"
                        className={`block px-3 py-2 ${getLinkClasses(
                          "/my-bookmarks"
                        )}`}
                        onClick={toggleUserMenu}
                      >
                        My Bookmarks
                      </Link>
                      <button className="px-3 py-2" onClick={handleLogout}>
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

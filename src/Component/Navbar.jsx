import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/blog.png";
import defaultAvatar from "../assets/default.jpg";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const location = useLocation();

  const handleProfileClick = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleLogOut = () => {
    logOut().then().catch();
  };

  const getLinkClasses = (path) => {
    return location.pathname === path ? "text-blue-500" : "hover:text-blue-500";
  };

  return (
    <header className="bg-white transition-all duration-300 shadow-md">
      <div className="border-b border-gray-300">
        <div className="navbar max-w-7xl mx-auto py-0">
          <div className="navbar-start">
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-sm btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <Link
                  to="/"
                  className={`flex items-center p-1 ${getLinkClasses("/")}`}
                >
                  Home
                </Link>
                <Link
                  to="/all-blogs"
                  className={`flex items-center p-1 ${getLinkClasses(
                    "/all-blogs"
                  )}`}
                >
                  All Blogs
                </Link>
                {user?.email && (
                  <>
                    <Link
                      to="/create-blog"
                      className={`flex items-center p-1 ${getLinkClasses(
                        "/create-blog"
                      )}`}
                    >
                      Create Blog
                    </Link>
                    <Link
                      to="/my-blogs"
                      className={`flex items-center p-1 ${getLinkClasses(
                        "/my-blogs"
                      )}`}
                    >
                      My Blogs
                    </Link>
                  </>
                )}
              </ul>
            </div>
            <Link to="/" className="flex items-center">
              <img src={logo} className="w-32" alt="Logo" />
              {/* <span className="font-semibold text-lg">BlogApp</span> */}
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <Link
                to="/"
                className={`flex items-center p-1 ${getLinkClasses("/")}`}
              >
                Home
              </Link>
              <Link
                to="/all-blogs"
                className={`flex items-center p-1 ${getLinkClasses(
                  "/all-blogs"
                )}`}
              >
                All Blogs
              </Link>
              {user?.email && (
                <>
                  <Link
                    to="/create-blog"
                    className={`flex items-center p-1 ${getLinkClasses(
                      "/create-blog"
                    )}`}
                  >
                    Create Blog
                  </Link>
                  <Link
                    to="/my-blogs"
                    className={`flex items-center p-1 ${getLinkClasses(
                      "/my-blogs"
                    )}`}
                  >
                    My Blogs
                  </Link>
                </>
              )}
            </ul>
          </div>
          <div className="navbar-end flex items-center">
            {user?.email && (
              <>
                <p className="hidden md:block text-sm bg-gray-200 px-2 py-1 rounded mr-2">
                  {user?.displayName}
                </p>
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    onClick={handleProfileClick}
                    className="cursor-pointer"
                  >
                    <img
                      src={user?.photoURL || defaultAvatar}
                      className="w-9 rounded-full"
                      alt="avatar"
                    />
                  </label>
                  {showProfileOptions && (
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <p className="pointer-events-none">
                          Hi, {user?.displayName}
                        </p>
                      </li>
                      <li>
                        <Link to="/my-profile">View Profile</Link>
                      </li>
                      <li>
                        <button onClick={handleLogOut} className="text-redBlog">
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            )}
            {!user?.email && (
              <Link to="/login">
                <p className="bg-redBlog text-white rounded-md py-1 px-3">
                  Login
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

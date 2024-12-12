import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/fav.png";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "text-blue-400"
      : "hover:text-blue-400 text-gray-300";
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-gray-900 text-gray-200 shadow-md md:px-12">
      <div className="border-b border-gray-700">
        <div className="navbar min-h-[59px] py-0">
          <div className="navbar-start">
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} className="w-8 md:w-10" alt="Logo" />
              <h1 className="text-lg md:text-2xl">Blogger</h1>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <Link
                to="/"
                className={`flex items-center p-[7px] ${getLinkClasses("/")}`}
              >
                Home
              </Link>
              <Link
                to="/all-blogs"
                className={`flex items-center p-[7px] ${getLinkClasses(
                  "/all-blogs"
                )}`}
              >
                All Blogs
              </Link>
              <Link
                to="/write-blog"
                className={`flex items-center p-[7px] ${getLinkClasses(
                  "/write-blog"
                )}`}
              >
                Write Blog
              </Link>
              <Link
                to="/my-blogs"
                className={`flex items-center p-[7px] ${getLinkClasses(
                  "/my-blogs"
                )}`}
              >
                My Blogs
              </Link>
              {user && (
                <Link
                  to="/my-profile"
                  className={`flex items-center p-[7px] ${getLinkClasses(
                    "/my-profile"
                  )}`}
                >
                  Profile
                </Link>
              )}
            </ul>
          </div>
          <div className="navbar-end">
            <Link to="/write-blog">
              <button className="py-1 md:py-2 border border-gray-500 text-gray-200 hover:bg-gray-700 hover:border-gray-400 px-2 md:px-4 rounded-md transition-all duration-200">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={toggleMenu}
      ></div>

      <div
        className={`lg:hidden fixed top-0 left-0 w-64 h-full bg-gray-900 text-gray-200 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="p-4 space-y-4">
          <Link
            to="/"
            className={`flex items-center p-1 ${getLinkClasses("/")}`}
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/all-blogs"
            className={`flex items-center p-1 ${getLinkClasses("/all-blogs")}`}
            onClick={toggleMenu}
          >
            All Blogs
          </Link>
          <Link
            to="/write-blog"
            className={`flex items-center p-1 ${getLinkClasses("/write-blog")}`}
            onClick={toggleMenu}
          >
            Write a Blog
          </Link>
          <Link
            to="/my-blogs"
            className={`flex items-center p-1 ${getLinkClasses("/my-blogs")}`}
            onClick={toggleMenu}
          >
            My Blogs
          </Link>
          {user && (
            <Link
              to="/my-profile"
              className={`flex items-center p-1 ${getLinkClasses(
                "/my-profile"
              )}`}
              onClick={toggleMenu}
            >
              Profile
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;

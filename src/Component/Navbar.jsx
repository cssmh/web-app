import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const location = useLocation();

  const getLinkClasses = (path) => {
    return location.pathname === path ? "text-blue-500" : "hover:text-blue-500";
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white transition-all duration-300 shadow-sm md:px-12">
      <div className="border-gray-300">
        <div className="navbar min-h-[59px] py-0">
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
                <Link
                  to="/write-blog"
                  className={`flex items-center p-1 ${getLinkClasses(
                    "/write-blog"
                  )}`}
                >
                  Write a Blog
                </Link>
                <Link
                  to="/my-blogs"
                  className={`flex items-center p-1 ${getLinkClasses(
                    "/my-blogs"
                  )}`}
                >
                  My Blogs
                </Link>
              </ul>
            </div>
            <Link to="/" className="flex items-center">
              <img src={logo} className="w-24 md:w-32" alt="Logo" />
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
                Write a Blog
              </Link>
              <Link
                to="/my-blogs"
                className={`flex items-center p-[7px] ${getLinkClasses(
                  "/my-blogs"
                )}`}
              >
                My Blogs
              </Link>
            </ul>
          </div>
          <div className="navbar-end">
            <Link to="/get-started">
              <button className="py-1 md:py-2 border border-gray-400 px-2 md:px-4 rounded-md transition-all duration-200">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

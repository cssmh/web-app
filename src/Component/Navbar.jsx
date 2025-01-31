import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import { LuNotepadText } from "react-icons/lu";
import { toast } from "sonner";
import { navBlog } from "../api/Blog";
import useCate from "../hooks/useCate";

const categories = [
  { display: "Web Development", value: "Web-Dev" },
  { display: "Game Development", value: "Game-Dev" },
  { display: "Machine Learning", value: "Machine-Learning" },
  { display: "Travel", value: "Travel" },
  { display: "Artificial Intelligence", value: "Artificial-Int" },
  { display: "Lifestyle", value: "Lifestyle" },
  { display: "Graphic Design", value: "Graphic-Design" },
  { display: "Animation", value: "Animation" },
  { display: "Food", value: "Food" },
  { display: "Cybersecurity", value: "Cyber-Security" },
  { display: "Data Science", value: "Data-Science" },
];

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { setCategory } = useCate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();

  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "text-white"
      : "hover:border hover:border-blue-500 rounded-lg";
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logOut();
    toast.success("Logged out successfully");
  };

  const handleSearch = async (e) => {
    const search = e.target.value.trim();
    console.log(search);
    setSearchInput(e.target.value);
    if (search === "") {
      setSearchData([]);
      return;
    }
    const res = await navBlog(search);
    setSearchData(res);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#111111] text-gray-200 shadow-md px-4 md:px-6 border-b border-gray-700 py-[2px]">
      <div className="navbar min-h-[59px] py-0 flex justify-between items-center">
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-gray-200 hover:text-blue-400"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>
        {/* Center: Logo & Title (Mobile and Large Devices) */}
        <div className="flex items-center justify-center lg:justify-start">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-lg font-semibold md:text-2xl">BlogApp</h1>
          </Link>
          <div className="hidden lg:block relative ml-4">
            <input
              className="h-10 pl-10 pr-10 rounded-md bg-[#2e2e30] text-gray-200 placeholder-gray-400 focus:outline-none sm:min-w-[250px] md:min-w-[350px] lg:min-w-[400px]"
              placeholder="Search blog..."
              type="text"
              value={searchInput}
              onChange={handleSearch}
              style={{ outline: "none" }}
            />
            <FaSearch className="absolute left-3 top-3 text-white" />
            {searchInput && (
              <FaTimes
                className="absolute right-3 top-3 text-white cursor-pointer"
                onClick={() => setSearchInput("")}
              />
            )}
            {searchInput && (
              <div className="absolute bg-[#1a1a1a] w-full mt-2 rounded-md text-gray-200 shadow-lg max-h-60 overflow-auto">
                {searchData.length > 0 ? (
                  searchData.map((blog) => (
                    <Link
                      key={blog._id}
                      to={`/blog/${blog._id}`}
                      className="block px-4 py-2 hover:bg-[#333333] truncate"
                    >
                      {blog.title}
                    </Link>
                  ))
                ) : (
                  <p className="p-4 text-sm text-gray-400">No blogs found.</p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <Link to="/write-blog">
              <button className="flex items-center gap-1 py-1 md:py-2 text-gray-200 rounded-md transition-all duration-200">
                <IoCreateOutline className="text-xl" />
                Write
              </button>
            </Link>
          ) : (
            <Link to="/write-blog">
              <button className="py-2 text-gray-200 bg-[#2f342a] hover:border-gray-400 px-2 md:px-4 rounded-lg transition-all duration-200">
                Get Started
              </button>
            </Link>
          )}
          <Link to="/guide" className="hidden lg:block">
            <button className="flex items-center gap-1 py-1 md:py-2 text-gray-200 rounded-md transition-all duration-200">
              <LuNotepadText className="text-xl" />
              Guide
            </button>
          </Link>
          {user && (
            <div className="relative pt-2">
              <button
                onClick={toggleUserMenu}
                className="text-gray-200 hover:text-blue-400 transition-all"
              >
                <img
                  src={user?.photoURL}
                  alt="user"
                  className="w-9 h-9 rounded-full"
                />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#111111] shadow-lg border border-gray-700 rounded-md text-sm overflow-hidden">
                  <div className="text-white">
                    <h1 className="p-3 font-semibold">
                      Signed in as <br /> {user?.displayName}
                    </h1>
                    <Link
                      to="/my-profile"
                      className={`block px-3 py-1 ${getLinkClasses(
                        "/my-profile"
                      )}`}
                      onClick={toggleUserMenu}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/my-blogs"
                      className={`block px-3 py-1 ${getLinkClasses(
                        "/my-blogs"
                      )}`}
                      onClick={toggleUserMenu}
                    >
                      My Blogs
                    </Link>
                    <Link
                      to="/my-bookmarks"
                      className={`block px-3 py-1 ${getLinkClasses(
                        "/my-bookmarks"
                      )}`}
                      onClick={toggleUserMenu}
                    >
                      My Bookmarks
                    </Link>
                    <button
                      className="w-full pb-2 text-left px-3 py-1 hover:bg-gray-700"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMobileMenu}
          ></div>
        )}
        <div
          className={`lg:hidden fixed top-0 left-0 w-72 h-full bg-[#111111] text-gray-200 z-50 transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            <Link
              to="/guide"
              className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md"
              onClick={toggleMobileMenu}
            >
              <LuNotepadText className="text-xl" />
              Guide
            </Link>
            {/* Search Box */}
            <div className="relative mt-4">
              <input
                className="w-full h-10 pl-10 pr-4 rounded-md bg-[#2e2e30] text-gray-200 placeholder-gray-400 focus:outline-none"
                placeholder="Search blog..."
                type="text"
                value={searchInput}
                onChange={handleSearch}
                style={{ outline: "none" }}
              />
              <FaSearch className="absolute left-3 top-3 text-white" />
              {searchInput && (
                <FaTimes
                  className="absolute right-3 top-3 text-white cursor-pointer"
                  onClick={() => setSearchInput("")}
                />
              )}
              {searchInput && (
                <div className="absolute bg-[#1a1a1a] w-full mt-2 rounded-md text-gray-200 shadow-lg max-h-60 overflow-auto">
                  {searchData.length > 0 ? (
                    searchData.map((blog) => (
                      <Link
                        key={blog._id}
                        to={`/blog/${blog._id}`}
                        className="block px-4 py-2 hover:bg-[#333333] truncate"
                      >
                        {blog.title}
                      </Link>
                    ))
                  ) : (
                    <p className="p-4 text-sm text-gray-400">No blogs found.</p>
                  )}
                </div>
              )}
            </div>
            {/* Blog Categories */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Blog Categories</h2>
              <ul className="space-y-2 overflow-y-auto">
                {categories.map((category, index) => (
                  <li key={index}>
                    <button
                      onClick={() => setCategory(category.value)}
                      className={`w-full text-center text-sm p-2 rounded-md ${
                        category.value === category
                          ? "bg-blue-500 text-white"
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {category.display}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

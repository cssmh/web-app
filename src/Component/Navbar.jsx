import { useState } from "react";
import { FaSearch, FaBars, FaTimes, FaHome } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuNotepadText } from "react-icons/lu";
import useCategory from "../hooks/useCategory";
import { toast } from "react-toastify";
import { navBlog } from "../api/Blog";
import UserMenu from "./UserMenu";

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
  const { loading, user, logOut } = useAuth();
  const { category: cate, setCategory } = useCategory();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();

  const handleCategoryClick = (categoryValue) => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setCategory(categoryValue);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logOut();
    toast.success("Logout successfully");
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
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#111111] text-gray-200 shadow-md px-4 md:px-6 border-b border-gray-700 py-[6px]">
      <div className="flex justify-between items-center h-11 2xl:h-14 max-w-[1200px] 2xl:max-w-[94%] mx-auto">
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
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-2xl 2xl:text-[27px]"
          >
            BlogApp
          </Link>
          <div className="hidden lg:block relative ml-4">
            <input
              className="h-[38px] 2xl:h-11 pl-10 pr-10 rounded-md bg-[#2e2e30] text-gray-200 placeholder-gray-400 focus:outline-none sm:min-w-[250px] md:min-w-[350px] lg:min-w-[400px] 2xl:min-w-[500px]"
              placeholder="Search blog..."
              type="text"
              value={searchInput}
              onChange={handleSearch}
              style={{ outline: "none" }}
            />
            <FaSearch className="absolute left-3 top-3 2xl:top-[14px] text-white" />
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
                      key={blog?._id}
                      onClick={() => setSearchInput("")}
                      to={`/blog/${blog?.title
                        .toLowerCase()
                        .replaceAll(/\s+/g, "_")}/${blog?._id}`}
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
        {loading ? (
          "Loading..."
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/write-blog">
              <button
                className={`${
                  !user &&
                  "py-2 text-gray-200 bg-[#2f342a] hover:border-gray-400 px-2 md:px-4 rounded-lg transition-all duration-200"
                } flex 2xl:text-lg items-center gap-1 text-gray-200 rounded-md transition-all duration-200`}
              >
                <IoCreateOutline className="text-xl" />
                {user ? "Write" : "Get Started"}
              </button>
            </Link>
            <Link to="/guide" className="hidden lg:block">
              <button className="flex items-center gap-1 2xl:text-lg text-gray-200 rounded-md transition-all duration-200">
                <LuNotepadText className="text-xl" />
                Guide
              </button>
            </Link>
            {user && <UserMenu user={user} handleLogout={handleLogout} />}
          </div>
        )}
        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMobileMenu}
          ></div>
        )}
        <div
          className={`lg:hidden fixed top-0 left-0 w-64 h-full bg-[#111111] text-gray-200 z-50 transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            <div className="flex items-center gap-1">
              <Link
                to="/guide"
                className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md"
                onClick={toggleMobileMenu}
              >
                <LuNotepadText className="text-xl" />
                Guide
              </Link>
              <Link
                to="/"
                className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md"
                onClick={toggleMobileMenu}
              >
                <FaHome className="text-xl" />
                Home
              </Link>
            </div>
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
                        key={blog?._id}
                        to={`/blog/${blog?.title
                          .toLowerCase()
                          .replaceAll(/\s+/g, "_")}/${blog?._id}`}
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
                      onClick={() => handleCategoryClick(category.value)}
                      className={`w-full text-left text-sm p-2 rounded-md ${
                        category.value === cate
                          ? "bg-gray-800 text-white"
                          : "text-gray-300 hover:bg-gray-800"
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

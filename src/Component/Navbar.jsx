import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">BlogApp</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600">
            About
          </Link>
          <Link to="/posts" className="text-gray-600 hover:text-blue-600">
            Posts
          </Link>
          <Link to="/login" className="text-gray-600 hover:text-blue-600">
            Login
          </Link>
          <Link to="/register" className="text-gray-600 hover:text-blue-600">
            Register
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <div className="flex flex-col items-center">
            <Link to="/" className="text-gray-600 hover:text-blue-600 py-2">
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-600 py-2"
            >
              About
            </Link>
            <Link
              to="/posts"
              className="text-gray-600 hover:text-blue-600 py-2"
            >
              Posts
            </Link>
            <Link
              to="/login"
              className="text-gray-600 hover:text-blue-600 py-2"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-600 hover:text-blue-600 py-2"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">About Our Blog</h3>
            <p className="text-sm mt-1">
              Sharing insights and stories to inspire and connect.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="h-6 w-6 hover:text-gray-300 transition-colors duration-300" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="h-6 w-6 hover:text-gray-300 transition-colors duration-300" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="h-6 w-6 hover:text-gray-300 transition-colors duration-300" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="h-6 w-6 hover:text-gray-300 transition-colors duration-300" />
            </a>
          </div>
        </div>
        <hr className="my-4 border-gray-400" />
        <div className="text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Blog Application. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { FaBookmark, FaBlog } from "react-icons/fa";

const UserMenu = ({ user, handleLogout }) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="focus:outline-none">
        <img
          src={user?.photoURL}
          alt="user"
          className="w-8 2xl:w-10 h-8 2xl:h-10 rounded-full mt-1 cursor-pointer hover:scale-105 transition-all duration-300"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-[6px] w-56 bg-[#1a1a1a] bg-opacity-80 backdrop-blur-lg border border-gray-700 rounded-lg shadow-lg focus:outline-none overflow-hidden">
          <div className="px-4 py-4 text-white border-b border-gray-700">
            <p className="text-sm">Signed in as</p>
            <p className="text-md font-semibold text-blue-400 truncate">
              {user?.displayName}
            </p>
          </div>
          <div className="py-1 text-sm">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/my-profile"
                  className={`flex items-center gap-3 px-5 py-2 text-gray-300 ${
                    active ? "bg-gray-800 text-white" : ""
                  }`}
                >
                  <FaUserCircle /> My Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/my-blogs"
                  className={`flex items-center gap-3 px-5 py-2 text-gray-300 ${
                    active ? "bg-gray-800 text-white" : ""
                  }`}
                >
                  <FaBlog /> My Blogs
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/my-bookmarks"
                  className={`flex items-center gap-3 px-5 py-2 text-gray-300 ${
                    active ? "bg-gray-800 text-white" : ""
                  }`}
                >
                  <FaBookmark /> My Bookmarks
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="border-t border-gray-700" />
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleLogout}
                className={`flex items-center text-[15px] gap-3 w-full px-5 py-2 text-red-500 ${
                  active ? "bg-red-600 text-white" : ""
                }`}
              >
                <FiLogOut /> Log Out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;

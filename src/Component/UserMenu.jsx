import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

const UserMenu = ({ user, handleLogout, getLinkClasses }) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="text-gray-200 hover:text-blue-400 transition-all">
        <img
          src={user?.photoURL}
          alt="user"
          className="w-8 h-8 rounded-full mt-1"
        />
      </Menu.Button>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-[6px] w-48 bg-[#111111] border border-gray-700 rounded-md shadow-lg focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm font-semibold text-white">
              Signed in as <br /> {user?.displayName}
            </p>
          </div>
          <div className="border-t border-gray-700" />
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/my-profile"
                className={`${
                  active ? "bg-gray-800 text-white" : "text-gray-300"
                } block px-4 py-2 text-sm ${getLinkClasses("/my-profile")}`}
              >
                My Profile
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/my-blogs"
                className={`${
                  active ? "bg-gray-800 text-white" : "text-gray-300"
                } block px-4 py-2 text-sm ${getLinkClasses("/my-blogs")}`}
              >
                My Blogs
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/my-bookmarks"
                className={`${
                  active ? "bg-gray-800 text-white" : "text-gray-300"
                } block px-4 py-2 text-sm ${getLinkClasses("/my-bookmarks")}`}
              >
                My Bookmarks
              </Link>
            )}
          </Menu.Item>
          <div className="border-t border-gray-700" />
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleLogout}
                className={`${
                  active ? "bg-red-800 text-white" : "text-red-500"
                } w-full text-left px-4 py-2 text-sm`}
              >
                Log Out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;

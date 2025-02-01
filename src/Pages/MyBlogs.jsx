import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { deleteMyBlog, getMyBlogs } from "../api/Blog";
import useAuth from "../hooks/useAuth";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import Moment from "moment";
import BlogCardSkeleton from "./BlogCardSkeleton";
import BlogHelmet from "../Component/BlogHelmet";
import { FaComment } from "react-icons/fa";

const MyBlogs = () => {
  const { user, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myBlogs", user?.email],
    queryFn: async () => {
      return await getMyBlogs(user?.email);
    },
    enabled: !loading && !!user?.email,
  });

  // Handle deletion of a blog
  const handleDelete = async (id) => {
    const res = await deleteMyBlog(id);
    if (res.deletedCount > 0) {
      refetch();
      toast.success("Blog Deleted!");
    }
  };

  // Toggle dropdown menu
  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto mt-2 md:mt-4 mb-10 md:px-4">
      <BlogHelmet title="My Blogs" />
      {data?.length > 0 && (
        <h1 className="text-lg md:text-2xl font-semibold text-center mb-2 md:mb-0">
          My added Blogs
        </h1>
      )}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-2 md:gap-5">
          {[...Array(3)].map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 md:gap-5">
          {data?.map((blog) => (
            <div
              key={blog._id}
              className="rounded-lg shadow-lg flex flex-col bg-[#18181b] p-4"
            >
              {/* Top Section: Writer Image, Name, and Dropdown */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <img
                    src={blog.writerImage}
                    alt={blog.writerName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="ml-2 text-sm font-semibold dark:text-white">
                    {blog.writerName}
                  </span>
                </div>
                <div className="relative">
                  <button
                    className="text-2xl text-white"
                    onClick={() => toggleDropdown(blog._id)}
                  >
                    ...
                  </button>
                  {dropdownOpen === blog._id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <AiFillDelete className="inline-block mr-2" /> Delete
                      </button>
                      <Link
                        to={`/edit-blog/${blog._id}`}
                        className="block w-full text-left px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <AiFillEdit className="inline-block mr-2" /> Edit
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              {/* Blog Title and Description */}
              <div className="flex justify-between">
                <div>
                  <Link to={`/blog/${blog?._id}`}>
                    <h3 className="text-xl font-semibold hover:underline text-white mb-2">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-2 dark:text-gray-300">
                    {blog.content.substring(0, 100)}
                    {blog.content.length > 100 && "..."}
                  </p>
                </div>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-36 h-24 object-cover rounded-lg"
                />
              </div>
              {/* Bottom Section: Posted Date, Image, and Comment Count */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Posted on: {Moment(blog.timestamp).format("DD-MM-YYYY")}
                </span>
                <div className="flex items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <FaComment className="text-sm" />
                    <span className="text-sm">{blog?.comments?.length}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[72vh]">
          <p className="text-lg text-gray-300 mb-2">
            You haven&apos;t posted any blogs yet...
          </p>
          <Link
            to="/write-blog"
            className="text-center text-gray-300 bg-[#2f342a] px-3 py-2 rounded-lg"
          >
            Write now?
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;

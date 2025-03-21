import { useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { deleteMyBlog, getMyBlogs } from "../api/Blog";
import useAuth from "../hooks/useAuth";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
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
    queryFn: () => getMyBlogs(user?.email),
    enabled: !loading && !!user?.email,
  });

  const handleDelete = async (id) => {
    const res = await deleteMyBlog(id);
    if (res.deletedCount > 0) {
      refetch();
      toast.success("Blog Deleted!");
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return (
    <div className="max-w-4xl 2xl:max-w-[76%] mx-auto mt-2 md:mt-4 mb-10 md:px-4">
      <BlogHelmet title="My Added Blogs" />
      {isLoading ? (
        <div className="grid grid-cols-1 gap-2 md:gap-5">
          {[...Array(1)].map((_, index) => (
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
                    className="w-8 2xl:w-10 h-8 2xl:h-10 rounded-full object-cover"
                  />
                  <span className="ml-2 text-sm 2xl:text-base font-semibold dark:text-white">
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
                    <div className="absolute right-0 mt-2 w-40 bg-[#18181b] rounded-lg shadow-lg z-10">
                      <Link
                        to={`/edit-blog/${blog._id}`}
                        className="block w-full text-left hover:bg-green-600 hover:rounded-lg px-4 py-2 text-sm text-white"
                      >
                        <AiFillEdit className="inline-block mr-2" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="block w-full text-left hover:bg-red-600 hover:rounded-lg px-4 py-2 text-sm text-white"
                      >
                        <AiFillDelete className="inline-block mr-2" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <Link
                    to={`/blog/${blog?.title
                      .toLowerCase()
                      .replaceAll(/\s+/g, "_")}/${blog?._id}`}
                  >
                    <h3 className="text-xl font-semibold hover:underline text-white mb-2">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-2 dark:text-gray-300">
                    {blog.content.substring(0, 220)}
                    {blog.content.length > 180 && "..."}
                  </p>
                </div>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-40 h-24 object-cover rounded-md"
                />
              </div>
              {/* Bottom Section: Posted Date, Image, and Comment Count */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Posted on:{" "}
                  {moment(blog?.timestamp).format("DD/MMM/YYYY, h:mm A")}
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

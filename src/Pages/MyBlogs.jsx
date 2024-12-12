import { useState } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { deleteMyBlog, getMyBlogs } from "../Api/Blog";
import useAuth from "../hooks/useAuth";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import Moment from "moment";
import BlogCardSkeleton from "./BlogCardSkeleton";
import BlogHelmet from "../Component/BlogHelmet";

const MyBlogs = () => {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

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
    setIsOpen(false); // Close the modal after deletion
  };

  // Open the delete confirmation modal
  const openModal = (id) => {
    setSelectedBlogId(id);
    setIsOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsOpen(false);
    setSelectedBlogId(null);
  };

  return (
    <div className="max-w-7xl mx-auto 2xl:max-w-[85%] mt-2 md:mt-4 mb-10 md:px-4 ">
      <BlogHelmet title="My Blogs" />
      {data?.length > 0 && (
        <h1 className="text-lg md:text-2xl font-semibold text-center mb-2 md:mb-0">
          My added Blogs
        </h1>
      )}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
          {[...Array(3)].map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 rounded-md md:gap-5">
          {data?.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-lg flex flex-col dark:bg-gray-800 dark:border-gray-600"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full md:h-48 2xl:h-56 object-cover md:rounded-t-lg mb-2 md:mb-3"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold dark:text-white">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-2 dark:text-gray-300">
                  {blog.content.substring(0, 100)}
                  {blog.content.length > 100 && "..."}
                </p>
                <span className="text-sm text-gray-500 mb-2 dark:text-gray-400">
                  Posted on: {Moment(blog.timestamp).format("DD-MM-YYYY")}
                </span>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {blog.category}
                  </span>
                  <Link
                    to={`/blog/${blog._id}`}
                    className="text-red-500 hover:underline dark:text-red-400"
                  >
                    Read More
                  </Link>
                </div>
                {blog.tags && (
                  <div className="mt-2">
                    <span className="text-sm text-gray-400 dark:text-gray-500">
                      Tags:{" "}
                      {blog.tags.split(",").map((tag) => (
                        <span key={tag} className="mr-1">
                          {tag.trim()},
                        </span>
                      ))}
                    </span>
                  </div>
                )}
                <div className="flex justify-end mt-2">
                  <Link
                    to={`/edit-blog/${blog._id}`}
                    className="mr-3 text-blue-500 hover:underline dark:text-blue-400"
                  >
                    <AiFillEdit className="inline-block mr-1" /> Edit
                  </Link>
                  <button
                    onClick={() => openModal(blog._id)}
                    className="text-red-500 hover:underline dark:text-red-400"
                  >
                    <AiFillDelete className="inline-block mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[72vh]">
          <p className="text-lg text-red-600 dark:text-red-400">
            No blogs found.
          </p>
        </div>
      )}

      {/* Beautiful Dark Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md">
          <div className="modal modal-open animate__animated animate__fadeIn">
            <div className="modal-box bg-gray-900 text-white rounded-xl shadow-lg p-6 max-w-md w-full dark:bg-gray-800 dark:border-gray-600">
              <h2 className="text-2xl font-semibold text-center mb-4">
                Are you absolutely sure?
              </h2>
              <p className="text-center text-gray-300 mb-6">
                This action cannot be undone. This will permanently delete the
                blog and its associated data.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={closeModal}
                  className="btn btn-outline w-24 bg-gray-600 text-gray-200 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedBlogId)}
                  className="btn btn-danger w-24 bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;

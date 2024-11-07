import swal from "sweetalert";
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

  const handleDelete = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (willDelete) {
      const res = await deleteMyBlog(id);
      if (res.deletedCount > 0) {
        refetch();
        swal("Blog Deleted!", {
          icon: "success",
          timer: 2000,
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto 2xl:max-w-[92%] mt-2 md:mt-4 mb-10 md:px-4">
      <BlogHelmet title="My Blogs" />
      {data?.length > 0 && (
        <h1 className="text-lg md:text-2xl font-semibold text-center mb-2 md:mb-0">
          My added Blogs
        </h1>
      )}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-5">
          {[...Array(3)].map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-5">
          {data?.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-lg p-2 md:p-4 flex flex-col"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full md:h-48 object-cover md:rounded-t-lg mb-2 md:mb-3"
              />
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-gray-600 mb-2">
                {blog.content.substring(0, 100)}
                {blog.content.length > 100 && "..."}
              </p>
              <span className="text-sm text-gray-500 mb-2">
                Posted on: {Moment(blog.timestamp).format("DD-MM-YYYY")}
              </span>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-sm text-gray-500">{blog.category}</span>
                <Link
                  to={`/blog/${blog._id}`}
                  className="text-red-500 hover:underline"
                >
                  Read More
                </Link>
              </div>
              {blog.tags && (
                <div className="mt-2">
                  <span className="text-sm text-gray-400">
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
                  className="mr-3 text-blue-500 hover:underline"
                >
                  <AiFillEdit className="inline-block mr-1" /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-500 hover:underline"
                >
                  <AiFillDelete className="inline-block mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[72vh]">
          <p className="text-lg text-red-600">No blogs found.</p>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;

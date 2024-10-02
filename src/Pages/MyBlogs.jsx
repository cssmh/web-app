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
        swal(`${name} Deleted!`, {
          icon: "success",
          timer: 2000,
        });
      }
    }
  };

  return (
    <div className="my-4 px-4">
      <BlogHelmet title="My Blogs" />
      <h1 className="text-2xl font-semibold text-center mb-3">
        My added Blogs
      </h1>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-lg p-4 flex flex-col"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-gray-600 mb-2">
                {blog.content.substring(0, 100)}
                {blog.content.length > 100 && "..."}
              </p>
              <span className="text-sm text-gray-500 mb-2">
                {Moment(blog.timestamp).format("DD-MM-YYYY")}
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
        <div className="text-center">
          <p className="text-lg">No blogs found.</p>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;

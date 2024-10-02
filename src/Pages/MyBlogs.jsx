import { useQuery } from "@tanstack/react-query";
import { getMyBlogs } from "../Api/Blog";
import useAuth from "../hooks/useAuth";
import BlogCard from "./BlogCard";

const MyBlogs = () => {
  const { user, loading } = useAuth();
  const { data = [], isLoading } = useQuery({
    queryKey: ["myBlogs", user?.email],
    queryFn: async () => {
      return await getMyBlogs(user?.email);
    },
    enabled: !loading && !!user?.email,
  });

  return (
    <div className="my-4 px-4">
      <h1 className="text-2xl font-semibold text-center mb-3">My added Blogs</h1>
      {isLoading ? (
        <div className="flex justify-center">
          <p className="text-xl">Loading...</p>
        </div>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
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

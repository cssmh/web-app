import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "../Api/Blog";
import BlogCard from "./BlogCard";

const AllBlogs = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      return await getAllBlogs();
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">All Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data?.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;

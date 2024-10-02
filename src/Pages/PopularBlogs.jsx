import { useQuery } from "@tanstack/react-query";
import { getPopularBlogs } from "../Api/Blog";
import BlogCard from "./BlogCard";
import SmallLoader from "../Component/SmallLoader";

const PopularBlogs = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["popularBlogs"],
    queryFn: async () => {
      return await getPopularBlogs();
    },
  });

  if (isLoading) return <SmallLoader size={80} />;

  return (
    <div className="max-w-[1100px] mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-center mb-4">Popular Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default PopularBlogs;

import { useQuery } from "@tanstack/react-query";
import { getPopularBlogs } from "../Api/Blog";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";

const PopularBlogs = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["popularBlogs"],
    queryFn: async () => {
      return await getPopularBlogs();
    },
  });

  return (
    <div className="max-w-[1100px] mx-auto mt-5 md:mt-8">
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-2 md:mb-4">Popular Blogs</h2>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularBlogs;

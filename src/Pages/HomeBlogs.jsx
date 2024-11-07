import { useQuery } from "@tanstack/react-query";
import { homeBlog } from "../Api/Blog";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";

const HomeBlogs = ({ searchTerm }) => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["homeBlogs", searchTerm],
    queryFn: async () => {
      return await homeBlog(searchTerm);
    },
  });

  return (
    <div className="mt-5 md:mt-8">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {[...Array(3)].map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center min-h-[30vh] text-center text-gray-600 py-6">
          <p>
            No blogs found for {searchTerm}. Please try another search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {data?.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeBlogs;

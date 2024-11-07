import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "../Api/Blog";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";
import BlogHelmet from "../Component/BlogHelmet";

const AllBlogs = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      return await getAllBlogs();
    },
  });

  return (
    <div className="max-w-7xl 2xl:max-w-[86%] mx-auto py-3 mb-6">
      <BlogHelmet title="All Blogs" />
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      ) : data?.length === 0 ? (
        <p className="text-center text-xl md:text-2xl font-semibold text-red-600 mt-6">
          No Blogs found!
        </p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
            {data?.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;

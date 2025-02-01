import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { homeBlog } from "../api/Blog";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";

const HomeBlogs = ({ searchTerm }) => {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["homeBlogs", searchTerm, category],
    queryFn: async () => await homeBlog(searchTerm, category),
  });

  return (
    <div className="mt-5 md:mt-6">
      <div className="flex justify-center mx-1 md:mx-0 gap-[6px] md:gap-2 mb-1 md:mb-2 flex-wrap">
        {[
          "All",
          "Tech",
          "Food",
          "Fashion",
          "Travel",
          "Lifestyle",
          "Education",
          "Business",
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat === "All" ? "" : cat)}
            className={`py-1 md:py-2 px-3 md:px-4 rounded-md ${
              category === cat
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-500 hover:text-white transition duration-300`}
          >
            {cat}
          </button>
        ))}
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      ) : isError ? (
        <p className="text-red-600 text-center py-6">
          Oops! Something went wrong. Please try again later.
        </p>
      ) : data.length === 0 ? (
        <p className="text-red-600 text-center py-6">
          No blogs found for {searchTerm} in the {category} category!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeBlogs;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { homeBlog } from "../Api/Blog";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";

const HomeBlogs = ({ searchTerm }) => {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const { data = [], isLoading } = useQuery({
    queryKey: ["homeBlogs", searchTerm, category],
    queryFn: async () => {
      return await homeBlog(searchTerm, category);
    },
  });

  return (
    <div className="mt-5 md:mt-8">
      <div className="flex justify-center mx-1 md:mx-0 gap-[5px] md:gap-4 mb-1 md:mb-5 flex-wrap">
        <button
          onClick={() => handleCategoryChange("")}
          className={`py-2 px-4 rounded-md ${
            category === ""
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-500 hover:text-white transition duration-300`}
        >
          All
        </button>
        <button
          onClick={() => handleCategoryChange("Tech")}
          className={`py-2 px-4 rounded-md ${
            category === "Tech"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-500 hover:text-white transition duration-300`}
        >
          Tech
        </button>
        <button
          onClick={() => handleCategoryChange("Food")}
          className={`py-2 px-4 rounded-md ${
            category === "Food"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-500 hover:text-white transition duration-300`}
        >
          Food
        </button>
        <button
          onClick={() => handleCategoryChange("Travel")}
          className={`py-2 px-4 rounded-md ${
            category === "Travel"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-500 hover:text-white transition duration-300`}
        >
          Travel
        </button>
        <button
          onClick={() => handleCategoryChange("Lifestyle")}
          className={`py-2 px-4 rounded-md ${
            category === "Lifestyle"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-500 hover:text-white transition duration-300`}
        >
          Lifestyle
        </button>
        <button
          onClick={() => handleCategoryChange("Education")}
          className={`py-2 px-4 rounded-md ${
            category === "Education"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-500 hover:text-white transition duration-300`}
        >
          Education
        </button>
        <button
          onClick={() => handleCategoryChange("Business")}
          className={`py-2 px-4 rounded-md ${
            category === "Business"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-500 hover:text-white transition duration-300`}
        >
          Business
        </button>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {[...Array(3)].map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      ) : data.length === 0 ? (
        <p className="text-red-600 text-center py-6">
          No blogs found for {searchTerm} in the {category} category!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {data?.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeBlogs;

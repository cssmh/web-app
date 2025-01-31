import { useState } from "react";
import { RightSidebar } from "./RightSidebar/RightSidebar";
import { LeftSidebar } from "./LeftSidebar/LeftSidebar";
import { homeBlog } from "../api/Blog";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "../Pages/BlogCardSkeleton";

const Home = () => {
  const [sortOption, setSortOption] = useState("latest");
  const [category, setCategory] = useState("");

  const {
    data = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["homeBlogs", category],
    queryFn: async () => await homeBlog("", category),
  });

  // Handle sort option change
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 md:px-4 py-4 lg:py-6">
      {/* Left Sidebar */}
      <aside className="hidden md:block md:col-span-1 lg:col-span-3">
        <LeftSidebar setCategory={setCategory} />
      </aside>

      {/* Main Content */}
      <main className="col-span-1 md:col-span-2 lg:col-span-6 lg:p-4">
        {/* Toggle Buttons */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => handleSortChange("latest")}
            className={`px-4 py-2 text-white rounded-md ${
              sortOption === "latest" ? "bg-[#242427]" : ""
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => handleSortChange("random")}
            className={`px-4 py-2 text-white rounded-md ${
              sortOption === "random" ? "bg-[#242427]" : ""
            }`}
          >
            Random
          </button>
          <button
            onClick={() => {
              setCategory("");
              setSortOption("all");
            }}
            className={`px-4 py-2 text-white rounded-md ${
              sortOption === "all" ? "bg-[#242427]" : ""
            }`}
          >
            All
          </button>
        </div>
        {/* Blog Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4">
            {[...Array(3)].map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </div>
        ) : isError ? (
          <p className="text-red-600 text-center py-6">
            Oops! Something went wrong. Please try again later.
          </p>
        ) : data.length === 0 ? (
          <p className="text-white text-center py-6">No blogs found!</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {data?.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </main>
      {/* Right Sidebar */}
      <aside className="col-span-1 lg:col-span-3 lg:p-4">
        <RightSidebar />
      </aside>
    </div>
  );
};

export default Home;

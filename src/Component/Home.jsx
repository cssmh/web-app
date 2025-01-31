import { useState } from "react";
import { RightSidebar } from "./RightSidebar/RightSidebar";
import { LeftSidebar } from "./LeftSidebar/LeftSidebar";
import { homeBlog } from "../api/Blog";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "./BlogCard";

const Home = () => {
  const [sortOption, setSortOption] = useState("latest");
  const [category, setCategory] = useState("");

  const { data = [], isLoading } = useQuery({
    queryKey: ["homeBlogs", category],
    queryFn: async () => await homeBlog("", category),
  });
  console.log(data);
  // Handle sort option change
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 md:px-4 py-4 lg:py-6">
      {/* Left Sidebar */}
      <aside className="hidden md:block md:col-span-1 lg:col-span-3">
        <LeftSidebar category={category} setCategory={setCategory} />
      </aside>

      {/* Main Content */}
      <main className="col-span-1 md:col-span-2 lg:col-span-6 lg:p-4">
        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => handleSortChange("latest")}
            className={`px-4 py-2 rounded-md ${
              sortOption === "latest"
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Latest
          </button>
          <button
            onClick={() => handleSortChange("random")}
            className={`px-4 py-2 rounded-md ${
              sortOption === "random"
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Random
          </button>
          <button
            onClick={() => handleSortChange("all")}
            className={`px-4 py-2 rounded-md ${
              sortOption === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            All
          </button>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 gap-4">
          {data?.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="col-span-1 lg:col-span-3 lg:p-4">
        <RightSidebar />
      </aside>
    </div>
  );
};

export default Home;

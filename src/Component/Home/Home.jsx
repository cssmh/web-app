import { useState } from "react";
import { RightSidebar } from "./RightSidebar/RightSidebar";
import { LeftSidebar } from "./LeftSidebar/LeftSidebar";
import { homeBlog } from "../../api/Blog";
import { useQuery } from "@tanstack/react-query";
import useCategory from "../../hooks/useCategory";
import BlogCard from "../../Pages/BlogCard";
import BlogCardSkeleton from "../../Pages/BlogCardSkeleton";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [sortOption, setSortOption] = useState("latest");
  const { category, setCategory } = useCategory();

  const {
    data = [],
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["homeBlogs", category, sortOption],
    queryFn: () => homeBlog(category, sortOption),
  });

  // Handle sort option change
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="container 2xl:max-w-[1370px] mx-auto">
      <Helmet>
        <title>BlogApp | Home </title>
      </Helmet>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-4 lg:py-6">
        <aside className="hidden lg:block lg:col-span-3">
          <LeftSidebar category={category} setCategory={setCategory} />
        </aside>
        <main className="col-span-1 lg:col-span-6 lg:px-2">
          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={() => handleSortChange("latest")}
              className={`px-4 py-2 2xl:text-lg text-white rounded-md ${
                sortOption === "latest" ? "bg-[#242427]" : ""
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => handleSortChange("random")}
              className={`px-4 py-2 2xl:text-lg text-white rounded-md ${
                sortOption === "random" ? "bg-[#242427]" : ""
              }`}
            >
              Random
            </button>
            <button
              onClick={() => setSortOption("Popular")}
              className={`px-4 py-2 2xl:text-lg text-white rounded-md ${
                sortOption === "Popular" ? "bg-[#242427]" : ""
              }`}
            >
              Popular
            </button>
          </div>
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
            <div className="grid grid-cols-1 gap-4 mx-3 lg:mx-0">
              {data?.map((blog) => (
                <BlogCard key={blog._id} blog={blog} refetch={refetch} />
              ))}
            </div>
          )}
        </main>
        <aside className="col-span-1 lg:col-span-3">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
};

export default Home;

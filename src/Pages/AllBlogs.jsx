import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "../Api/Blog";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";
import BlogHelmet from "../Component/BlogHelmet";

const AllBlogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const {
    data = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allBlogs", page, limit, searchTerm],
    queryFn: async () => {
      return await getAllBlogs(page, limit, searchTerm);
    },
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < data?.totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="max-w-7xl 2xl:max-w-[86%] mx-auto py-3">
      <BlogHelmet title="Blogs" />
      <div className="text-center my-2">
        <input
          id="search"
          type="text"
          onChange={handleSearch}
          placeholder="Search for Blogs name and category"
          className="input h-[44px] input-bordered rounded-3xl min-w-[75%] md:min-w-[330px] border-red-500"
          style={{ outline: "none" }}
        />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      ) : isError ? (
        <p className="text-center text-xl md:text-2xl font-semibold text-red-600 mt-6">
          Error fetching blogs. Please try again later.
        </p>
      ) : data?.result?.length === 0 ? (
        <p className="text-center text-xl md:text-2xl font-semibold text-red-600 mt-6">
          No Blogs found!
        </p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
            {data?.result?.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
          {data?.result?.length > 0 && (
            <div className="flex flex-col items-center mb-4 mt-8">
              <div className="flex justify-between items-center w-full md:w-auto mb-4">
                <button
                  onClick={handlePrevious}
                  disabled={page === 1}
                  className={`btn border-emerald-400 bg-yellow-50 hover:bg-emerald-400 hover:text-white text-emerald-400 hover:border-emerald-400 disabled:opacity-50 rounded-full px-4 py-2 transition duration-200`}
                >
                  Prev
                </button>
                <span className="text-lg font-semibold text-gray-700 mx-2">
                  Page {page} of {data?.totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={page === data?.totalPages}
                  className={`btn border-emerald-400 bg-yellow-50 hover:bg-emerald-400 hover:text-white text-emerald-400 hover:border-emerald-400 disabled:opacity-50 rounded-full px-4 py-2 transition duration-200`}
                >
                  Next
                </button>
              </div>
              <div className="flex flex-wrap justify-center mt-2">
                {Array.from({ length: data?.totalPages || 1 }, (_, idx) => (
                  <button
                    key={idx + 1}
                    onClick={() => setPage(idx + 1)}
                    className={`btn border-emerald-400 ${
                      page === idx + 1
                        ? "bg-emerald-400 text-white"
                        : "bg-yellow-50 text-emerald-400 hover:bg-emerald-400 hover:text-white"
                    } rounded-full px-6 py-1 mx-[2px] transition duration-200`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              <div className="mt-4 text-center">
                <select
                  onChange={(e) => {
                    setLimit(parseInt(e.target.value, 10));
                    setPage(1);
                  }}
                  value={limit}
                  className="input input-bordered border-emerald-400 text-emerald-500 outline-none rounded-xl px-4 py-[2px]"
                  style={{ outline: "none" }}
                >
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="9">9</option>
                  <option value="12">12</option>
                </select>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;

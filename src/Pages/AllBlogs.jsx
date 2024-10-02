import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "../Api/Blog";
import BlogCard from "./BlogCard";

const AllBlogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const { data = {} } = useQuery({
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
    <div className="max-w-7xl mx-auto py-3">
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
      {data?.result?.length === 0 ? (
        <p className="text-center text-xl md:text-2xl font-semibold text-red-600 mt-6">
          No Blogs found!
        </p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.result?.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
          {data?.result?.length > 0 && (
            <div className="flex flex-col items-center mb-4 mt-8">
              <div className="flex flex-col md:flex-row items-center">
                <button
                  onClick={handlePrevious}
                  disabled={page === 1}
                  className="btn border-emerald-400 bg-yellow-50 hover:bg-emerald-400 hover:text-white text-emerald-400 hover:border-emerald-400 disabled:opacity-50 mb-2 md:mb-0"
                >
                  Previous
                </button>
                <div className="flex flex-wrap m-0 justify-center md:justify-start mx-[6px]">
                  {Array.from({ length: data?.totalPages || 1 }, (_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => setPage(idx + 1)}
                      className={`btn border-emerald-400 ${
                        page === idx + 1
                          ? "bg-emerald-400 text-white"
                          : "bg-yellow-50 text-emerald-400 hover:bg-emerald-400 hover:text-white"
                      } rounded-none mb-2 md:mb-0 mx-[2px]`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  disabled={page === data?.totalPages}
                  className="btn border-emerald-400 bg-yellow-50 hover:bg-emerald-400 hover:text-white text-emerald-400 hover:border-emerald-400 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="mt-2 text-center md:text-left">
                <select
                  onChange={(e) => {
                    setLimit(parseInt(e.target.value, 10));
                    setPage(1); // Reset to the first page on limit change
                  }}
                  value={limit}
                  className="input input-bordered border-emerald-400 text-emerald-500 outline-none"
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

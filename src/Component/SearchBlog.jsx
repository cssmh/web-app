import { useState } from "react";

const SearchBlog = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="container mx-auto px-4 py-10 md:py-20">
      <div className="text-center mb-6">
        <h1 className="text-xl md:text-4xl font-semibold text-white">
          Search Blogs
        </h1>
        <p className="text-sm md:text-base text-gray-400 mt-2">
          Find the latest and most interesting blogs. Enter a keyword to get
          started!
        </p>
      </div>
      <div className="flex justify-center mt-6">
        <div className="w-full max-w-md">
          <div className="flex items-center border-b-2 border-gray-500">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search blogs..."
              className="w-full py-2 px-4 rounded-l-md text-gray-900 dark:text-white bg-gray-700 dark:bg-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-600 transition duration-300"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBlog;

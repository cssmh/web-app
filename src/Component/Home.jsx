import { useState } from "react";
import { RightSidebar } from "./RightSidebar/RightSidebar";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState("latest"); // "latest", "random", "all"

  // Dummy categories for the left sidebar
  const categories = [
    "Web Development",
    "Mobile Development",
    "AI & ML",
    "Data Science",
    "DevOps",
    "UI/UX Design",
    "Blockchain",
  ];

  // Dummy blogs data
  const blogs = [
    {
      id: 1,
      title: "Introduction to React",
      category: "Web Development",
      description:
        "Learn the basics of React and how to build modern web applications.",
    },
    {
      id: 2,
      title: "Getting Started with Flutter",
      category: "Mobile Development",
      description:
        "A beginner's guide to building cross-platform mobile apps with Flutter.",
    },
    {
      id: 3,
      title: "Understanding Machine Learning",
      category: "AI & ML",
      description: "An overview of machine learning concepts and algorithms.",
    },
  ];

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Handle sort option change
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 md:px-4 py-4 lg:py-6">
      {/* Left Sidebar */}
      <aside className="hidden md:block md:col-span-1 lg:col-span-3 lg:p-4">
        <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">
            Categories
          </h2>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li key={index}>
                <button
                  onClick={() => handleCategorySelect(category)}
                  className={`w-full text-left p-2 rounded-md ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
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
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-[#1e1e1e] p-4 rounded-lg shadow-md text-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-400">{blog.description}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                {blog.category}
              </span>
            </div>
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

import { useState } from "react";

export const LeftSidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const categories = [
    "Web Development",
    "Game Development",
    "Machine Learning",
    "Travel",
    "Artificial Intelligence",
    "Lifestyle",
    "Graphic Design",
    "Animation",
    "Food",
    "Cybersecurity",
    "Data Science",
  ];

  return (
    <div className="sticky">
      <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">Categories</h2>
        <ul className="space-y-2 leftsidebar-scrollbar">
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
    </div>
  );
};

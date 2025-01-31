export const LeftSidebar = ({ category, setCategory }) => {
  const handleCategorySelect = (category) => {
    setCategory(category);
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
    <div className="sticky top-0 h-screen overflow-y-auto">
      <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center text-gray-200">Blog Categories</h2>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <button
                onClick={() => handleCategorySelect(category)}
                className="w-full text-center text-sm p-2 rounded-md text-white"
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

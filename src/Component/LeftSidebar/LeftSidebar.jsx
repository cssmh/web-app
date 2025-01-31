import "./LeftSidebar.css";
export const LeftSidebar = ({ setCategory }) => {
  const handleCategorySelect = (categoryValue) => {
    setCategory(categoryValue);
  };

  const categories = [
    { display: "Web Development", value: "Web-Dev" },
    { display: "Game Development", value: "Game-Dev" },
    { display: "Machine Learning", value: "Machine-Learning" },
    { display: "Travel", value: "Travel" },
    { display: "Artificial Intelligence", value: "Artificial-Int" },
    { display: "Lifestyle", value: "Lifestyle" },
    { display: "Graphic Design", value: "Graphic-Design" },
    { display: "Animation", value: "Animation" },
    { display: "Food", value: "Food" },
    { display: "Cybersecurity", value: "Cyber-Security" },
    { display: "Data Science", value: "Data-Science" },
  ];

  return (
    <div className="sticky top-16 h-screen overflow-y-auto leftsidebar-scrollbar pb-8">
      <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center text-gray-200">
          Blog Categories
        </h2>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <button
                onClick={() => handleCategorySelect(category.value)}
                className={`w-full text-center text-sm p-2 rounded-md ${
                  category.value === category
                    ? "bg-blue-500 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category.display}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

import "./LeftSidebar.css";
export const LeftSidebar = ({ category:cate, setCategory }) => {
  const handleCategorySelect = (categoryValue) => {
    setCategory(categoryValue);
  };

  const categories = [
    { display: "All Categories", value: "" },
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
    <div className="sticky top-16 h-screen overflow-y-auto leftsidebar-scrollbar pb-16">
      <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-md">
        <h2 className="text-lg 2xl:text-xl font-semibold mb-4 text-center text-gray-200">
          Blog Categories
        </h2>
        <ul className="space-y-1 2xl:space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <button
                onClick={() => handleCategorySelect(category.value)}
                className={`w-full text-center text-sm 2xl:text-base p-2 rounded-md ${
                  category.value === cate
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800"
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

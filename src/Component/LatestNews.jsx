const LatestNews = () => {
  const news = {
    title: "iPhone 16: The Future is Here",
    image:
      "https://ares.shiftdelete.net/2024/09/iPhone-16-Pro-direnc-testinde-akillarda-soru-isareti-birakti.jpeg",
    features: [
      "Advanced A17 chip for lightning-fast performance",
      "Incredible camera system with new low-light capabilities",
      "Dynamic Island display for an immersive experience",
      "Improved battery life with new energy-efficient technology",
    ],
    date: "October 2, 2024",
  };

  return (
    <div className="my-6 md:my-12 p-6 bg-white rounded-lg shadow-md transition-all duration-300">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center md:text-left text-gray-800">
        Latest News
      </h2>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        {/* Image Section */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-auto object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content Section */}
        <div className="md:ml-8 flex flex-col justify-between text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
            {news.title}
          </h3>
          <span className="text-sm text-gray-500 mb-4">{news.date}</span>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            {news.features.map((feature, index) => (
              <li key={index} className="text-sm md:text-base">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;

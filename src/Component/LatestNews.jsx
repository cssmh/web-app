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
    <div className="max-w-6xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">Latest News</h2>
      <div className="flex flex-col md:flex-row">
        <img
          src={news.image}
          alt={news.title}
          className="w-full md:w-1/2 h-[300px] object-cover rounded-lg mb-4 md:mb-0"
        />
        <div className="md:ml-4 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold">{news.title}</h3>
            <span className="text-sm text-gray-500 mb-2">{news.date}</span>
          </div>
          <ul className="list-disc pl-5 text-gray-700">
            {news.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;

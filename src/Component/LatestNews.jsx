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
    <div className="my-3 md:my-10 md:p-6 bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-xl md:text-3xl font-semibold mb-4 mx-2 md:mx-0">Latest News</h2>
      <div className="flex flex-col md:flex-row">
        <img
          src={news.image}
          alt={news.title}
          className="w-full md:w-1/2 md:h-[300px] object-cover md:rounded-lg mb-4 md:mb-0"
        />
        <div
          className="md:ml-4 flex flex-col justify-between p-3 md:p-1"
        >
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">{news.title}</h3>
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

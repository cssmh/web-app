import axios from "axios";
import { useEffect, useState } from "react";
import "./clock.css";
import "react-clock/dist/Clock.css";
import { Link } from "react-router-dom";
import Clock from "react-clock";

export const RightSidebar = () => {
  const [clockValue, setClockValue] = useState(new Date());
  const [news, setNews] = useState([]);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setClockValue(new Date()), 1000);

    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://dev.to/api/articles?per_page=6"
        );
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching Dev.to news:", error);
      }
    };

    const fetchQuote = () => {
      const facts = [
        "The first computer virus was called 'Creeper' and was created in 1971.",
        "Python is named after Monty Python, not the snake.",
        "The first 1GB hard drive was introduced in 1980 and weighed over 500 pounds.",
        "The world's first website is still online at info.cern.ch.",
        "There are over 700 programming languages in existence today.",
      ];
      setQuote(facts[Math.floor(Math.random() * facts.length)]);
    };

    fetchNews();
    fetchQuote();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    // #18181b
    <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg mx-2 md:mx-0">
      <h2 className="text-xl font-bold text-center text-gray-200 mb-6">
        Activity Bar
      </h2>
      <div className="flex justify-center mb-6">
        <div className="relative">
          <Clock
            renderMinuteMarks={false}
            className="custom-clock"
            secondHandOppositeLength={15}
            secondHandWidth={1}
            minuteHandWidth={2}
            hourHandWidth={4}
            value={clockValue}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-[#A3BE8C] rounded-full border-2 border-[#333]"></div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 my-6"></div>
      <div className="mb-6">
        <h3 className="font-bold text-lg text-gray-200 mb-4">Trending News</h3>
        <ul className="space-y-2 2xl:space-y-3">
          {news.map((article, index) => (
            <li key={index}>
              <Link
                to={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-700 my-5"></div>
      <div className="text-center">
        <h3 className="font-bold text-lg text-gray-200 mb-2">
          Tech Fact of the Day
        </h3>
        <p className="text-gray-400 italic">&quot;{quote}&quot;</p>
      </div>
    </div>
  );
};

import axios from "axios";
import { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import "./clock.css";
import { Link } from "react-router-dom";

export const RightSidebar = () => {
  const [clockValue, setClockValue] = useState(new Date());
  const [news, setNews] = useState([]);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Clock update every second
    const interval = setInterval(() => setClockValue(new Date()), 1000);

    // Fetch Dev News from Dev.to
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://dev.to/api/articles?per_page=5"
        );
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching Dev.to news:", error);
      }
    };

    const fetchQuote = () => {
      const quotes = [
        "Talk is cheap. Show me the code. - Linus Torvalds",
        "Programs must be written for people to read, and only incidentally for machines to execute. - Harold Abelson",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
        "First, solve the problem. Then, write the code. - John Johnson",
        "In order to be irreplaceable, one must always be different. - Coco Chanel",
      ];
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    };

    fetchNews();
    fetchQuote();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    // #18181b
    <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg">
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
        <h3 className="font-bold text-lg text-gray-200 mb-4">Dev News</h3>
        <ul className="space-y-3">
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
      <div className="border-t border-gray-700 my-6"></div>
      <div className="text-center">
        <h3 className="font-bold text-lg text-gray-200 mb-2">
          Quote of the Day
        </h3>
        <p className="text-gray-400 italic">&quot;{quote}&quot;</p>
      </div>
    </div>
  );
};

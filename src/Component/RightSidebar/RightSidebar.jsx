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

    // Fetch Random Quote
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
    <div>
      <h2 className="text-xl font-bold text-center mx-auto">Activity bar</h2>
      <div className="flex flex-col items-center gap-4 mx-auto">
        {/* Clock */}
        <Clock
          renderMinuteMarks={false}
          className="custom-clock"
          secondHandOppositeLength={15}
          secondHandWidth={1}
          minuteHandWidth={2}
          hourHandWidth={4}
          value={clockValue}
        />

        {/* devider */}

        {/* Dev News Ticker */}
        <div className="news-ticker">
          <h3 className="font-bold text-center mb-2">Dev News</h3>
          <ul className="list-none">
            {news.map((article, index) => (
              <li key={index} className="my-1">
                <Link
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline "
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* devider */}
        {/* Random Developer Quote/Tip */}
        <div className="random-quote text-center mt-4">
          <h3 className="font-bold">Quote of the Day</h3>
          <p className="italic">&quot;{quote}&quot;</p>
        </div>
      </div>
    </div>
  );
};

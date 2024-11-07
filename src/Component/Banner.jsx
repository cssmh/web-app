import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Banner = () => {
  const { user } = useAuth();
  return (
    <div className="relative bg-cover bg-center h-72 md:h-[80vh]">
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white px-6 space-y-1 md:space-y-4">
          <h1 className="text-lg md:text-4xl font-bold">
            Empower Your Voice with Our Blog Platform
          </h1>
          <p className="text-sm md:text-lg">
            Share your stories, engage with the community, and inspire others.
          </p>
          <Link
            to={user ? "/write-blog" : "/login"}
            className="inline-block px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;

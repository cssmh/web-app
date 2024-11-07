import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import BlogHelmet from "./BlogHelmet";

const Error = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
      <BlogHelmet title="Error" />
      <div className="container flex flex-col items-center justify-center px-6 text-center md:px-12">
        <div className="mb-8">
          <h1 className="text-9xl md:text-10xl font-extrabold text-white drop-shadow-lg">
            404
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-white mt-4">
            Oops! Page Not Found
          </p>
          <p className="text-white opacity-80 mt-2 max-w-md">
            It seems like the page you are looking for doesn&apos;t exist. You
            may have mistyped the URL or the page might have been moved.
          </p>
        </div>

        <div className="mt-6">
          <Link
            to="/"
            className="flex items-center justify-center px-8 py-4 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 transform"
          >
            <AiOutlineHome className="mr-2" size={22} />
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error;

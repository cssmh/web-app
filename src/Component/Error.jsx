import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import BlogHelmet from "./BlogHelmet";

const Error = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <BlogHelmet title="Error" />
      <div className="container flex flex-col items-center justify-center px-6 text-center md:px-12">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-extrabold text-red-500">
            404
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-gray-800 mt-4">
            Oops! Page Not Found
          </p>
          <p className="text-gray-600 mt-2 max-w-md">
            It seems like the page you are looking for doesn&apos;t exist. You
            may have mistyped the URL or the page might have been moved.
          </p>
        </div>

        <div className="mt-6">
          <Link
            to="/"
            className="flex items-center justify-center px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            <AiOutlineHome className="mr-2" size={20} />
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error;

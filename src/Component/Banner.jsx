import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[80vh]"
      style={{
        backgroundImage: `url('https://awcdn1.ahmad.works/writing/wp-content/uploads/2015/05/yellow-and-gray-industrial-office-PFDQ5CR-1.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white px-6 space-y-4">
          <h1 className="text-4xl font-bold">
            Empower Your Voice with Our Blog Platform
          </h1>
          <p className="text-lg">
            Share your stories, engage with the community, and inspire others.
          </p>
          <Link
            to="/register"
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

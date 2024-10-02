import { Link } from 'react-router-dom';

const Banner = () => {
    return (
      <div
        className="relative bg-cover bg-center h-[80vh]"
        style={{ backgroundImage: `url('https://source.unsplash.com/random')` }}
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
import { Link } from "react-router-dom";

const StartBlogging = () => {
  return (
    <div className="mt-5 py-7 md:py-16 px-4 md:px-0">
      <div className="text-center text-white">
        <h2 className="text-xl md:text-3xl font-bold mb-4">
          Ready to Start Blogging?
        </h2>
        <p className="text-sm md:text-lg mb-6">
          Join thousands of bloggers in sharing their unique voices with the
          world.
        </p>
        <Link
          to="/register"
          className="px-4 md:px-6 py-2 md:py-3 bg-white text-red-500 rounded-full hover:bg-red-600 hover:text-white transition duration-300"
        >
          Sign Up Today
        </Link>
      </div>
    </div>
  );
};

export default StartBlogging;

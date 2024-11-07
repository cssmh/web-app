import { Link } from "react-router-dom";

const StartBlogging = () => {
  return (
    <div className="bg-red-500 mt-5 py-16">
      <div className="text-center text-white">
        <h2 className="text-xl md:text-3xl font-bold mb-4">Ready to Start Blogging?</h2>
        <p className="text-sm md:text-lg mb-6">
          Join thousands of bloggers in sharing their unique voices with the
          world.
        </p>
        <Link
          to="/register"
          className="px-4 md:px-6 py-2 md:py-3 bg-white text-red-500 rounded-full hover:bg-gray-200"
        >
          Sign Up Today
        </Link>
      </div>
    </div>
  );
};

export default StartBlogging;

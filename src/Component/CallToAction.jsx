import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="bg-red-500 mt-5 py-16">
      <div className="max-w-6xl mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Blogging?</h2>
        <p className="text-lg mb-6">
          Join thousands of bloggers in sharing their unique voices with the
          world.
        </p>
        <Link
          to="/register"
          className="px-6 py-3 bg-white text-red-500 rounded-full hover:bg-gray-200"
        >
          Sign Up Today
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;

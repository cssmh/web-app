import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-semibold text-redBlog mb-6 text-center">
          About Us
        </h1>
        <p className="text-lg text-gray-800 mb-6">
          Welcome to our blog! Our mission is to provide valuable insights and
          information on various topics, including technology, lifestyle,
          health, and more. We aim to create a community where readers can find
          inspiration, share knowledge, and connect with like-minded
          individuals.
        </p>
        <p className="text-lg text-gray-800 mb-6">
          Our team consists of passionate writers and experts who are dedicated
          to delivering high-quality content. We believe in the power of words
          to make a difference, and we are committed to sharing our knowledge
          and experiences with you.
        </p>
        <h2 className="text-2xl font-bold text-redBlog mb-4">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Example team member card */}
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">John Doe</h3>
            <p className="text-gray-600">Lead Writer & Editor</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">Jane Smith</h3>
            <p className="text-gray-600">Content Strategist</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">
              Alice Johnson
            </h3>
            <p className="text-gray-600">Community Manager</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-800 mb-4">
            Thank you for visiting our blog! We hope you find our content
            helpful and inspiring. Don’t hesitate to reach out if you have any
            questions or feedback.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 font-semibold text-white bg-redBlog rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            Explore Our Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;

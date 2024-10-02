const Features = () => {
  return (
    <div className="max-w-6xl mx-auto my-16 p-8">
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg">
          <div className="p-4 bg-red-500 text-white rounded-full mb-4">
            <i className="text-3xl fas fa-pencil-alt"></i>
          </div>
          <h3 className="text-xl font-semibold mb-2">Write Effortlessly</h3>
          <p className="text-gray-600">
            Our intuitive editor makes writing blogs easier than ever before.
          </p>
        </div>
        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg">
          <div className="p-4 bg-red-500 text-white rounded-full mb-4">
            <i className="text-3xl fas fa-users"></i>
          </div>
          <h3 className="text-xl font-semibold mb-2">Engage with Community</h3>
          <p className="text-gray-600">
            Connect, share, and grow with a passionate blogging community.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg">
          <div className="p-4 bg-red-500 text-white rounded-full mb-4">
            <i className="text-3xl fas fa-chart-line"></i>
          </div>
          <h3 className="text-xl font-semibold mb-2">Track Your Success</h3>
          <p className="text-gray-600">
            Analytics and insights to help you grow your blog audience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;

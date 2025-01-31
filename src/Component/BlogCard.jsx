const BlogCard = ({ blog }) => {
  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-md text-gray-200">
      <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
      <p className="text-gray-400">{blog.description}</p>
      <span className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
        {blog.category}
      </span>
    </div>
  );
};

export default BlogCard;

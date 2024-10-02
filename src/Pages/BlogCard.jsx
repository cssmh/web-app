import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      {/* Display the blog image */}
      <img
        src={blog.image} // Assuming `image` contains the image link
        alt={blog.title}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />

      {/* Blog Title */}
      <h3 className="text-xl font-semibold">{blog.title}</h3>

      {/* Blog Content Preview */}
      <p className="text-gray-600 mb-2">
        {blog.content.substring(0, 100)}
        {blog.content.length > 100 && "..."}
      </p>

      {/* Category and Read More Link */}
      <div className="flex justify-between items-center mt-auto">
        <span className="text-sm text-gray-500">{blog.category}</span>
        <Link
          to={`/blog/${blog._id}`} // Link to detailed blog page
          className="text-red-500 hover:underline"
        >
          Read More
        </Link>
      </div>

      {/* Tags (optional) */}
      {blog.tags && (
        <div className="mt-2">
          <span className="text-sm text-gray-400">Tags: {blog.tags}</span>
        </div>
      )}
    </div>
  );
};

export default BlogCard;

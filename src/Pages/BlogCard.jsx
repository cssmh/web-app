import { Link } from "react-router-dom";
import Moment from "moment";

const BlogCard = ({ blog }) => {
  return (
    <div className="group bg-white rounded-lg shadow-lg p-3 flex flex-col">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full md:h-48 2xl:h-56 object-cover rounded-t-lg mb-4 transition-transform duration-300 group-hover:scale-105"
      />
      <h3 className="text-xl font-semibold">{blog.title}</h3>
      <p className="text-gray-600 mb-2">
        {blog.content.substring(0, 100)}
        {blog.content.length > 100 && "..."}
      </p>
      <span className="text-sm text-gray-500 mb-2">
        {Moment(blog.timestamp).format("DD-MM-YYYY")}
      </span>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-sm text-gray-500">{blog.category}</span>
        <Link to={`/blog/${blog._id}`} className="text-red-500 hover:underline">
          Read More
        </Link>
      </div>
      {blog.tags && (
        <div className="mt-2">
          <span className="text-sm text-gray-400">
            Tags:{" "}
            {blog.tags.split(",").map((tag) => (
              <span key={tag} className="mr-1">
                {tag.trim()},
              </span>
            ))}
          </span>
        </div>
      )}
    </div>
  );
};

export default BlogCard;

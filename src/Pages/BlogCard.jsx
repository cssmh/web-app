import { FaComment, FaShare, FaFlag } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-md text-gray-200">
      {/* #18181b */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <img
            src={blog?.writerImage}
            alt={blog?.writerName}
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold">{blog?.writerName}</p>
            <p className="text-xs text-gray-400">
              {new Date(blog?.timestamp).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-blue-400">
            <FaFlag className="text-sm" />
          </button>
          <button className="text-gray-400 hover:text-blue-400">
            <FaShare className="text-sm" />
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <Link to={`/blog/${blog?._id}`}>
            <h3 className="text-2xl font-semibold hover:underline mb-2">
              {blog?.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-400 line-clamp-4">{blog?.content}</p>
        </div>
        <div className="w-28 h-20 flex-shrink-0">
          <img
            src={blog?.image}
            alt={blog?.title}
            className="w-full h-full rounded-sm object-cover"
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2 text-gray-400">
          <FaComment className="text-sm" />
          <span className="text-sm">{blog?.comments?.length}</span>
        </div>
        <p className="text-sm text-gray-400">1 min read</p>
      </div>
    </div>
  );
};

export default BlogCard;

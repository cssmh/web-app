import { FaComment, FaShare, FaFlag } from "react-icons/fa";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-md text-gray-200">
      {/* Top Section */}
      <div className="flex justify-between items-start mb-4">
        {/* Writer Info */}
        <div className="flex items-center gap-2">
          <img
            src={blog.writerImage}
            alt={blog.writerName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold">{blog.writerName}</p>
            <p className="text-xs text-gray-400">
              {new Date(blog.timestamp).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-blue-400">
            <FaFlag className="text-sm" />
          </button>
          <button className="text-gray-400 hover:text-blue-400">
            <FaShare className="text-sm" />
          </button>
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex gap-4">
        {/* Left: Title and Content */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
          <p className="text-sm text-gray-400 line-clamp-3">{blog.content}</p>
        </div>

        {/* Right: Image */}
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-4">
        {/* Comment Count */}
        <div className="flex items-center gap-2 text-gray-400">
          <FaComment className="text-sm" />
          <span className="text-sm">{blog.comments.length}</span>
        </div>

        {/* Read Time */}
        <p className="text-sm text-gray-400">1 min read</p>
      </div>
    </div>
  );
};

export default BlogCard;

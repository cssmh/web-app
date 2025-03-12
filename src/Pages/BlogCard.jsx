import moment from "moment";
import { Link } from "react-router-dom";
import { FaComment, FaShare, FaFlag, FaRegThumbsUp } from "react-icons/fa";
import useAddBookmark from "../hooks/useAddBookmark";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { addLike, addUnlike } from "../api/Blog";

const BlogCard = ({ blog, refetch }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const { handleAddBookmark } = useAddBookmark();

  useEffect(() => {
    if (blog?.likes && user?.email) {
      setIsLiked(blog.likes.includes(user.email));
    }
  }, [blog, user]);

  const handleLike = async () => {
    if (!user) {
      return toast.warning("You must be logged in to like this blog");
    }
    try {
      await addLike(blog._id, user.email);
      toast.success("Blog liked!");
      refetch();
      setIsLiked(true);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleUnlike = async () => {
    if (!user) {
      return toast.warning("You must be logged in to unlike this blog");
    }
    try {
      await addUnlike(blog._id, user.email);
      toast.success("Blog unliked!");
      refetch();
      setIsLiked(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-[#1e1e1e] p-3 lg:p-4 rounded-lg shadow-md text-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <img
            src={blog?.writerImage}
            alt={blog?.writerName}
            className="w-8 2xl:w-10 h-8 2xl:h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm 2xl:text-base font-semibold">
              {blog?.writerName}
            </p>
            <p className="text-xs 2xl:text-sm text-gray-400">
              {moment(blog?.timestamp).format("DD/MMM/YYYY, h:mm A")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              handleAddBookmark(blog._id, blog?.title, blog?.image)
            }
            className="text-gray-400 hover:text-blue-400"
          >
            <FaFlag className="text-base 2xl:text-lg" />
          </button>
          <button className="text-gray-400 hover:text-blue-400">
            <FaShare className="text-base 2xl:text-lg" />
          </button>
        </div>
      </div>
      <Link
        to={`/blog/${blog?.title.toLowerCase().replaceAll(/\s+/g, "_")}/${
          blog?._id
        }`}
        className="block"
      >
        <h3 className="text-xl 2xl:text-2xl font-semibold text-white mb-2">
          {blog?.title}
        </h3>
        <p className="text-gray-400 text-sm 2xl:text-base">
          {blog?.content.slice(0, 250)}.....
        </p>
      </Link>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2 text-gray-400">
          <FaComment className="text-sm 2xl:text-base" />
          <span className="text-sm">
            {blog?.comments?.length || 0} Comments
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={isLiked ? handleUnlike : handleLike}
            className="flex items-center space-x-2 text-gray-400 hover:text-blue-400"
            title={isLiked ? "Click to unlike" : "Click to like"}
          >
            <FaRegThumbsUp
              className={`${
                isLiked ? "text-blue-500" : "text-gray-400"
              } text-xl`}
            />
            <span className="text-sm 2xl:text-base">
              {blog?.likes?.length || 0} Likes
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

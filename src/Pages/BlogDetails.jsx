import { useParams } from "react-router-dom";
import Moment from "moment";
import { toast } from "react-toastify";
import BlogHelmet from "../Component/BlogHelmet";
import { useState, useRef, useEffect } from "react";
import {
  addComment,
  addLike,
  addUnlike,
  getBlog,
  updateComment,
} from "../api/Blog";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Component/Spinner/Spinner";
import { FaBookmark, FaComment } from "react-icons/fa";
import useAddBookmark from "../hooks/useAddBookmark";
import EmojiPicker from "emoji-picker-react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const BlogDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const { handleAddBookmark } = useAddBookmark();

  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [updatedComment, setUpdatedComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojiPickerRef = useRef(null); // Ref for the emoji picker container

  const {
    data: blogData = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs", id],
    queryFn: async () => {
      return await getBlog(id);
    },
  });
  console.log(blogData);

  useEffect(() => {
    if (blogData?.likes && user?.email) {
      setIsLiked(blogData.likes.includes(user.email));
    }
  }, [blogData, user]);

 const handleLike = async () => {
   if (!user) {
     return toast.warning("You must be logged in to like this blog");
   }

   try {
     console.log("Liking blog with ID:", id, "and email:", user.email);
     await addLike(id, user.email);
     toast.success("Blog liked!");
     refetch();
   } catch (error) {
     console.error("Error liking blog:", error);
     toast.error("Failed to like blog");
   }
 };

 const handleUnlike = async () => {
   if (!user) {
     return toast.warning("You must be logged in to unlike this blog");
   }

   try {
     console.log("Unliking blog with ID:", id, "and email:", user.email);
     await addUnlike(id, user.email);
     toast.success("Blog unliked!");
     refetch();
   } catch (error) {
     console.error("Error unliking blog:", error);
     toast.error("Failed to unlike blog");
   }
 };

  // Handle clicks outside the emoji picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false); // Close the emoji picker
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleCommentSubmit = async () => {
    if (comment.trim().length < 1) {
      return toast.warning("Write something first");
    }
    setIsSubmitting(true);
    const commentData = {
      user: user?.displayName || "Anonymous Member",
      email: user?.email || "guest@mail.com",
      content: comment,
      timestamp: new Date(),
    };

    try {
      await addComment(id, commentData);
      toast.success("Comment added!");
      setComment("");
      refetch();
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Error adding comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (comment) => {
    setEditingComment(comment);
    setUpdatedComment(comment.content);
  };

  const handleCommentUpdate = async () => {
    if (updatedComment.trim().length < 1) {
      return toast.warning("Updated comment cannot be empty.");
    }

    try {
      await updateComment(id, editingComment, updatedComment);
      toast.success("Comment updated!");
      setEditingComment(null);
      refetch();
    } catch (error) {
      console.error("Error updating comment:", error);
      toast.error("Error updating comment. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setUpdatedComment("");
  };

  const handleEmojiClick = (emojiObject) => {
    setComment((prevComment) => prevComment + emojiObject.emoji);
    // Don't close the emoji picker after selecting an emoji
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  if (isLoading) return <Spinner size="87" />;

  return (
    <div className="max-w-4xl 2xl:max-w-7xl mx-auto p-4 bg-[#18181b] shadow-lg rounded-lg mb-7">
      <BlogHelmet title={blogData?.title} />
      <div className="mb-6">
        <span className="text-sm uppercase text-blue-400 font-semibold">
          {blogData?.category}
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mt-2">
          {blogData?.title}
        </h1>
        <div className="flex flex-wrap gap-2 mt-2">
          {blogData?.tags?.split(",").map((tag, index) => (
            <span
              key={index}
              className="text-sm text-gray-400 border border-gray-600 px-2 py-1 rounded-full"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <img
          src={blogData?.writerImage}
          alt={blogData?.writerName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-white">
            {blogData?.writerName}
          </p>
          <p className="text-xs text-gray-400">
            Posted on{" "}
            {Moment(blogData?.timestamp).format("DD/MMM/YYYY, h:mm A")}
          </p>
        </div>
      </div>
      {/* <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-gray-400">
          <FaComment className="text-sm" />
          <span className="text-sm">{blogData?.comments?.length} Comments</span>
        </div>
        <button
          onClick={() =>
            handleAddBookmark(blogData._id, blogData?.title, blogData?.image)
          }
          className="text-gray-400 hover:text-blue-400"
        >
          <FaBookmark className="text-xl" />
        </button>
      </div> */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-gray-400">
          <FaComment className="text-sm" />
          <span className="text-sm">{blogData?.comments?.length} Comments</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={isLiked ? handleUnlike : handleLike}
            className="text-gray-400 hover:text-blue-400"
          >
            {isLiked ? (
              <FaThumbsDown className="text-xl" />
            ) : (
              <FaThumbsUp className="text-xl" />
            )}
          </button>
          <span className="text-sm text-gray-400">
            {blogData?.likes?.length || 0} Likes
          </span>
          <button
            onClick={() =>
              handleAddBookmark(blogData._id, blogData?.title, blogData?.image)
            }
            className="text-gray-400 hover:text-blue-400"
          >
            <FaBookmark className="text-xl" />
          </button>
        </div>
      </div>
      <img
        src={blogData?.image}
        alt={blogData?.title}
        className="w-full lg:h-72 2xl:h-96 object-cover rounded-md mb-6"
      />
      <p className="text-gray-100 2xl:text-xl whitespace-pre-line mb-6">
        {blogData?.content}
      </p>
      <h3 className="text-xl 2xl:text-xl font-semibold text-white mb-4">
        Comments
      </h3>
      <div className="relative">
        <textarea
          className="w-full p-3 bg-gray-900 text-white rounded-lg mb-4"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          rows="4"
        />
        <button
          onClick={toggleEmojiPicker}
          className="absolute right-2 bottom-8 text-gray-400 hover:text-blue-400"
        >
          😀
        </button>
        {showEmojiPicker && (
          <div className="absolute right-0 bottom-16" ref={emojiPickerRef}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
      <button
        onClick={handleCommentSubmit}
        className="bg-[#3f3f46] text-white py-2 px-4 rounded-lg transition-all"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Comment"}
      </button>
      <div className="mt-4 2xl:text-xl">
        {blogData?.comments && blogData?.comments.length === 0 ? (
          <p className="text-gray-400">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          blogData?.comments?.map((cmt, index) => (
            <div
              key={index}
              className="p-4 rounded-lg shadow-sm border border-gray-700 mb-4"
            >
              <p className="font-semibold text-blue-400">{cmt.user}</p>
              <p className="text-sm text-gray-500 mb-1">
                {Moment(cmt.timestamp).format("DD/MMM/YYYY, h:mm A")}
              </p>
              {editingComment === cmt ? (
                <>
                  <textarea
                    value={updatedComment}
                    onChange={(e) => setUpdatedComment(e.target.value)}
                    className="w-full p-3 bg-gray-700 text-white rounded-lg mb-2"
                    rows="2"
                  />
                  <div>
                    <button
                      onClick={handleCommentUpdate}
                      className="bg-green-600 text-white py-1 px-3 rounded-lg mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-red-600 text-white py-1 px-3 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-200">{cmt.content}</p>
                  {user?.email === cmt.email && (
                    <button
                      onClick={() => handleEditClick(cmt)}
                      className="mt-2 text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogDetails;

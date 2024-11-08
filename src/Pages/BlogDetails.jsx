import { useNavigate, useParams } from "react-router-dom";
import Moment from "moment";
import BlogHelmet from "../Component/BlogHelmet";
import { useState } from "react";
import { addComment, getBlog } from "../Api/Blog";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Component/Spinner/Spinner";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim().length < 1) {
      return toast.error("Write something first");
    }
    setIsSubmitting(true);
    const commentData = {
      user: user?.displayName || user?.email || "Anonymous",
      content: comment,
      timestamp: new Date(),
    };

    try {
      await addComment(id, commentData);
      toast.success("Comment added!");
      setComment("");
      refetch();
    } catch (error) {
      console.log("Error adding comment:", error);
      toast.error("Error adding comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedContent = blogData.content
    ? blogData.content.split("\n").map((line, index) => (
        <p key={index} className="text-gray-700 px-1 md:px-0 mb-4">
          {line}
        </p>
      ))
    : null;

  if (isLoading) return <Spinner size="87" />;

  return (
    <div className="max-w-4xl 2xl:max-w-[80%] mx-auto my-2 md:mb-5 p-2 md:p-4 bg-white rounded-lg shadow-md">
      <BlogHelmet title={blogData.title} />
      <img
        src={blogData?.image}
        alt={blogData.title}
        className="w-full md:h-72 object-cover rounded-lg mb-2 md:mb-4"
      />
      <h1 className="text-xl md:text-3xl font-bold mb-2 px-1 md:px-0">
        {blogData.title}
      </h1>
      <div className="flex flex-col md:flex-row justify-between md:items-center my-3 text-gray-500 px-1 md:px-0">
        <span className="text-sm">
          Writer: {blogData?.writerName || "Anonymous"}
        </span>
        <span className="text-sm">
          Posted on: {Moment(blogData.timestamp).format("DD-MM-YYYY")}
        </span>
      </div>
      {formattedContent}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments</h3>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg shadow-md transition-all"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          rows="4"
          style={{ outline: "none" }}
        />
        <button
          onClick={handleCommentSubmit}
          className="mt-4 w-full md:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Comment"}
        </button>
        <div className="mt-4 space-y-3">
          {blogData.comments && blogData.comments.length === 0 ? (
            <p className="text-gray-600">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            blogData.comments?.map((comment, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 transition-all hover:bg-gray-100"
              >
                <p className="font-semibold text-gray-800">{comment.user}</p>
                <p className="text-gray-600">{comment.content}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {Moment(comment.timestamp).format("DD-MM-YYYY hh:mm A")}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="mt-6 px-1 md:px-0">
        <button
          onClick={() => navigate(-1)}
          className="text-red-500 hover:underline"
        >
          Back to Blogs
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;

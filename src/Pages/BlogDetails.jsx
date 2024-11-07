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
    const comment = {
      user: user?.displayName || user?.email || "Anonymous",
      content: comment,
      timestamp: new Date(),
    };

    try {
      await addComment(id, comment);
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
        <p key={index} className="text-gray-700 mb-4">
          {line}
        </p>
      ))
    : null;

  if (isLoading) return <Spinner size="87" />;

  return (
    <div className="max-w-4xl 2xl:max-w-[80%] mx-auto my-2 md:my-5 p-2 md:p-6 bg-white rounded-lg shadow-md">
      <BlogHelmet title={blogData.title} />
      <img
        src={blogData?.image}
        alt={blogData.title}
        className="w-full md:h-64 object-cover rounded-lg mb-4"
      />
      <h1 className="text-lg md:text-3xl font-bold">{blogData.title}</h1>
      <div className="flex flex-col md:flex-row justify-between md:items-center my-2">
        <span className="text-sm text-gray-500 block">
          Writer: {blogData?.writerName || "Anonymous"}
        </span>
        <span className="text-sm text-gray-500 block">
          Posted on: {Moment(blogData.timestamp).format("DD-MM-YYYY")}
        </span>
      </div>
      {formattedContent}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Comments</h3>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md mt-4"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          style={{ outline: "none" }}
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-500 text-white p-2 rounded-md mt-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Comment"}
        </button>
        <div className="mt-6">
          {blogData.comments && blogData.comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            blogData.comments?.map((comment, index) => (
              <div
                key={index}
                className="mt-4 p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                <p className="font-semibold">{comment.user}</p>
                <p>{comment.content}</p>
                <p className="text-sm text-gray-500">
                  {Moment(comment.timestamp).format("DD-MM-YYYY HH:mm")}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="mt-6">
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

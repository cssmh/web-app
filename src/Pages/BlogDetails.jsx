import { useParams } from "react-router-dom";
import Moment from "moment";
import { toast } from "sonner";
import BlogHelmet from "../Component/BlogHelmet";
import { useState } from "react";
import { addComment, getBlog, updateComment } from "../Api/Blog";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Component/Spinner/Spinner";

const BlogDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingComment, setEditingComment] = useState(null); 
  const [updatedComment, setUpdatedComment] = useState("");

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

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleCommentSubmit = async () => {
    if (comment.trim().length < 1) {
      return toast.warning("Write something first");
    }
    setIsSubmitting(true);
    const commentData = {
      user: user?.displayName || "Anonymous",
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

  if (isLoading) return <Spinner size="87" />;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-800 shadow-lg rounded-lg mb-7">
      <BlogHelmet title={blogData?.title} />
      <img
        src={blogData?.image}
        alt={blogData?.title}
        className="w-full h-72 object-cover rounded-md mb-4"
      />
      <h1 className="text-3xl font-bold mb-4 text-white">{blogData?.title}</h1>
      <p className="text-gray-400 mb-6">{blogData?.content}</p>

      <h3 className="text-xl font-semibold text-white mb-4">Comments</h3>
      {user && (
        <>
          <textarea
            className="w-full p-3 bg-gray-900 text-white rounded-lg mb-4"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            rows="4"
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Comment"}
          </button>
        </>
      )}
      <div className="mt-4">
        {blogData?.comments && blogData?.comments.length === 0 ? (
          <p className="text-gray-400">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          blogData?.comments?.map((cmt, index) => (
            <div
              key={index}
              className="p-4 bg-gray-800 rounded-lg shadow-sm border border-gray-700 mb-4"
            >
              <p className="font-semibold text-white">{cmt.user}</p>
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
                  <p className="text-gray-400">{cmt.content}</p>
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
              <p className="text-sm text-gray-500 mt-1">
                {Moment(cmt.timestamp).format("DD-MM-YYYY hh:mm A")}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


export default BlogDetails;

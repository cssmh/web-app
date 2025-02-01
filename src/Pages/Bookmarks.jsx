import moment from "moment";
import useMyBookmarks from "../hooks/useMyBookmarks";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteBookmark } from "../api/bookmark";
import Spinner from "../Component/Spinner/Spinner";
import { FaBookmark } from "react-icons/fa";

const Bookmarks = () => {
  const { bookmarks, isLoading, refetch } = useMyBookmarks();
  const handleDeleteBookmark = async (bookmarkId) => {
    try {
      const res = await deleteBookmark(bookmarkId);
      if (res.deletedCount > 0) {
        toast.success("Bookmark removed successfully");
        refetch();
      } else {
        toast.error("Failed to remove bookmark");
      }
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      toast.error("An error occurred while removing the bookmark");
    }
  };

  if (isLoading) return <Spinner size="80" />;

  if (!bookmarks || bookmarks.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[72vh]">
        <p className="text-lg text-gray-300 mb-2">
          You haven&apos;t added any bookmarks yet...
        </p>
        <Link
          to="/"
          className="text-center text-gray-300 bg-[#2f342a] px-3 py-2 rounded-lg"
        >
          Add now?
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl md:mx-auto my-5 mx-2">
      {bookmarks?.map((bookmark) => (
        <div
          key={bookmark._id}
          className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg text-gray-200 mb-5 flex items-start gap-4"
        >
          <div className="flex flex-col justify-between flex-grow">
            <Link to={`/blog/${bookmark.blogId}`} className="hover:underline">
              <h3 className="text-base md:text-2xl font-semibold text-gray-200">
                {bookmark.blogName}
              </h3>
            </Link>
            <p className="text-sm text-gray-400 mt-2">
              Added on {moment(bookmark?.timestamp).format("DD/MMM/YYYY")}
            </p>
            <button
              onClick={() => handleDeleteBookmark(bookmark._id)}
              className="mt-3 text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
            >
              Remove <FaBookmark className="text-xl" />
            </button>
          </div>
          <img
            src={bookmark?.blogImage}
            className="h-20 object-cover rounded-md shadow-sm"
            alt={bookmark.blogName}
          />
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;

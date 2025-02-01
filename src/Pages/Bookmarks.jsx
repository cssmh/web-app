import moment from "moment";
import useMyBookmarks from "../hooks/useMyBookmarks";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteBookmark } from "../api/bookmark";
import Spinner from "../Component/Spinner/Spinner";

const Bookmarks = () => {
  const { bookmarks, isLoading, refetch } = useMyBookmarks();

  const handleDeleteBookmark = async (bookmarkId) => {
    try {
      const res = await deleteBookmark(bookmarkId);
      if (res.deletedCount > 0) {
        toast.success("Bookmark removed successfully");
        refetch(); // Refetch the bookmarks after deletion
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
          You haven&apos;t added any bookmark yet...
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
    <div className="max-w-3xl mx-auto my-5">
      {bookmarks?.map((bookmark) => (
        <div
          key={bookmark._id}
          className="bg-[#1e1e1e] p-4 rounded-lg shadow-md text-gray-200 mb-4"
        >
          <div className="flex justify-between items-center">
            <Link to={`/blog/${bookmark.blogId}`} className="hover:underline">
              <h3 className="text-xl font-semibold">{bookmark.blogName}</h3>
            </Link>
            <img src={bookmark?.blogImage} className="w-28 h-16" alt="" />
            <button
              onClick={() => handleDeleteBookmark(bookmark._id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
          <p className="text-xs text-gray-400">
            {moment(bookmark?.timestamp).format("DD/MMM/YYYY")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;

import { toast } from "react-toastify";
import { postBookmark } from "../api/bookmark";
import useAuth from "./useAuth";
import useBookmarks from "./useBookmarks";

const useAddBookmark = () => {
  const { user } = useAuth();
  const { ids, refetch } = useBookmarks();

  const handleAddBookmark = async (id, name, blogImage) => {
    if (!user) return toast.warning("Please login first");
    if (ids.includes(id)) return toast.error("Already added");

    try {
      const markInfo = {
        blogId: id,
        blogName: name,
        blogImage: blogImage,
        email: user?.email,
        timestamp: new Date().toISOString(),
      };
      const res = await postBookmark(markInfo);
      if (res && res.insertedId) {
        refetch();
        toast.success("Added to Bookmark");
      }
    } catch (error) {
      console.error("Error adding bookmark:", error);
      toast.error("Failed to add bookmark");
    }
  };

  return { handleAddBookmark };
};

export default useAddBookmark;

import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { getMyBookmarks } from "../api/bookmark";

const useBookmarks = () => {
  const { loading, user } = useAuth();
  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myBookmark", user?.email],
    queryFn: () => getMyBookmarks(user?.email),
    enabled: !loading && !!user?.email,
  });
  const bookmarks = data?.result;
  const ids = data?.ids;
  return { bookmarks, ids, isLoading, refetch };
};

export default useBookmarks;

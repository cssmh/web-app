import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { getMyBookmarks } from "../api/bookmark";

const useMyBookmarks = () => {
  const { loading, user } = useAuth();
  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myBookmark", user?.email],
    queryFn: async () => {
      return await getMyBookmarks(user?.email);
    },
    enabled: !loading && !!user?.email,
  });
  const bookmarks = data?.result;
  const ids = data?.ids;
  return { bookmarks, ids, isLoading, refetch };
};

export default useMyBookmarks;

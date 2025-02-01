import axiosSecure from ".";

export const postBookmark = async (markInfo) => {
  const { data } = await axiosSecure.post("/bookmarks", markInfo);
  return data;
};

export const getMyBookmarks = async (email) => {
  const { data } = await axiosSecure(`/my-bookmarks?email=${email}`);
  return data;
};

export const deleteBookmark = async (id) => {
  const { data } = await axiosSecure.delete(`/bookmark/${id}`);
  return data;
};

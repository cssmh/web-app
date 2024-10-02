import axiosSecure from ".";

export const postBlog = async (BlogInfo) => {
  const { data } = await axiosSecure.post("/blog", BlogInfo);
  return data;
};

export const getAllBlogs = async () => {
  const { data } = await axiosSecure("/all-blog");
  return data;
};

export const getBlog = async (id) => {
  const { data } = await axiosSecure(`/blog/${id}`);
  return data;
};

export const getMyBlogs = async (email) => {
  const { data } = await axiosSecure(`/my-blogs?email=${email}`);
  return data;
};

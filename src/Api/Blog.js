import axiosSecure from ".";

export const postBlog = async (BlogInfo) => {
  const { data } = await axiosSecure.post("/blog", BlogInfo);
  return data;
};

export const getAllBlogs = async (page, limit, searchTerm) => {
  const { data } = await axiosSecure(
    `/all-blogs?page=${page}&limit=${limit}&search=${searchTerm}`
  );
  return data;
};

export const homeBlog = async (searchTerm, category) => {
  const api = `/popular-blog?search=${searchTerm}&category=${category}`;
  const { data } = await axiosSecure(api);
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

export const updateMyBlog = async (id, updatedData) => {
  const { data } = await axiosSecure.put(`/update-blog/${id}`, updatedData);
  return data;
};

export const deleteMyBlog = async (id) => {
  const { data } = await axiosSecure.delete(`/blog/${id}`);
  return data;
};

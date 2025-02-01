import axiosSecure from ".";

export const postBlog = async (blogInfo) => {
  const { data } = await axiosSecure.post("/blog", blogInfo);
  return data;
};

export const navBlog = async (searchTerm) => {
  const { data } = await axiosSecure(`nav-blog?search=${searchTerm}`);
  return data;
};

export const homeBlog = async (category, sortOption = "latest") => {
  const api = `/home-blog?category=${category}&sort=${sortOption}`;
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

export const editMyBlog = async (id, editedData) => {
  const { data } = await axiosSecure.put(`/update-blog/${id}`, editedData);
  return data;
};

export const deleteMyBlog = async (id) => {
  const { data } = await axiosSecure.delete(`/blog/${id}`);
  return data;
};

export const addComment = async (id, comment) => {
  const { data } = await axiosSecure.patch(`/add-comment/${id}`, comment);
  return data;
};

export const updateComment = async (id, comment, updatedContent) => {
  const { data } = await axiosSecure.patch(`/update-comment/${id}`, {
    comment,
    updatedContent,
  });
  return data;
};

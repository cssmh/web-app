import swal from "sweetalert";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import axios from "axios";
import { postBlog } from "../Api/Blog";
import useAuth from "../hooks/useAuth";
import BlogHelmet from "../Component/BlogHelmet";

const WriteBlog = () => {
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    image: null,
  });

  const [imgLoading, setImgLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({ ...prevState, image: file }));
    }
  };

  const uploadImageToImgBB = async (imageFile) => {
    const apiKey = import.meta.env.VITE_imgBbKey;
    const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      setImgLoading(true);
      const response = await axios.post(url, formData);
      return response.data.data.url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    } finally {
      setImgLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      swal("Error!", "Please upload an image.", "error");
      return;
    }

    const imageUrl = await uploadImageToImgBB(formData.image);
    if (imageUrl) {
      const res = await postBlog({
        ...formData,
        email: user?.email,
        image: imageUrl,
        timestamp: new Date().toISOString(),
      });

      if (res?.insertedId) {
        swal("Thank You!", "Blog added", "success", { timer: 2000 });
        setFormData({
          title: "",
          content: "",
          category: "",
          tags: "",
          image: null,
        });
        document.getElementById("image").value = "";
      } else {
        swal("Error!", "Blog submission failed.", "error");
      }
    } else {
      swal("Error!", "Image upload failed. Blog not submitted.", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-3 mb-8 px-6 py-4 bg-white rounded-lg shadow-md">
      <BlogHelmet title="Write a Blog" />
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-3">
        Create a New Blog
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1 text-sm">
          <label htmlFor="title" className="block font-medium text-gray-600">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter blog title"
            className="w-full px-4 py-2 rounded-lg border"
            // style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="content" className="block font-medium text-gray-600">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Write your blog content..."
            className="w-full h-40 px-4 py-2 rounded-lg border"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="category" className="block font-medium text-gray-600">
            Category
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="Tech">Tech</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
            <option value="Business">Business</option>
          </select>
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="tags" className="block font-medium text-gray-600">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., javascript, react, tech"
            className="w-full px-4 py-2 rounded-lg border"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="image" className="block font-medium text-gray-600">
            Upload Blog Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className="block w-full py-3 text-center text-white rounded-lg bg-red-500 hover:bg-red-600"
          disabled={loading || imgLoading}
        >
          {loading || imgLoading ? (
            <div className="flex justify-center">
              <TbFidgetSpinner className="animate-spin text-2xl" />
            </div>
          ) : (
            "Create Blog"
          )}
        </button>
      </form>
    </div>
  );
};

export default WriteBlog;

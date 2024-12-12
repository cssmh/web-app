import { toast } from "sonner";
import { useState } from "react";
import axios from "axios";
import { postBlog } from "../Api/Blog";
import useAuth from "../hooks/useAuth";
import BlogHelmet from "../Component/BlogHelmet";
import { PiSpinnerGapLight } from "react-icons/pi";

const WriteBlog = () => {
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    image: null,
    writerName: user?.displayName || "Anonymous",
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
      toast.info("Please upload an image");
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

      if (res.insertedId) {
        toast.success("Thank You!, Blog added");
        setFormData({
          title: "",
          content: "",
          category: "",
          tags: "",
          image: null,
          writerName: user?.displayName || "Anonymous",
        });
        document.getElementById("image").value = "";
      } else {
        toast.warning("Error!, Blog submission failed");
      }
    } else {
      toast.error("Image upload failed. Blog not submitted.");
    }
  };

  return (
    <div className="max-w-3xl 2xl:max-w-[70%] mx-auto md:mt-3 mb-8 px-3 md:px-6 py-4 bg-gray-800 text-white rounded-lg shadow-md">
      <BlogHelmet title="Write a Blog" />
      <h2 className="text-xl md:text-2xl font-semibold text-center mb-3">
        Write a New Blog
      </h2>
      <form onSubmit={handleSubmit} className="space-y-2 md:space-y-5">
        <div className="space-y-1 text-sm">
          <label htmlFor="title" className="block font-medium text-gray-300">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter blog title"
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white"
            style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="content" className="block font-medium text-gray-300">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Write your blog content..."
            className="w-full h-40 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white"
            style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="category" className="block font-medium text-gray-300">
            Category
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            style={{ outline: "none" }}
          >
            <option value="">Select a category</option>
            <option value="Tech">Tech</option>
            <option value="Food">Food</option>
            <option value="Fashion">Fashion</option>
            <option value="Travel">Travel</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
            <option value="Business">Business</option>
          </select>
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="tags" className="block font-medium text-gray-300">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., javascript, react, tech"
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white"
            style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="image" className="block font-medium text-gray-300">
            Upload Blog Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg"
            accept="image/*"
            style={{ outline: "none" }}
          />
        </div>
        <button
          type="submit"
          className="block w-full py-[10px] text-center text-white rounded-lg bg-red-600 hover:bg-red-700"
          disabled={loading || imgLoading}
        >
          {loading || imgLoading ? (
            <div className="flex justify-center gap-3">
              <PiSpinnerGapLight className="animate-spin text-2xl" />
              <p className="animate-pulse">Creating...</p>
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

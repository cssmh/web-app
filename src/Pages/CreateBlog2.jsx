import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { postBlog } from "../Api/Blog";

const CreateBlog = () => {
  const [loading, setLoading] = useState(false); // Loading state

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(e.target); // Create a FormData object from the form

    const blogData = {
      title: formData.get("title"),
      content: formData.get("content"),
      category: formData.get("category"),
      tags: formData.get("tags"),
      imageUrl: formData.get("imageUrl"), // Get the image URL directly
    };

    setLoading(true); // Set loading state

    try {
      const res = await postBlog(blogData); // Submit the blog data
      console.log(res);
      // Optionally, reset form or provide user feedback here
      e.target.reset(); // Reset the form fields after submission
    } catch (error) {
      console.error("Failed to create blog:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create a New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div className="space-y-1 text-sm">
          <label htmlFor="title" className="block font-medium text-gray-600">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="Enter blog title"
            className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-red-200"
          />
        </div>

        {/* Content */}
        <div className="space-y-1 text-sm">
          <label htmlFor="content" className="block font-medium text-gray-600">
            Content
          </label>
          <textarea
            name="content"
            required
            placeholder="Write your blog content..."
            className="w-full h-40 px-4 py-2 rounded-lg border focus:ring focus:ring-red-200"
          />
        </div>

        {/* Category */}
        <div className="space-y-1 text-sm">
          <label htmlFor="category" className="block font-medium text-gray-600">
            Category
          </label>
          <select
            name="category"
            required
            className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-red-200"
          >
            <option value="">Select a category</option>
            <option value="Tech">Tech</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
          </select>
        </div>

        {/* Tags */}
        <div className="space-y-1 text-sm">
          <label htmlFor="tags" className="block font-medium text-gray-600">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            placeholder="e.g., javascript, react, tech"
            className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-red-200"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-1 text-sm">
          <label htmlFor="imageUrl" className="block font-medium text-gray-600">
            Blog Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            placeholder="Enter image URL"
            className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-red-200"
          />
        </div>

        <button
          type="submit"
          className="block w-full py-3 text-center text-white rounded-lg bg-red-500 hover:bg-red-600"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center">
              <TbFidgetSpinner className="animate-spin text-xl" />
            </div>
          ) : (
            "Create Blog"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;

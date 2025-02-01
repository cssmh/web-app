// import axios from "axios";
// import { useState } from "react";
// import { editMyBlog } from "../api/Blog";
// import useAuth from "../hooks/useAuth";
// import { useLoaderData, useNavigate } from "react-router-dom";
// import BlogHelmet from "../Component/BlogHelmet";
// import { toast } from "sonner";
// import { PiSpinnerGapLight } from "react-icons/pi";

// const EditBlog = () => {
//   const blogData = useLoaderData();
//   const { user, loading } = useAuth();
//   const navigateTo = useNavigate();

//   const [formData, setFormData] = useState({
//     title: blogData.title,
//     content: blogData.content,
//     category: blogData.category,
//     tags: blogData.tags,
//     image: null,
//     writerName: user?.displayName || "Anonymous",
//     previousImage: blogData.image,
//   });

//   const [imgLoading, setImgLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prevState) => ({ ...prevState, image: file }));
//     } else {
//       setFormData((prevState) => ({ ...prevState, image: null }));
//     }
//   };

//   const uploadImageToImgBB = async (imageFile) => {
//     const apiKey = import.meta.env.VITE_imgBbKey;
//     const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

//     const formData = new FormData();
//     formData.append("image", imageFile);

//     try {
//       setImgLoading(true);
//       const response = await axios.post(url, formData);
//       return response.data.data.url;
//     } catch (error) {
//       console.error("Image upload failed:", error);
//       return null;
//     } finally {
//       setImgLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let imageUrl = formData.previousImage;

//     if (formData.image) {
//       imageUrl = await uploadImageToImgBB(formData.image);
//       if (!imageUrl) {
//         toast.error("Image upload failed. Blog not updated.");
//         return;
//       }
//     }

//     const res = await editMyBlog(blogData._id, {
//       ...formData,
//       image: imageUrl,
//     });

//     if (res?.modifiedCount) {
//       navigateTo(-1);
//       toast.success("Good job!, Blog updated");
//     } else {
//       toast.error("Blog update failed.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-3 mb-8 px-6 py-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
//       <BlogHelmet title={blogData?.title} />
//       <h2 className="text-2xl font-semibold text-center mb-3 text-gray-900 dark:text-white">
//         Edit Blog
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div className="space-y-1 text-sm">
//           <label
//             htmlFor="title"
//             className="block font-medium text-gray-600 dark:text-gray-200"
//           >
//             Blog Title
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             placeholder="Enter blog title"
//             className="w-full px-4 py-[10px] rounded-lg border dark:bg-gray-700 dark:text-white"
//           />
//         </div>
//         <div className="space-y-1 text-sm">
//           <label
//             htmlFor="content"
//             className="block font-medium text-gray-600 dark:text-gray-200"
//           >
//             Content
//           </label>
//           <textarea
//             name="content"
//             value={formData.content}
//             onChange={handleChange}
//             required
//             placeholder="Write your blog content..."
//             className="w-full h-40 px-4 py-[10px] rounded-lg border dark:bg-gray-700 dark:text-white"
//           />
//         </div>
//         <div className="space-y-1 text-sm">
//           <label
//             htmlFor="category"
//             className="block font-medium text-gray-600 dark:text-gray-200"
//           >
//             Category
//           </label>
//           <select
//             className="w-full px-4 py-[10px] rounded-lg border dark:bg-gray-700 dark:text-white"
//             name="category"
//             required
//             value={formData.category}
//             onChange={handleChange}
//           >
//             <option value="">Select a category</option>
//             <option value="Web-Dev">Web Development</option>
//             <option value="Game-Dev">Game Development</option>
//             <option value="Machine-Learning">Machine Learning</option>
//             <option value="Travel">Travel</option>
//             <option value="Artificial-Int">Artificial Intelligence</option>
//             <option value="Lifestyle">Lifestyle</option>
//             <option value="Graphic-Design">Graphic Design</option>
//             <option value="Animation">Animation</option>
//             <option value="Food">Food</option>
//             <option value="Cyber-Security">Cybersecurity</option>
//             <option value="Data-Science">Data Science</option>
//           </select>
//         </div>
//         <div className="space-y-1 text-sm">
//           <label
//             htmlFor="tags"
//             className="block font-medium text-gray-600 dark:text-gray-200"
//           >
//             Tags (comma-separated)
//           </label>
//           <input
//             type="text"
//             name="tags"
//             value={formData.tags}
//             onChange={handleChange}
//             placeholder="e.g., javascript, react, tech"
//             className="w-full px-4 py-[10px] rounded-lg border dark:bg-gray-700 dark:text-white"
//           />
//         </div>
//         <div className="space-y-1 text-sm">
//           <label
//             htmlFor="image"
//             className="block font-medium text-gray-600 dark:text-gray-200"
//           >
//             Upload New Blog Image (optional)
//           </label>
//           <input
//             type="file"
//             name="image"
//             id="image"
//             onChange={handleImageChange}
//             className="w-full px-4 py-[10px] border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
//             accept="image/*"
//           />
//         </div>
//         <div className="space-y-1">
//           {formData.previousImage && !formData.image && (
//             <img
//               src={formData.previousImage}
//               alt="Current Blog"
//               className="w-full h-48 object-cover rounded-lg mb-2"
//             />
//           )}
//         </div>
//         <button
//           type="submit"
//           className="block w-full py-[10px] text-center text-white rounded-lg bg-red-500 hover:bg-red-600"
//           disabled={loading || imgLoading}
//         >
//           {loading || imgLoading ? (
//             <div className="flex justify-center gap-3">
//               <PiSpinnerGapLight className="animate-spin text-2xl" />
//               <p className="animate-pulse">Updating...</p>
//             </div>
//           ) : (
//             "Update Blog"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditBlog;

import { useState } from "react";
import { editMyBlog } from "../api/Blog";
import useAuth from "../hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router-dom";
import BlogHelmet from "../Component/BlogHelmet";
import { toast } from "sonner";
import { PiSpinnerGapLight } from "react-icons/pi";

const EditBlog = () => {
  const blogData = useLoaderData();
  const { user, loading } = useAuth();
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    title: blogData.title,
    content: blogData.content,
    category: blogData.category,
    tags: blogData.tags,
    image: blogData.image, // Changed to a string for image URL
    writerName: user?.displayName || "Anonymous",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await editMyBlog(blogData._id, {
      ...formData,
    });

    if (res?.modifiedCount) {
      navigateTo(-1);
      toast.success("Good job!, Blog updated");
    } else {
      toast.error("Blog update failed.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-3 mb-8 px-6 py-4 rounded-lg shadow-md">
      <BlogHelmet title={blogData?.title} />
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-1 text-sm">
            <label htmlFor="title" className="block font-medium text-gray-200">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter blog title"
              className="w-full px-4 py-[10px] rounded-lg border border-gray-700 bg-[#27272a] text-white"
              style={{ outline: "none" }}
            />
          </div>
          <div className="flex-1 space-y-1 text-sm">
            <label
              htmlFor="category"
              className="block font-medium text-gray-200"
            >
              Category
            </label>
            <select
              className="w-full px-4 py-[10px] rounded-lg border border-gray-700 bg-[#27272a] text-white"
              style={{ outline: "none" }}
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="Web-Dev">Web Development</option>
              <option value="Game-Dev">Game Development</option>
              <option value="Machine-Learning">Machine Learning</option>
              <option value="Travel">Travel</option>
              <option value="Artificial-Int">Artificial Intelligence</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Graphic-Design">Graphic Design</option>
              <option value="Animation">Animation</option>
              <option value="Food">Food</option>
              <option value="Cyber-Security">Cybersecurity</option>
              <option value="Data-Science">Data Science</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-1 text-sm">
            <label htmlFor="tags" className="block font-medium text-gray-200">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., javascript, react, tech"
              className="w-full px-4 py-[10px] rounded-lg border border-gray-700 bg-[#27272a] text-white"
              style={{ outline: "none" }}
            />
          </div>
          <div className="flex-1 space-y-1 text-sm">
            <label htmlFor="image" className="block font-medium text-gray-200">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full px-4 py-[10px] rounded-lg border border-gray-700 bg-[#27272a] text-white"
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="content" className="block font-medium text-gray-200">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Write your blog content..."
            className="w-full h-40 px-4 py-[10px] rounded-lg border border-gray-700 bg-[#27272a] text-white"
            style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-1">
          {formData.image && (
            <img
              src={formData.image}
              alt="Current Blog"
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
          )}
        </div>
        <button
          type="submit"
          className="block w-full py-[10px] text-center text-white rounded-lg bg-[#2f342a]"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center gap-3">
              <PiSpinnerGapLight className="animate-spin text-2xl" />
              <p className="animate-pulse">Updating...</p>
            </div>
          ) : (
            "Update Blog"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;

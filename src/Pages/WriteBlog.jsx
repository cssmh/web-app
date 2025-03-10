// import { toast } from "react-toastify";
// import { useState } from "react";
// import axios from "axios";
// import useAuth from "../hooks/useAuth";
// import BlogHelmet from "../Component/BlogHelmet";
// import { PiSpinnerGapLight } from "react-icons/pi";
// import defaultUser from "../assets/user.png";
// import { postBlog } from "../api/Blog";

// const WriteBlog = () => {
//   const { user, loading } = useAuth();
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     category: "",
//     tags: "",
//     image: null,
//     writerName: user?.displayName || "Anonymous",
//     writerImage: user?.photoURL || defaultUser,
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
//     if (!formData.image) {
//       toast.info("Please upload an image");
//       return;
//     }

//     const imageUrl = await uploadImageToImgBB(formData.image);
//     if (imageUrl) {
//       const res = await postBlog({
//         ...formData,
//         email: user?.email,
//         image: imageUrl,
//         timestamp: new Date().toISOString(),
//       });

//       if (res.insertedId) {
//         toast.success("Thank You!, Blog added");
//         setFormData({
//           title: "",
//           content: "",
//           category: "",
//           tags: "",
//           image: null,
//           writerName: user?.displayName || "Anonymous",
//         });
//         document.getElementById("image").value = "";
//       } else {
//         toast.warning("Error!, Blog submission failed");
//       }
//     } else {
//       toast.error("Image upload failed. Blog not submitted.");
//     }
//   };

//   return (
//     <div className="max-w-3xl 2xl:max-w-[70%] mx-auto md:mt-3 mb-8 px-3 md:px-6 py-4 bg-[#18181b] text-white rounded-lg shadow-md">
//       <BlogHelmet title="Write a Blog" />
//       <h2 className="text-xl md:text-2xl font-semibold text-center mb-3">
//         Write a New Blog
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-2 md:space-y-5">
//         <div className="space-y-1 text-sm">
//           <label htmlFor="title" className="block font-medium text-gray-300">
//             Blog Title
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             placeholder="Enter blog title"
//             className="w-full px-3 py-[10px] rounded-lg border border-gray-700 bg-gray-800 text-white"
//             style={{ outline: "none" }}
//           />
//         </div>
//         <div className="space-y-1 text-sm">
//           <label htmlFor="content" className="block font-medium text-gray-300">
//             Content
//           </label>
//           <textarea
//             name="content"
//             value={formData.content}
//             onChange={handleChange}
//             required
//             placeholder="Write your blog content..."
//             className="w-full h-40 px-3 py-[10px] rounded-lg border border-gray-700 bg-gray-800 text-white"
//             style={{ outline: "none" }}
//           />
//         </div>
//         <div className="space-y-1 text-sm">
//           <label htmlFor="category" className="block font-medium text-gray-300">
//             Category
//           </label>
//           <select
//             className="w-full px-3 py-[10px] rounded-lg border border-gray-700 bg-gray-800 text-white"
//             name="category"
//             required
//             value={formData.category}
//             onChange={handleChange}
//             style={{ outline: "none" }}
//           >
//             <option value="">Select a category</option>
//             <option value="Web-Dev">Web Development</option>
//             <option value="Game-Dev">Game Development</option>
//             <option value="Machine-Learning">Machine Learning</option>
//             <option value="Travel">Travel</option>
//             <option value="Artificial-Int">Artificial Intelligence</option>
//             <option value="Lifestyle">Lifestyle</option>
//             <option value="Graphic Design">Graphic Design</option>
//             <option value="Animation">Animation</option>
//             <option value="Food">Food</option>
//             <option value="Cyber-Security">Cybersecurity</option>
//             <option value="Data Science">Data Science</option>
//           </select>
//         </div>
//         <div className="space-y-1 text-sm">
//           <label htmlFor="tags" className="block font-medium text-gray-300">
//             Tags (comma-separated)
//           </label>
//           <input
//             type="text"
//             name="tags"
//             value={formData.tags}
//             onChange={handleChange}
//             placeholder="e.g., javascript, react, tech"
//             className="w-full px-3 py-[10px] rounded-lg border border-gray-700 bg-gray-800 text-white"
//             style={{ outline: "none" }}
//           />
//         </div>
//         <div className="space-y-1 text-sm">
//           <label htmlFor="image" className="block font-medium text-gray-300">
//             Upload Blog Image
//           </label>
//           <input
//             type="file"
//             name="image"
//             id="image"
//             onChange={handleImageChange}
//             className="w-full px-3 py-[10px] border border-gray-700 bg-gray-800 text-white rounded-lg"
//             accept="image/*"
//             style={{ outline: "none" }}
//           />
//         </div>
//         <button
//           type="submit"
//           className="block w-full py-[10px] text-center text-white rounded-lg bg-red-600 hover:bg-red-700"
//           disabled={loading || imgLoading}
//         >
//           {loading || imgLoading ? (
//             <div className="flex justify-center gap-3">
//               <PiSpinnerGapLight className="animate-spin text-2xl" />
//               <p className="animate-pulse">Creating...</p>
//             </div>
//           ) : (
//             "Create Blog"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default WriteBlog;

import { useState } from "react";
import useAuth from "../hooks/useAuth";
import BlogHelmet from "../Component/BlogHelmet";
import { toast } from "react-toastify";
import defaultUser from "/user.png";
import { postBlog } from "../api/Blog";
import { CgSpinnerTwoAlt } from "react-icons/cg";

const WriteBlog = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    image: "",
    writerName: user?.displayName || "Anonymous",
    writerImage: user?.photoURL || defaultUser,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (!formData.image) {
        toast.info("Please provide an image URL");
        return;
      }

      const res = await postBlog({
        ...formData,
        email: user?.email,
        timestamp: new Date().toISOString(),
      });

      if (res.insertedId) {
        toast.success("Thank You!, Blog added");
        setFormData({
          title: "",
          content: "",
          category: "",
          tags: "",
          image: "",
          writerName: user?.displayName || "Anonymous",
        });
      } else {
        toast.warning("Error!, Blog submission failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl 2xl:max-w-[75%] mx-auto md:my-8 px-4 md:px-6 py-4 bg-[#18181b] text-white rounded-lg shadow-md">
      <BlogHelmet title="Write a Blog" />
      {/* <h2 className="text-xl md:text-2xl font-semibold text-center mb-3">
        Write a New Blog
      </h2> */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-1 text-sm">
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
              className="w-full px-3 py-[10px] rounded-lg border border-gray-700 bg-[#27272a] text-white"
              style={{ outline: "none" }}
            />
          </div>
          <div className="flex-1 space-y-1 text-sm">
            <label
              htmlFor="category"
              className="block font-medium text-gray-300"
            >
              Category
            </label>
            <select
              className="w-full px-3 py-[10px] rounded-lg border border-gray-700 bg-[#27272a] text-white"
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
            <label htmlFor="tags" className="block font-medium text-gray-300">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., javascript, react, tech"
              className="w-full px-3 py-[10px] rounded-lg border border-gray-700 bg-[#27272a] text-white"
              style={{ outline: "none" }}
            />
          </div>
          <div className="flex-1 space-y-1 text-sm">
            <label htmlFor="image" className="block font-medium text-gray-300">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              placeholder="Enter image URL"
              className="w-full px-3 py-[10px] rounded-lg border border-gray-700 bg-[#27272a] text-white"
              style={{ outline: "none" }}
            />
          </div>
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
            className="w-full h-40 px-3 py-[10px] rounded-md border border-gray-700 bg-[#27272a] text-white"
            style={{ outline: "none" }}
          />
        </div>
        <button
          type="submit"
          className="block w-full py-3 text-center text-white rounded-lg bg-[#2f342a]"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center gap-3">
              <CgSpinnerTwoAlt className="animate-spin text-2xl" />
              <p>Posting...</p>
            </div>
          ) : (
            "Post Blog"
          )}
        </button>
      </form>
    </div>
  );
};

export default WriteBlog;

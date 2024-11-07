import { useLoaderData, useNavigate } from "react-router-dom";
import Moment from "moment";
import BlogHelmet from "../Component/BlogHelmet";

const BlogDetails = () => {
  const blogData = useLoaderData();
  const navigate = useNavigate();

  const formattedContent = blogData.content
    ? blogData.content.split("\n").map((line, index) => (
        <p key={index} className="text-gray-700 mb-4">
          {line}
        </p>
      ))
    : null;

  return (
    <div className="max-w-3xl 2xl:max-w-[80%] mx-auto my-2 md:my-5 p-2 md:p-6 bg-white rounded-lg shadow-md">
      <BlogHelmet title={blogData.title} />
      <img
        src={blogData?.image}
        alt={blogData.title}
        className="w-full md:h-64 object-cover rounded-lg mb-4"
      />
      <h1 className="text-lg md:text-3xl font-bold">{blogData.title}</h1>
      <div className="flex flex-col md:flex-row justify-between md:items-center my-2">
        <span className="text-sm text-gray-500 block">
          Writer: {blogData?.writerName}
        </span>
        <span className="text-sm text-gray-500 block">
          Posted on: {Moment(blogData.timestamp).format("DD-MM-YYYY")}
        </span>
      </div>
      {formattedContent}
      {blogData?.tags && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Tags:</h3>
          <span className="text-sm text-gray-400">
            {blogData.tags.split(",").map((tag, index) => (
              <span key={index} className="mr-1">
                {tag.trim()}
                {index < blogData.tags.split(",").length - 1 && ", "}
              </span>
            ))}
          </span>
        </div>
      )}
      <div className="mt-6">
        <button
          onClick={() => navigate(-1)}
          className="text-red-500 hover:underline"
        >
          Back to Blogs
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;

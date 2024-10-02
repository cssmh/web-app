import { Link, useLoaderData } from "react-router-dom";
import Moment from "moment";

const BlogDetails = () => {
  const blogData = useLoaderData();

  return (
    <div className="max-w-3xl mx-auto my-5 p-6 bg-white rounded-lg shadow-md">
      <img
        src={blogData.image}
        alt={blogData.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{blogData.title}</h1>
      <span className="text-sm text-gray-500 mb-4 block">
        Category: {blogData.category}
      </span>
      <span className="text-sm text-gray-500 mb-4 block">
        Posted on: {Moment(blogData.timestamp).format("DD-MM-YYYY")}
      </span>
      <p className="text-gray-700 mb-4">{blogData.content}</p>
      {blogData?.tags && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Tags:</h3>
          <span className="text-sm text-gray-400">
            {blogData.tags.split(",").map((tag) => (
              <span key={tag.trim()} className="mr-1">
                {tag.trim()},
              </span>
            ))}
          </span>
        </div>
      )}
      <div className="mt-6">
        <Link to="/all-blogs" className="text-red-500 hover:underline">
          Back to Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogDetails;

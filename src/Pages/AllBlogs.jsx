import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllBlogs } from "../api/Blog";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";
import BlogHelmet from "../Component/BlogHelmet";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 3;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { result, totalBlogs } = await getAllBlogs(page, limit);
    setBlogs([...blogs, ...result]);
    setHasMore(blogs.length < totalBlogs);
    setPage(page + 1);
  };

  return (
    <div className="max-w-7xl 2xl:max-w-[86%] mx-auto py-3 mb-6">
      <BlogHelmet title="All Blogs" />
      <InfiniteScroll
        dataLength={blogs.length}
        next={fetchBlogs}
        hasMore={hasMore}
        loader={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
            {[...Array(3)].map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </div>
        }
        endMessage={<p className="text-center">..</p>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {blogs?.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default AllBlogs;

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllBlogs } from "../Api/Blog";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";
import BlogHelmet from "../Component/BlogHelmet";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 3; // Number of items per page

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { result, totalBlogs } = await getAllBlogs(page, limit);
    setBlogs((prevBlogs) => [...prevBlogs, ...result]);
    setHasMore(blogs.length + result.length < totalBlogs);
    setPage(page + 1);
  };

  return (
    <div className="max-w-7xl 2xl:max-w-[86%] mx-auto py-3 mb-6">
      <BlogHelmet title="All Blogs" />
      <InfiniteScroll
        dataLength={blogs.length}
        next={fetchBlogs}
        hasMore={hasMore}
        loader={<BlogCardSkeleton />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default AllBlogs;

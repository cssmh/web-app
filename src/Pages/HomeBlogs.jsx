import { Link } from "react-router-dom";

const PopularBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: "The Ultimate Guide to Blogging for Beginners",
      excerpt:
        "Learn the basics of starting a blog, from choosing a niche to writing your first post.",
      image: "https://source.unsplash.com/400x300/?blogging,writing",
    },
    {
      id: 2,
      title: "10 Tips to Grow Your Blog Audience",
      excerpt:
        "Increase your blog's readership with these proven strategies for engagement and growth.",
      image: "https://source.unsplash.com/400x300/?audience,blogging",
    },
    {
      id: 3,
      title: "How to Write Captivating Blog Posts",
      excerpt:
        "Discover how to write compelling content that keeps your readers coming back for more.",
      image: "https://source.unsplash.com/400x300/?writing,content",
    },
    {
      id: 4,
      title: "The Power of Visual Storytelling in Blogs",
      excerpt:
        "Explore the importance of using visuals to enhance your blog's storytelling.",
      image: "https://source.unsplash.com/400x300/?visuals,storytelling",
    },
    {
      id: 5,
      title: "Monetizing Your Blog: A Complete Guide",
      excerpt:
        "Learn the most effective ways to turn your blog into a source of income.",
      image: "https://source.unsplash.com/400x300/?money,blogging",
    },
    {
      id: 6,
      title: "Building a Community Around Your Blog",
      excerpt:
        "Discover how to create an engaged community that interacts with your blog content.",
      image: "https://source.unsplash.com/400x300/?community,blogging",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto my-16 p-8">
      <h2 className="text-3xl font-bold text-center mb-12">Popular Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="p-6 border rounded-lg shadow-lg">
            <img
              src={blog.image}
              alt={blog.title}
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-600">{blog.excerpt}</p>
            <Link
              to={`/blog/${blog.id}`}
              className="text-red-500 hover:underline mt-2 inline-block"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularBlogs;

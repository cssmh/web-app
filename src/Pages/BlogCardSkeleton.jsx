const BlogCardSkeleton = () => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg mt-4 p-4 flex flex-col">
      <div className="w-full h-48 bg-gray-600 rounded-t-lg mb-4 animate-pulse"></div>
      <div className="w-3/4 h-6 bg-gray-600 rounded mb-2 animate-pulse"></div>
      <div className="w-full h-4 bg-gray-600 rounded mb-2 animate-pulse"></div>
      <div className="w-1/4 h-4 bg-gray-600 rounded mb-2 animate-pulse"></div>
      <div className="flex justify-between items-center mt-auto">
        <div className="w-1/4 h-4 bg-gray-600 rounded"></div>
        <div className="w-1/4 h-4 bg-gray-600 rounded animate-pulse"></div>
      </div>
      <div className="mt-2">
        <div className="w-1/2 h-4 bg-gray-600 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;

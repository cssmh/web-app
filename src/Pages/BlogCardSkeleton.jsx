const BlogCardSkeleton = () => {
  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-md mx-2 md:mx-0">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
          <div>
            <div className="w-20 h-4 bg-gray-700 rounded mb-1 animate-pulse"></div>
            <div className="w-16 h-3 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="w-3/4 h-5 bg-gray-700 rounded mb-2 animate-pulse"></div>
          <div className="w-[95%] h-3 bg-gray-700 rounded mb-2 animate-pulse"></div>
          <div className="w-[95%] h-3 bg-gray-700 rounded mb-2 animate-pulse"></div>
          <div className="w-[95%] h-3 bg-gray-700 rounded mb-2 animate-pulse"></div>
          <div className="w-[95%] h-3 bg-gray-700 rounded mb-2 animate-pulse"></div>
        </div>
        <div className="w-32 h-20 bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-8 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="w-12 h-4 bg-gray-700 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;

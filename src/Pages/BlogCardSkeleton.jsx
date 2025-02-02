const BlogCardSkeleton = () => {
  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-md">
      {/* Top Section Skeleton */}
      <div className="flex justify-between items-start mb-4">
        {/* Writer Info Skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
          <div>
            <div className="w-20 h-4 bg-gray-700 rounded mb-1 animate-pulse"></div>
            <div className="w-16 h-3 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
        {/* Options Skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      </div>
      {/* Middle Section Skeleton */}
      <div className="flex gap-4">
        {/* Left: Title and Content Skeleton */}
        <div className="flex-1">
          <div className="w-3/4 h-6 bg-gray-700 rounded mb-2 animate-pulse"></div>
          <div className="w-full h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
          <div className="w-full h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
          <div className="w-1/2 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>
        {/* Right: Image Skeleton */}
        <div className="w-24 h-24 bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
      {/* Bottom Section Skeleton */}
      <div className="flex justify-between items-center mt-4">
        {/* Comment Count Skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-8 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>
        {/* Read Time Skeleton */}
        <div className="w-12 h-4 bg-gray-700 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;

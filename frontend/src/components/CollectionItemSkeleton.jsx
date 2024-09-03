import React from "react";

const CollectionItemSkeleton = () => {
  return (
    <div className="flex flex-col p-5 shadow-md rounded gap-2 cursor-pointer animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-40 bg-gray-300 rounded-lg"></div>

      {/* Title placeholder */}
      <div className="w-3/4 h-4 bg-gray-300 rounded mt-4"></div>

      {/* Price and rating placeholder */}
      <div className="flex items-center mt-2 space-x-2">
        {/* Price placeholder */}
        <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
        
        {/* Star ratings placeholder */}
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-5 h-5 bg-gray-300 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionItemSkeleton;

import React from "react";

const HashtagFilter = ({ hashtags, onFilter }) => {
  if (hashtags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6 mx-40">
      {hashtags.map((tag, index) => (
        <button
          key={index}
          onClick={() => onFilter(tag)}
          className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-200"
        >
          #{tag}
        </button>
      ))}
    </div>
  );
};

export default HashtagFilter;
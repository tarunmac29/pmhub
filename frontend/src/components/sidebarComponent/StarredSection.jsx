import React from "react";
import { FaSearch } from "react-icons/fa";
import { Star } from "lucide-react";

const StarredSection = ({ starredItems = [] }) => {
  return (
    <div className="w-96 bg-white shadow-lg border border-gray-200 rounded-lg">
      {/* Header with Search */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Starred</h2>

      {starredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-600">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
            alt="Star icon"
            className="w-20 h-20 mb-4 opacity-60"
          />
          <p className="font-semibold text-sm">You haven’t starred anything yet</p>
          <p className="text-sm mt-2 text-gray-500">
            Mark items that are important to you with a star to quickly access them.
            <br />
            You’ll see those items here.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {starredItems.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
            >
              <Star size={16} className="text-yellow-500" />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>


      {/* Footer */}
      <div className="border-t px-4 py-2 text-blue-600 text-sm hover:bg-gray-100 cursor-pointer rounded-b-lg">
        ⭐ View all starred items
      </div>
    </div>
  );
};

export default StarredSection;

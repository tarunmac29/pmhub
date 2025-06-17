import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineViewList } from "react-icons/md";

const RecentDropdown = () => {
  return (
    <div className="w-96 bg-white shadow-lg border border-gray-200 rounded-lg">
      {/* Header with Search */}
      <div className="p-4 border-b">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">Recent</h2>
        <div className="flex items-center border rounded px-2 py-1 bg-gray-50">
          <FaSearch className="text-gray-500 text-xs mr-2" />
          <input
            type="text"
            placeholder="Search recent items"
            className="w-full text-sm outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Items */}
      <div className="p-4 space-y-3 text-sm">
        <p className="text-xs text-gray-500">Today</p>

        {/* Project: PM-HUB */}
        <div className="flex items-start space-x-3 hover:bg-gray-100 p-2 rounded cursor-pointer">
          <div className="bg-red-500 text-white font-bold w-6 h-6 flex items-center justify-center rounded-sm text-xs">
            🧑‍🤝‍🧑
          </div>
          <div>
            <div className="font-medium text-gray-900">PM-HUB</div>
            <div className="text-xs text-gray-500">Your first project • 7 minutes ago</div>
          </div>
        </div>

        {/* Board: KAN board */}
        <div className="flex items-start space-x-3 hover:bg-gray-100 p-2 rounded cursor-pointer">
          <div className="text-gray-600 pt-0.5">
            <MdOutlineViewList size={18} />
          </div>
          <div>
            <div className="font-medium text-gray-900">KAN board</div>
            <div className="text-xs text-gray-500">7 minutes ago</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t px-4 py-2 text-blue-600 text-sm hover:bg-gray-100 cursor-pointer rounded-b-lg">
        ⬇ View all recent items
      </div>
    </div>
  );
};

export default RecentDropdown;

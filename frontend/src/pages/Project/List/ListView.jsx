import React from "react";
import { FaPlus, FaFilter, FaUserCircle } from "react-icons/fa";

const ListView = () => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Top Toolbar */}
      <div className="flex justify-between items-center mb-4">
        {/* Left Side: Search & Filter */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search list"
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-64"
          />
          <button className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-100">
            <FaFilter className="text-gray-600" />
            Filter
          </button>
        </div>

        {/* Right Side: Profile & Group/Settings */}
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-2xl text-gray-600" />
          <button className="text-sm px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">Group</button>
          <button className="text-sm px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">⚙️</button>
        </div>
      </div>

      {/* Table Header */}
      <div className="bg-white border rounded-md overflow-hidden">
        <div className="grid grid-cols-9 items-center px-4 py-2 border-b text-xs font-medium text-gray-500 bg-gray-100">
          <div className="col-span-1"><input type="checkbox" /></div>
          <div className="col-span-1">Type</div>
          <div className="col-span-1">Key</div>
          <div className="col-span-2">Summary</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Assignee</div>
          <div className="col-span-1">Due date</div>
          <div className="col-span-1">Comments</div>
          <div className="col-span-1">Labels</div>
        </div>

        {/* + Create Row */}
        <div className="px-4 py-2 hover:bg-gray-50 text-sm text-blue-600 border-b cursor-pointer flex items-center gap-2">
          <FaPlus className="text-xs" />
          + Create
        </div>

        {/* Empty State */}
        <div className="p-12 flex flex-col items-center justify-center text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/159/159604.png"
            alt="Empty list"
            className="w-24 h-24 mb-4 opacity-30"
          />
          <h2 className="text-lg font-semibold text-gray-700 mb-2">View your work in a list</h2>
          <p className="text-sm text-gray-500 mb-4 max-w-sm">
            Manage and sort all your project's work into a single list that can be easily scanned and sorted by category.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
            Create work item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListView;

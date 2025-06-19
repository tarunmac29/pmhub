import React, { useEffect, useRef, useState } from "react";

const TaskDetailsModal = () => {
  const [isOpen, setIsOpen] = useState(true); // Control modal open/close
  const [statusOpen, setStatusOpen] = useState(false);
  const statusRef = useRef();

  const task = {
    title: "Improve Work Item",
    summary: "Improve task UI layout",
    status: "To_Do",
    description: "",
    activity: [
      { user: "Tarun Machhi", from: "In_Progress", to: "To_Do" },
      { user: "Tarun Machhi", from: "To_Do", to: "In_Progress" },
    ],
    team: "PM-Team-1",
    reporter: "Tarun Machhi",
    createdAt: "2 days ago",
    updatedAt: "1 day ago",
  };

  const [selectedStatus, setSelectedStatus] = useState(task.status || "To_Do");

  const statusOptions = [
    { label: "TO DO", value: "To_Do", bg: "bg-gray-200", text: "text-gray-800" },
    { label: "IN PROGRESS", value: "In_Progress", bg: "bg-blue-200", text: "text-blue-800" },
    { label: "DONE", value: "Done", bg: "bg-green-200", text: "text-green-800" },
  ];

  const currentStatus = statusOptions.find((s) => s.value === selectedStatus);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (statusRef.current && !statusRef.current.contains(e.target)) {
        setStatusOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-start justify-center overflow-y-auto">
      <div className="bg-white w-full max-w-6xl mt-10 rounded-lg shadow-lg flex flex-col sm:flex-row p-4 relative">
        {/* Close Button */}
        <button onClick={() => setIsOpen(false)} className="absolute top-2 right-3 text-gray-500 text-xl">
          &times;
        </button>

        {/* Left Section */}
        <div className="w-full sm:w-2/3 pr-4 border-r">
          <h2 className="text-lg font-semibold mb-2">{task.title}</h2>
          <button className="border px-2 py-1 text-xs rounded mb-3">+ Add</button>

          <div className="mb-4">
            <p className="text-sm text-gray-600">Description</p>
            <p className="text-sm text-gray-800 mt-1">{task.description || "Add a description..."}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-2">Activity</h3>
            {task.activity.map((log, i) => (
              <div key={i} className="mb-3 text-xs">
                <div className="font-medium">{log.user} changed the Status</div>
                <div className="flex gap-1 mt-1">
                  <span className="text-[10px] px-1 py-0.5 bg-gray-200 rounded">HISTORY</span>
                  <span className="text-[10px] px-1 py-0.5 bg-blue-100 text-blue-700 rounded">
                    {log.from}
                  </span>
                  <span className="text-[10px] px-1 py-0.5 bg-gray-100 text-gray-700 rounded">
                    → {log.to}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-1/3 pl-4 text-sm space-y-3 relative" ref={statusRef}>
          {/* Inline Status Dropdown */}
          <div className="flex items-center gap-2 relative">
            <button
              onClick={() => setStatusOpen(!statusOpen)}
              className="border rounded-md px-2 py-0.5 flex items-center hover:shadow-sm transition text-xs"
            >
              <span className={`px-1.5 py-0.5 rounded ${currentStatus?.bg} ${currentStatus?.text} font-medium`}>
                {currentStatus?.label}
              </span>
              <svg
                className="ml-1 w-3 h-3 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <input
              type="text"
              className="text-xs border px-2 py-1 rounded w-full"
              defaultValue={task.summary}
            />
          </div>

          {statusOpen && (
            <div className="absolute bg-white mt-1 shadow-lg rounded border w-40 z-50 text-xs">
              {statusOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    setSelectedStatus(option.value);
                    setStatusOpen(false);
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                >
                  <span className={`px-1.5 py-0.5 rounded ${option.bg} ${option.text} font-medium`}>
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Details Box */}
          <div className="bg-gray-50 p-3 rounded border">
            <div className="mb-2">
              <p className="text-gray-500 text-xs">Assignee</p>
              <p className="text-gray-700 flex items-center gap-2">
                <span role="img" aria-label="person">👤</span>
                Unassigned <button className="text-blue-500 text-xs ml-2">Assign to me</button>
              </p>
            </div>

            <div className="mb-2">
              <p className="text-gray-500 text-xs">Team</p>
              <p>{task.team}</p>
            </div>

            <div className="mb-2">
              <p className="text-gray-500 text-xs">Development</p>
              <p className="text-blue-500 text-xs cursor-pointer">+ Create branch</p>
              <p className="text-blue-500 text-xs cursor-pointer">+ Create commit</p>
            </div>

            <div>
              <p className="text-gray-500 text-xs">Reporter</p>
              <p>{task.reporter}</p>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            <p>Created {task.createdAt}</p>
            <p>Updated {task.updatedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;

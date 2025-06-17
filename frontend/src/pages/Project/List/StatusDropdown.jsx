import React, { useState } from "react";

const StatusDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const statusOptions = [
    { label: "TO DO", value: "To Do", bg: "bg-gray-200", text: "text-gray-800" },
    { label: "IN PROGRESS", value: "In Progress", bg: "bg-blue-200", text: "text-blue-800" },
    { label: "DONE", value: "Done", bg: "bg-green-200", text: "text-green-800" },
  ];

  const currentStatus = statusOptions.find((opt) => opt.value === value);

  return (
    <div className="relative w-40">
      <div
        onClick={() => setOpen(!open)}
        className="border rounded-md px-3 py-1 cursor-pointer flex justify-between items-center text-sm"
      >
        <span className={`px-2 py-0.5 rounded ${currentStatus?.bg} ${currentStatus?.text} text-xs font-semibold`}>
          {currentStatus?.label}
        </span>
        <span className="ml-2">▼</span>
      </div>

      {open && (
        <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-md w-full text-sm">
          {statusOptions.map((status) => (
            <div
              key={status.value}
              onClick={() => {
                onChange(status.value);
                setOpen(false);
              }}
              className="px-3 py-1 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
            >
              <span className={`px-2 py-0.5 rounded ${status.bg} ${status.text} text-xs font-semibold`}>
                {status.label}
              </span>
            </div>
          ))}
          <div className="border-t px-3 py-1 text-blue-500 hover:bg-gray-100 cursor-pointer">
            Create status
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;

import React, { useEffect, useRef, useState } from "react";

const StatusDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const statusOptions = [
    { label: "TO DO", value: "To Do", bg: "bg-gray-200", text: "text-gray-800" },
    { label: "IN PROGRESS", value: "In Progress", bg: "bg-blue-200", text: "text-blue-800" },
    { label: "DONE", value: "Done", bg: "bg-green-200", text: "text-green-800" },
  ];

  const currentStatus = statusOptions.find((opt) => opt.value === value);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full text-xs" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="border rounded-md px-2 py-0.5 flex items-center w-full hover:shadow-sm transition"
      >
        <span className={`px-1.5 py-0.5 rounded ${currentStatus?.bg} ${currentStatus?.text} font-medium`}>
          {currentStatus?.label}
        </span>
      </button>

      {/* Dropdown List */}
      {open && (
        <div className="absolute top-full left-0 z-20 mt-1 bg-white border rounded-md shadow-lg w-full text-xs">
          {statusOptions.map((status) => (
            <div
              key={status.value}
              onClick={() => {
                onChange(status.value);
                setOpen(false);
              }}
              className="px-2 py-1 cursor-pointer hover:bg-gray-100 flex items-center gap-1"
            >
              <span className={`px-1.5 py-0.5 rounded ${status.bg} ${status.text} font-medium`}>
                {status.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;

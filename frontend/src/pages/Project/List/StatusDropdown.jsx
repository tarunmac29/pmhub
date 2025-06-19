import React, { useEffect, useRef, useState } from "react";

const StatusDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const statusOptions = [
    { label: "TO DO", value: "To_Do", bg: "bg-gray-200", text: "text-gray-800" },
    { label: "IN PROGRESS", value: "In_Progress", bg: "bg-blue-100", text: "text-blue-700 font-semibold" },
    { label: "DONE", value: "Done", bg: "bg-green-100", text: "text-green-700" },
  ];

  const currentStatus = statusOptions.find((opt) => opt.value === value);

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
    <div className="relative w-24 text-xs" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full px-0 py-1 flex justify-center items-center bg-white"
      >
        <span
          className={`px-2 py-0.5 rounded ${currentStatus?.bg} ${currentStatus?.text} text-center w-full`}
        >
          {currentStatus?.label}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left- w-full z-30 mt-1  bg-white rounded shadow text-xs">
          {statusOptions.map((status) => (
            <div
              key={status.value}
              onClick={() => {
                onChange(status.value);
                setOpen(false);
              }}
              className="cursor-pointer px-2 py-1 hover:bg-gray-100"
            >
              <span
                className={`block w-full text-rigth px-0 py-1 rounded ${status.bg} ${status.text}`}
              >
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

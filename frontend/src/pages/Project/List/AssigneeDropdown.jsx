import React, { useState, useRef, useEffect } from "react";

const AssigneeDropdown = ({ members = [], value, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const selectedUser = members.find((m) => m.username === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full text-xs" ref={dropdownRef}>
      {/* Dropdown Toggle */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border px-3 py-1.5 rounded-md text-left hover:shadow-sm transition focus:outline-none"
      >
        {selectedUser?.username || "Select Assignee"}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white border rounded-md shadow-md max-h-48 overflow-auto transition-all duration-200 text-xs">
          {members.length === 0 ? (
            <div className="px-3 py-2 text-gray-400">No members found</div>
          ) : (
            members.map((member) => (
              <div
                key={member.userId}
                onClick={() => {
                  onChange(member.username);
                  setOpen(false);
                }}
                className="px-3 py-1.5 cursor-pointer hover:bg-gray-100 transition"
              >
                {member.username}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AssigneeDropdown;

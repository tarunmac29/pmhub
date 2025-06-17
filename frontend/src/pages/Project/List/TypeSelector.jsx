import React, { useState, useRef, useEffect } from "react";
import { FaBug, FaTasks, FaRegLightbulb, FaFlag } from "react-icons/fa";

const iconMap = {
  Epic: <FaFlag className="text-purple-600" />,
  Story: <FaRegLightbulb className="text-green-600" />,
  Task: <FaTasks className="text-blue-600" />,
  Bug: <FaBug className="text-red-600" />,
};

const TypeSelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (type) => {
    onChange(type);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <button
        type="button"
        className="border px-2 py-1 rounded-md w-full flex items-center gap-2 text-sm"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {iconMap[value]}
        <span>{value}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-md w-full z-10">
          {["Epic", "Story", "Task", "Bug"].map((type) => (
            <div
              key={type}
              onClick={() => handleSelect(type)}
              className="px-2 py-1 flex items-center gap-2 cursor-pointer hover:bg-gray-100 text-sm"
            >
              {iconMap[type]}
              <span>{type}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TypeSelector;

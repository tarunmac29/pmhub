import { useState, useRef, useEffect } from "react";

const statusStyles = {
  To_Do: "bg-gray-200 text-gray-800",
  In_Progress: "bg-blue-100 text-blue-700 font-semibold",
  Done: "bg-green-100 text-green-700",
};

const statusLabels = {
  To_Do: "TO DO",
  In_Progress: "IN PROGRESS",
  Done: "DONE",
};

const StatusDropdownMenu = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const toggleDropdown = () => setOpen(!open);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative text-xs" ref={ref}>
      <button
        onClick={toggleDropdown}
        className={`px-2 py-1 rounded ${statusStyles[value]} w-24 text-center`}
      >
        {statusLabels[value]}
      </button>
      {open && (
        <div className="absolute left-0 mt-1 bg-white border shadow rounded z-10 w-24">
          {Object.keys(statusLabels).map((status) => (
            <div
              key={status}
              onClick={() => {
                onChange(status);
                setOpen(false);
              }}
              className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${statusStyles[status]}`}
            >
              {statusLabels[status]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdownMenu;

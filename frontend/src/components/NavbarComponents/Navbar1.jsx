import React from "react";
import { FaSearch, FaPlus, FaBell, FaCog, FaQuestionCircle } from "react-icons/fa";
import { BsDiamond } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
  <>
    <header className="w-full flex items-center justify-between px-4 py-2 border-b bg-white shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="text-xl font-bold text-blue-600 flex items-center space-x-1">
          <img
            src="https://seeklogo.com/images/A/atlassian-jira-logo-C71F8C0324-seeklogo.com.png"
            alt="Jira Logo"
            className="w-6 h-6"
          />
          <span>PM-HUB</span>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="px-3 py-1 border rounded w-80 text-sm focus:outline-blue-400"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4 text-sm">
        <button className="bg-blue-600 text-white px-3 py-1 rounded flex items-center space-x-1 hover:bg-blue-700"
          onClick={() => navigate("/projects")}
        >
          <FaPlus size={12} />
          <span>New Project</span>
        </button>

        <button className="flex items-center border px-3 py-1 rounded text-blue-600 hover:border-blue-400">
          <BsDiamond className="text-purple-500 mr-1" />
          <span>Premium trial</span>
        </button>

        <div className="relative">
          <FaBell className="text-gray-600 hover:text-black cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            1
          </span>
        </div>

        <FaQuestionCircle className="text-gray-600 hover:text-black cursor-pointer" />
        <FaCog className="text-gray-600 hover:text-black cursor-pointer" />
        <img
          src="https://i.pravatar.cc/150?img=56"
          alt="User Avatar"
          className="w-8 h-8 rounded-full border"
        />
        {isLoggedIn && (
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </header>
    </>
  );
};

export default Navbar;

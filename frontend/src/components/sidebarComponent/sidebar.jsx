import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRegClock,
  FaStar,
  FaRegUserCircle,
  FaFilter,
  FaTachometerAlt,
  FaUsers,
  FaBullseye,
  FaTools,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { PiProjectorScreenChart } from "react-icons/pi";
import { HiOutlineCube } from "react-icons/hi";
import { BsListTask } from "react-icons/bs";
import RecentDropdown from "./RecentDropdown";

import StarredSection from "./StarredSection";
import { getAllProjects } from "../../api/project";

const Sidebar = () => {
  const [showRecent, setShowRecent] = useState(false);
  const [showStarred, setShowStarred] = useState(false);
  const [showPlans, setShowPlans] = useState(false); // state for toggling Plans menu
  const [collapsed, setCollapsed] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProjects()
      .then((res) => setProjects(res.data))
      .catch(() => setProjects([]));
  }, []);

  const togglePlans = () => setShowPlans((prev) => !prev);

  const toggleRecent = () => {
    setShowStarred(false);
    setShowRecent((prev) => !prev);
  };

  const toggleStarred = () => {
    setShowRecent(false);
    setShowStarred((prev) => !prev);
  };

  const handleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <aside
      className={`bg-white border-r p-4 text-sm shadow-sm relative transition-all duration-200
        ${collapsed ? "w-16" : "w-60"} min-h-screen`}
    >
      {/* Collapse/Expand Button */}
      <button
        onClick={handleCollapse}
        className="absolute -right-3 top-4 bg-indigo-600 text-white rounded-full p-1 shadow"
        style={{ zIndex: 10 }}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      <ul className="space-y-4 text-gray-700 mt-1">
        <li className="flex items-center space-x-2">
          <button
            className="flex items-center space-x-2 w-full text-left hover:bg-indigo-50 rounded px-2 py-1"
            onClick={() => navigate("/dashboard")}
          >
            <FaTachometerAlt />
            {!collapsed && <span>Dashboards</span>}
          </button>
        </li>

        {/* "For you" button */}
        <li>
          <button
            className="flex items-center space-x-2 w-full text-left hover:bg-indigo-50 rounded px-2 py-1"
            onClick={() => navigate("/foryou")}
          >
            <FaRegUserCircle />
            {!collapsed && <span>For you</span>}
          </button>
        </li>

        {/* Recent toggle */}
        <li>
          <button
            className="flex items-center space-x-2 w-full text-left hover:bg-indigo-50 rounded px-2 py-1"
            onClick={toggleRecent}
          >
            <FaRegClock />
            {!collapsed && <span>Recent</span>}
            {!collapsed && <FaChevronRight className="ml-auto" />}
          </button>
          {showRecent && !collapsed && (
            <div className="mt-2 ml-6 z-50">
              <RecentDropdown />
            </div>
          )}
        </li>

        <li>
          <button
            className="flex items-center space-x-2 w-full text-left hover:bg-indigo-50 rounded px-2 py-1"
            onClick={toggleStarred}
          >
            <FaStar />
            {!collapsed && <span>Starred</span>}
            {!collapsed && <FaChevronRight className="ml-auto" />}
          </button>
          {showStarred && !collapsed && (
            <div className="mt-2 ml-6 z-50">
              <StarredSection starredItems={[]} />
            </div>
          )}
        </li>

        <li className="flex items-center space-x-2">
          <BsListTask />
          {!collapsed && <span>Plans</span>}
        </li>

        {/* Projects */}
        <li
          className="flex items-center space-x-2 font-semibold mt-6 cursor-pointer"
          onClick={() => navigate("/projects")}
        >
          <PiProjectorScreenChart />
          {!collapsed && <span>Projects</span>}
          {!collapsed && <span className="ml-auto text-lg font-bold">+</span>}
        </li>

        {!collapsed && (
          <>
            {/* Show two projects or all if toggled */}
            {projects.length > 0 && (
              <div className="ml-6 text-blue-700 font-medium">
                {(showAllProjects ? projects : projects.slice(0, 2)).map(
                  (project) => (
                    <div
                      key={project.projectId}
                      className="text-black cursor-pointer hover:underline"
                      onClick={() => navigate(`/projectdashboard/${project.projectId}`)}
                    >
                      📁 {project.name}
                    </div>
                  )
                )}
                {projects.length > 2 && !showAllProjects && (
                  <div
                    className="text-blue-600 font-medium cursor-pointer"
                    onClick={() => setShowAllProjects(true)}
                  >
                    📂 View all projects
                  </div>
                )}
                {showAllProjects && projects.length > 2 && (
                  <div
                    className="text-blue-600 font-medium cursor-pointer"
                    onClick={() => setShowAllProjects(false)}
                  >
                    Show less
                  </div>
                )}
              </div>
            )}

          </>
        )}

        {/* Other */}
        <li className="flex items-center space-x-2 mt-6">
          <FaFilter />
          {!collapsed && <span>Filters</span>}
        </li>

        <li className="flex items-center space-x-2">
          <button
            className="flex items-center space-x-2 w-full text-left hover:bg-indigo-50 rounded px-2 py-1"
            onClick={() => navigate("/teams")}
          >
            <FaUsers />
          {!collapsed && <span>Teams</span>}
          </button>
          
        </li>
        <li className="flex items-center space-x-2">
          <FaBullseye />
          {!collapsed && <span>Goals</span>}
        </li>
        <li className="flex items-center space-x-2 text-gray-500 text-xs mt-8">
          <FaTools />
          {!collapsed && <span>Customize sidebar</span>}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

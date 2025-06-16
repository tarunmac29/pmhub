import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../api/project";
import ListView from "./List/ListView";
import SummaryView from "./Summary/SummaryView";
import {
  FaCheckCircle,
  FaClock,
  FaPlusCircle,
  FaCalendarAlt,
} from "react-icons/fa";

const TABS = [
  "Summary",
  "Timeline",
  "Board",
  "Calendar",
  "List",
  "Forms",
  "All work",
  "Code",
  "Archived work items",
];

const DashboardSummary = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState("Summary");

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId)
        .then((res) => setProject(res.data))
        .catch(() => setProject(null));
    }
  }, [projectId]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Project Title */}
      <h2 className="text-gray-700 text-sm font-medium">Project</h2>
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        {project ? project.name : "Loading..."}
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap space-x-4 border-b pb-2 mb-6 text-sm">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2 pb-1 ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conditional Rendering */}
      {activeTab === "List" && <ListView />}
      {activeTab === "Summary" && <SummaryView />}

    </div>
  );
};

export default DashboardSummary;

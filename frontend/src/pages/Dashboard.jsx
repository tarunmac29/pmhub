import React from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const projectData = [];
  const navigate = useNavigate();

  return (
    <>
      <div className="flex h-screen">
        <main className="flex-1 bg-blue-50 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-4 text-sm font-medium text-blue-900">
              {[
                "List",
                "Board",
                "Calendar",
                "Timeline",
                "Pages",
                "Forms",
                "Shortcuts",
              ].map((tab, idx) => (
                <button
                  key={idx}
                  className={`pb-1 ${
                    tab === "List"
                      ? "border-b-2 border-blue-600"
                      : "hover:text-blue-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search list"
                className="p-1 px-2 rounded border"
              />
              <button className="px-3 py-1 bg-blue-600 text-white rounded">
                Filter
              </button>
            </div>
          </div>

          {/* Table */}
          <table className="w-full bg-white shadow rounded">
            <thead className="bg-gray-100 text-gray-700 text-left text-sm">
              <tr>
                <th className="p-3">Type</th>
                <th className="p-3">Key</th>
                <th className="p-3">Summary</th>
                <th className="p-3">Status</th>
                <th className="p-3">Comments</th>
                <th className="p-3">Category</th>
                <th className="p-3">Assignee</th>
              </tr>
            </thead>
            <tbody>
              {projectData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-10 text-gray-400">
                    <p>No projects found. Click +Create to add one.</p>
                  </td>
                </tr>
              ) : (
                projectData.map((item, index) => (
                  <tr key={index} className="border-t text-sm hover:bg-gray-50">
                    <td className="p-3">{item.type}</td>
                    <td className="p-3">{item.key}</td>
                    <td className="p-3">{item.summary}</td>
                    <td className="p-3">{item.status}</td>
                    <td className="p-3">{item.comments}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{item.assignee}</td>
                  </tr>
                ))
              )}

              {/* +Create row */}
              <tr className="border-t hover:bg-gray-50 cursor-pointer">
                <td colSpan="7" className="p-3 text-blue-600 font-semibold"
                onClick={() => navigate("/projects")}
                >
                  + Create
                </td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default Dashboard;

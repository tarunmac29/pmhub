import React, { useEffect, useState } from "react";
import { getAllProjects } from "../../api/project";

const ForYouComponent = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getAllProjects()
      .then((res) => setProjects(res.data))
      .catch(() => setProjects([]));
  }, []);

  return (
    <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-2">For you</h2>

      {/* Recent Projects */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Recent projects</h3>
        <div className="flex flex-wrap gap-4">
          {projects.length === 0 ? (
            <div className="text-gray-400 text-sm">No projects found.</div>
          ) : (
            projects.map((project) => (
              <div key={project.projectId} className="bg-white border shadow-sm rounded p-4 w-72">
                <h4 className="text-sm font-semibold text-red-500">🗂 {project.name}</h4>
                <p className="text-xs text-gray-500 mb-2">{project.projectType?.replace("_", " ")}</p>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li className="hover:underline cursor-pointer">My open work items <span className="ml-1 text-xs text-gray-400">0</span></li>
                  <li className="hover:underline cursor-pointer">Done work items</li>
                </ul>
                <select className="mt-3 border rounded text-sm px-2 py-1 w-full">
                  <option>1 board ▼</option>
                </select>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b text-sm text-gray-600 mb-6 flex space-x-6">
        <button className="text-blue-600 border-b-2 border-blue-600 pb-2">Worked on</button>
        <button className="hover:text-blue-600">Viewed</button>
        <button className="hover:text-blue-600">Assigned to me <span className="text-xs text-gray-400">0</span></button>
        <button className="hover:text-blue-600">Starred</button>
        <button className="hover:text-blue-600">Boards</button>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center text-center">
        <img
          src="https://img.freepik.com/free-vector/open-box-concept-illustration_114360-5528.jpg"
          alt="Empty"
          className="w-64 mb-6"
        />
        <h4 className="text-gray-700 font-semibold mb-2">You haven’t worked on anything yet</h4>
        <p className="text-sm text-gray-500 mb-4">
          In this page, you’ll find your recently worked on work items. Get started by finding the project your team is working on.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          View all projects
        </button>
      </div>
    </main>
  );
};

export default ForYouComponent;

import React, { useState } from 'react';
import axios from 'axios';

const Project = () => {
  const [project, setProject] = useState({
    name: '',
    key: '',
    projectType: 'Team_managed', // match backend enum
    access: 'Open',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: project.name,
      projectKey: project.key,
      projectType: project.projectType,
      access: project.access,
      createdBy: {
        userId: 1,
      },
    };
    try {
      const response = await axios.post("http://localhost:8080/api/projects", payload);
      console.log("Project created successfully:", response.data);
      alert("Project created successfully!");
    } catch (error) {
      console.error("Error creating project:", error.response ? error.response.data : error.message);
      // console.error("Error creating project:", error);
      alert("Failed to create project.");
    }
  };

  return (
    <div className="max-w-auto mx-auto p-6 bg-white shadow-md rounded-lg mt-2">
      <h2 className="text-2xl font-bold mb-4">Create Project</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Name <span className="text-red-500">*</span></label>
        <input
          type="text"
          name="name"
          value={project.name}
          onChange={handleChange}
          placeholder="Try a team name, project goal, milestone..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />

        <label className="block mb-2 font-semibold">Project Type</label>
        <select
          name="projectType"
          value={project.projectType}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="Team_managed">Team-managed</option>
          <option value="Company_managed">Company-managed</option>
        </select>

        <label className="block mb-2 font-semibold">Key <span className="text-red-500">*</span></label>
        <input
          type="text"
          name="key"
          value={project.key}
          onChange={handleChange}
          placeholder="e.g., PROJ"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />

        <label className="block mb-2 font-semibold">Access <span className="text-red-500">*</span></label>
        <select
          name="access"
          value={project.access}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="Open">Open</option>
          <option value="Limited">Limited</option>
          <option value="Private">Private</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Project;

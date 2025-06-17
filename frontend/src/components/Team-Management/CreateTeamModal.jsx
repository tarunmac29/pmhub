import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateTeamModal = ({ isOpen, onClose }) => {
  const [teamName, setTeamName] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [selectedMembers, setSelectedMembers] = useState(["Tarun Machhi"]);
  const [membershipType, setMembershipType] = useState("open");
  const [people, setPeople] = useState([]);
  const [selectedProject, setSelectedProject] = useState(""); // or your projectId
  const [projects, setProjects] = useState([]); // Add this line

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/projects")
      .then((res) => setProjects(res.data))
      .catch(() => setProjects([]));
  }, []); // Fetch projects on mount

  useEffect(() => {
    if (selectedProject) {
      axios
        .get(`http://localhost:8080/api/people/by-project/${selectedProject}`)
        .then((res) => setPeople(res.data))
        .catch(() => setPeople([]));
    }
  }, [selectedProject]);

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:8080/api/teams", {
        teamName,
        projectId: selectedProject,
        memberIds: [], // Add selected member IDs if needed
      });
      onClose();
    } catch (err) {
      alert("Failed to create team");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-1">Create a team</h2>
        <p className="text-sm text-gray-600 mb-4">
          Bring everyone together with one team you can{" "}
          <span className="text-black font-medium">@mention</span>, filter, and
          assign work to.{" "}
          <a href="#" className="text-blue-600 underline">
            What’s a team?
          </a>
        </p>

        <p className="text-sm text-gray-500 mb-2">
          <span className="text-red-500">*</span> Required fields are marked with
          an asterisk
        </p>

        {/* Team name */}
        <label className="block mb-1 font-medium">
          Team name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="e.g. HR Team, Redesign Project, Team Mango"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-sm"
        />
        
        {/* Project and people selector */}
        <label className="block mb-1 font-medium">
          Select Project <span className="text-red-500">*</span>
        </label>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-sm"
        >
          <option value="">-- Select a project --</option>
          {projects.map((project) => (
            <option key={project.projectId} value={project.projectId}>
              {project.name}
            </option>
          ))}
        </select>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleCreate}
          >
            Create a team
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamModal;

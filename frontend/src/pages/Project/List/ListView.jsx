import React, { useState, useEffect } from "react";
import { FaPlus, FaFilter, FaUserCircle } from "react-icons/fa";
import TypeSelector from "./TypeSelector";
import axios from "axios";
import { useParams } from "react-router-dom";
import StatusDropdown from "./StatusDropdown"; // ✅ imported from separate file

const ListView = () => {
  const { projectId } = useParams();
  const [projectKey, setProjectKey] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [members, setMembers] = useState([]);

  const [formData, setFormData] = useState({
    type: "Task",
    key: "",
    summary: "",
    status: "To Do",
    assignee: "",
    updated: "",
    created: "",
    team: "",
    reporter: "",
  });

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const keyRes = await axios.get(`http://localhost:8080/api/projects/${projectId}/key`);
        const teamRes = await axios.get(`http://localhost:8080/api/teams/project/${projectId}/team`);

        const key = keyRes.data.projectKey;
        const teamName = teamRes.data.teamName;
        const teamId = teamRes.data.teamId;

        const membersRes = await axios.get(`http://localhost:8080/api/teams/${teamId}/members`);

        setFormData((prev) => ({
          ...prev,
          key,
          team: teamName,
        }));

        setMembers(membersRes.data);
      } catch (err) {
        console.error("Error fetching project/team/members:", err);
      }
    };

    if (showCreateForm && projectId) {
      fetchProjectData();
    }
  }, [showCreateForm, projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    console.log("Created Item:", formData);
    setShowCreateForm(false);
    setFormData({
      type: "Task",
      key: "",
      summary: "",
      status: "To Do",
      assignee: "",
      updated: "",
      created: "",
      team: "",
      reporter: "",
    });
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search list"
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-64"
          />
          <button className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-100">
            <FaFilter className="text-gray-600" />
            Filter
          </button>
        </div>
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-2xl text-gray-600" />
          <button className="text-sm px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">Group</button>
          <button className="text-sm px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">⚙️</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-md overflow-x-auto">
        {/* Header */}
        <div className="grid grid-cols-9 gap-2 px-4 py-3 border-b text-sm bg-gray-50 min-w-[1000px]">
          <div>Type</div>
          <div>Key</div>
          <div>Summary</div>
          <div>Status</div>
          <div>Assignee</div>
          <div>Updated</div>
          <div>Created</div>
          <div>Team</div>
          <div>Reporter</div>
        </div>

        {/* Create Button */}
        {!showCreateForm && (
          <div
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 hover:bg-gray-50 text-sm text-blue-600 border-b cursor-pointer flex items-center gap-2"
          >
            <FaPlus className="text-xs" />+ Create
          </div>
        )}

        {/* Create Form */}
        {showCreateForm && (
          <>
            <div className="grid grid-cols-9 gap-2 px-4 py-3 border-b text-sm bg-gray-50 min-w-[1000px]">
              <TypeSelector
                value={formData.type}
                onChange={(val) => setFormData({ ...formData, type: val })}
              />
              <input
                name="key"
                value={formData.key}
                readOnly
                onChange={handleChange}
                placeholder="Key"
                className="border px-2 py-1 rounded-md cursor-not-allowed"
              />
              <input
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Summary"
                className="border px-2 py-1 rounded-md"
              />
              <StatusDropdown
                value={formData.status}
                onChange={(val) => setFormData({ ...formData, status: val })}
              />
              <select
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                className="border px-2 py-1 rounded-md"
              >
                <option value="">Select Assignee</option>
                {members.map((member) => (
                  <option key={member.userId} value={member.username}>
                    {member.username}
                  </option>
                ))}
              </select>
              <input
                type="date"
                name="updated"
                value={formData.updated}
                onChange={handleChange}
                className="border px-2 py-1 rounded-md"
              />
              <input
                type="date"
                name="created"
                value={formData.created}
                onChange={handleChange}
                className="border px-2 py-1 rounded-md"
              />
              <input
                name="team"
                value={formData.team}
                placeholder="Team"
                className="border px-2 py-1 rounded-md bg-gray-100 cursor-not-allowed"
                readOnly
              />
              <input
                name="reporter"
                value={formData.reporter}
                onChange={handleChange}
                placeholder="Reporter"
                className="border px-2 py-1 rounded-md"
              />
            </div>

            {/* Save & Cancel */}
            <div className="flex gap-2 px-4 py-2 border-b bg-gray-50">
              <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListView;

import React, { useState, useEffect } from "react";
import { FaPlus, FaFilter, FaUserCircle } from "react-icons/fa";
import TypeSelector from "./TypeSelector";
import axios from "axios";
import { useParams } from "react-router-dom";
import StatusDropdown from "./StatusDropdown";
import AssigneeDropdown from "./AssigneeDropdown";



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
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search list"
            className="px-3 py-2 border border-gray-300 rounded-md text-xs w-64"
          />
          <button className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-xs hover:bg-gray-100">
            <FaFilter className="text-gray-600" />
            Filter
          </button>
        </div>
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-xl text-gray-600" />
          <button className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">Group</button>
          <button className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">⚙️</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-md overflow-x-full">
        {/* Header */}
        <div className="grid grid-cols-8 gap-6 px-4 py-3 border-b text-xs font-semibold bg-gray-100 min-w-full">
          <div>Type</div>
          <div>Key</div>
          <div>Summary</div>
          <div>Status</div>
          <div>Assignee</div>
          <div>Created</div>
          <div>Team</div>
          <div>Reporter</div>
        </div>

        {/* Create Button */}
        {!showCreateForm && (
          <div
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 hover:bg-gray-50 text-xs text-blue-600 border-b cursor-pointer flex items-center gap-2"
          >
            <FaPlus className="text-xs" /> Create
          </div>
        )}

        {/* Create Form */}
        {showCreateForm && (
          <>
            <div className="min-w-[1000px]">
              <div className="grid grid-cols-8 gap-4 px-4 py-3 border-b text-xs bg-white">
                <TypeSelector
                  value={formData.type}
                  onChange={(val) => setFormData({ ...formData, type: val })}
                />
                <input
                  name="key"
                  value={formData.key}
                  readOnly
                  placeholder="Key"
                  className="border px-2 py-1 rounded-md bg-gray-100 cursor-not-allowed"
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
                <AssigneeDropdown
                  members={members}
                  value={formData.assignee}
                  onChange={(val) => setFormData({ ...formData, assignee: val })}
                />
                <input
                  type="date"
                  name="created"
                  value={new Date().toISOString().split("T")[0]}
                  readOnly
                  className="border px-2 py-1 rounded-md bg-gray-100 cursor-not-allowed"
                />
                <input
                  name="team"
                  value={formData.team}
                  placeholder="Team"
                  readOnly
                  className="border px-2 py-1 rounded-md bg-gray-100 cursor-not-allowed"
                />
                <input
                  name="reporter"
                  value={formData.reporter}
                  onChange={handleChange}
                  placeholder="Reporter"
                  className="border px-2 py-1 rounded-md"
                />
              </div>

              {/* Save & Cancel Buttons */}
              <div className="flex gap-2 px-4 py-3 bg-gray-50 border-t">
                <button
                  onClick={handleCreate}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-xs"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-300 px-4 py-1.5 rounded hover:bg-gray-400 text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListView;

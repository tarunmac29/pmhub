import React, { useState } from "react";
import { FaPlus, FaFilter, FaUserCircle } from "react-icons/fa";
import TypeSelector from "./TypeSelector";

const ListView = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "Task",
    key: "",
    summary: "",
    status: "To Do",
    assignee: "",
    updated: "",
    created: "",
    team: "",
    reporter: ""
  });

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
      reporter: ""
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
        <div className="grid grid-cols-9 gap-2 px-4 py-3 border-b text-sm bg-gray-50 min-w-[1000px] overflow-visible relative">

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
            <FaPlus className="text-xs" />
            + Create
          </div>
        )}

        {/* Create Form Row */}
        {showCreateForm && (
          <>
            <div className="grid grid-cols-9 gap-2 px-4 py-3 border-b text-sm bg-gray-50 min-w-[1000px]">
              <TypeSelector value={formData.type} onChange={(val) => setFormData({ ...formData, type: val })} />
              <input name="key" value={formData.key} onChange={handleChange} placeholder="Key" className="border px-2 py-1 rounded-md" />
              <input name="summary" value={formData.summary} onChange={handleChange} placeholder="Summary" className="border px-2 py-1 rounded-md" />
              <select name="status" value={formData.status} onChange={handleChange} className="border px-2 py-1 rounded-md">
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <input name="assignee" value={formData.assignee} onChange={handleChange} placeholder="Assignee" className="border px-2 py-1 rounded-md" />
              <input type="date" name="updated" value={formData.updated} onChange={handleChange} className="border px-2 py-1 rounded-md" />
              <input type="date" name="created" value={formData.created} onChange={handleChange} className="border px-2 py-1 rounded-md" />
              <input name="team" value={formData.team} onChange={handleChange} placeholder="Team" className="border px-2 py-1 rounded-md" />
              <input name="reporter" value={formData.reporter} onChange={handleChange} placeholder="Reporter" className="border px-2 py-1 rounded-md" />
            </div>

            {/* Save & Cancel */}
            <div className="flex gap-2 px-4 py-2 border-b bg-gray-50">
              <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm">
                Save
              </button>
              <button onClick={() => setShowCreateForm(false)} className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400 text-sm">
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

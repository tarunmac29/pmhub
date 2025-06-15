import React, { useState } from "react";

const CreateTeamModal = ({ isOpen, onClose }) => {
  const [teamName, setTeamName] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [selectedMembers, setSelectedMembers] = useState(["Tarun Machhi"]);
  const [membershipType, setMembershipType] = useState("open");

  const handleCreate = () => {
    console.log({
      teamName,
      visibility,
      selectedMembers,
      membershipType,
    });
    // Implement API call logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-1">Create a team</h2>
        <p className="text-sm text-gray-600 mb-4">
          Bring everyone together with one team you can <span className="text-black font-medium">@mention</span>,
          filter, and assign work to.{" "}
          <a href="#" className="text-blue-600 underline">
            What’s a team?
          </a>
        </p>

        <p className="text-sm text-gray-500 mb-2">
          <span className="text-red-500">*</span> Required fields are marked with an asterisk
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

        {/* Visibility (placeholder dropdown) */}
        <label className="block mb-1 font-medium">Who can see your team name?</label>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-sm"
        >
          <option value="Public">Anyone in workspace</option>
          <option value="Private">Only invited people</option>
        </select>

        {/* Member list and selector */}
        <label className="block mb-1 font-medium">
          Who should be in this team? <span className="text-red-500">*</span>
        </label>
        <div className="mb-2 flex flex-wrap gap-2">
          {selectedMembers.map((member, index) => (
            <span
              key={index}
              className="bg-gray-200 text-sm px-3 py-1 rounded-full"
            >
              {member}
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Choose people"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-sm"
        />
        <p className="text-xs text-gray-500 mb-4">
          You can invite up to 50 people at once.
        </p>

        {/* Membership Control */}
        <label className="block mb-1 font-medium">Membership controls</label>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="membership"
              value="open"
              checked={membershipType === "open"}
              onChange={() => setMembershipType("open")}
            />
            <span className="ml-2 text-sm">
              Anyone can join this team without approval
            </span>
          </label>
        </div>

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

import React, { useState, useEffect } from "react";
import axios from "axios";

const AddPeopleModal = ({ isOpen, onClose }) => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teams, setTeams] = useState([]);
  const [userMap, setUserMap] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUsername, setSelectedUsername] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");

  // Fetch teams and user map when modal opens
  useEffect(() => {
    if (isOpen) {
      axios
        .get("http://localhost:8080/api/teams")
        .then((res) => setTeams(res.data))
        .catch(() => setTeams([]));

      axios
        .get("http://localhost:8080/api/users/username-email-map")
        .then((res) => setUserMap(res.data))
        .catch(() => setUserMap([]));
    }
  }, [isOpen]);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    const user = userMap.find((u) => u.userId.toString() === userId);
    if (user) {
      setSelectedUsername(user.username);
      setSelectedEmail(user.email);
    } else {
      setSelectedUsername("");
      setSelectedEmail("");
    }
  };

  const handleAdd = async () => {
    if (!selectedUserId || !selectedTeam) {
      alert("Please select a user and a team.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/teams/members/addpeople", {
        withCredentials: true,
        userId: selectedUserId,
        teamId: selectedTeam,
      });
      alert("Person added successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add person.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add people</h2>

        {/* Username dropdown */}
        <label className="block mb-1 font-medium">
          Select a Username <span className="text-red-500">*</span>
        </label>
        <select
          value={selectedUserId}
          onChange={(e) => handleUserSelect(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-sm"
        >
          <option value="">Select a username</option>
          {userMap.map((user) => (
            <option key={user.userId} value={user.userId}>
              {user.username}
            </option>
          ))}
        </select>

        {/* Email (auto-filled and disabled) */}
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="text"
          value={selectedEmail}
          disabled
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-sm bg-gray-100"
        />

        {/* Team select */}
        <label className="block mb-1 font-medium">
          Select which team they'll be added to
        </label>
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-sm"
        >
          <option value="">Select a team</option>
          {teams.map((team) => (
            <option key={team.teamId} value={team.teamId}>
              {team.teamName}
            </option>
          ))}
        </select>

        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPeopleModal;

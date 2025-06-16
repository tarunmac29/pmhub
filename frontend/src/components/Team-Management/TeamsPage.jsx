import { useState, useEffect } from "react";
import axios from "axios";

import AddPeopleModal from "./AddPeopleModal";
import CreateTeamModal from "./CreateTeamModal";
import TeamCard from "./TeamCard";

const TeamsPage = () => {
  const [isAddPeopleOpen, setIsAddPeopleOpen] = useState(false);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/teams")
      .then((res) => setTeams(res.data))
      .catch(() => setTeams([]));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/people")
      .then((res) => setPeople(res.data))
      .catch(() => setPeople([]));
  }, []);

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Modals */}
      <AddPeopleModal
        isOpen={isAddPeopleOpen}
        onClose={() => setIsAddPeopleOpen(false)}
      />
      <CreateTeamModal
        isOpen={isCreateTeamOpen}
        onClose={() => setIsCreateTeamOpen(false)}
      />

      {/* Header and Actions */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Teams</h1>
          <div className="flex space-x-2">
            
            <button
              className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-100"
              onClick={() => setIsCreateTeamOpen(true)}
            >
              Create team
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
              onClick={() => setIsAddPeopleOpen(true)}
            >
              Add people
            </button>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search teams"
          className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* People Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">People you work with</h2>
        <div className="flex flex-wrap gap-4">
          {people.length === 0 ? (
            <p className="text-gray-500">No people found</p>
          ) : (
            people.map((person) => (
              <div
                key={person.id}
                className="flex flex-col items-center p-4 border rounded-lg shadow-sm w-40"
              >
                <img
                  src={person.avatarUrl || "https://via.placeholder.com/80"}
                  alt={person.name}
                  className="w-20 h-20 rounded-full mb-2"
                />
                <p className="text-center text-sm font-medium">{person.name}</p>
                <div className="text-center text-xs text-gray-500">
                  {person.email}
                </div>
                <div className="text-center text-xs text-gray-500">
                  Project: {person.assignedProject?.name || "N/A"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Teams Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Teams</h2>
        {teams.length === 0 ? (
          <p className="text-gray-500">No teams yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => (
              <TeamCard
                key={team.teamId}
                team={team}
                onDelete={(deletedId) =>
                  setTeams((prev) => prev.filter((t) => t.teamId !== deletedId))
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;

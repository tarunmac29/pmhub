import React, { useState } from "react";
import AddPeopleModal from "./AddPeopleModal";
import CreateTeamModal from "./CreateTeamModal";

const TeamsPage = () => {
  const [isAddPeopleOpen, setIsAddPeopleOpen] = useState(false);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Modals */}
      <AddPeopleModal isOpen={isAddPeopleOpen} onClose={() => setIsAddPeopleOpen(false)} />
      <CreateTeamModal isOpen={isCreateTeamOpen} onClose={() => setIsCreateTeamOpen(false)} />

      {/* Search and Actions */}
      <div className="mb-6">
        {/* Header with buttons */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Teams</h1>
          <div className="flex space-x-2">
            <button className="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-100">
              Manage users
            </button>
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

        {/* Search box */}
        <input
          type="text"
          placeholder="Search teams"
          className="w-full md:full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* People you work with */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">People you work with</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm w-40">
            <img
              src="https://via.placeholder.com/80"
              alt="Tarun Machhi"
              className="w-20 h-20 rounded-full mb-2"
            />
            <p className="text-center text-sm font-medium">Tarun Machhi</p>
          </div>
        </div>
      </div>

      {/* Teams section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Teams</h2>
        <p className="text-gray-500">No teams yet</p>
      </div>
    </div>
  );
};

export default TeamsPage;

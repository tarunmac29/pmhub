import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaUserPlus, FaRocket } from "react-icons/fa";
import AddPeopleModal from "./AddPeopleModal"; // <-- Import the modal

const TeamManage = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [projectSummary, setProjectSummary] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isAddPeopleOpen, setIsAddPeopleOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/teams/${teamId}`)
      .then((res) => {
        setTeam(res.data);

        if (res.data.project?.projectId) {
          axios
            .get(
              `http://localhost:8080/api/projects/${res.data.project.projectId}/summary`
            )
            .then((projectRes) => setProjectSummary(projectRes.data));
        }

        axios
          .get(`http://localhost:8080/api/teams/members/${teamId}`)
          .then((res) => setTeamMembers(res.data))
          .catch((err) => console.error("Error fetching team members:", err));
      })
      .catch((err) => console.error("Error fetching team:", err));
  }, [teamId]);

  if (!team || !projectSummary) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* AddPeopleModal */}
      <AddPeopleModal
        isOpen={isAddPeopleOpen}
        onClose={() => setIsAddPeopleOpen(false)}
      />

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            {team.teamName}
          </h1>
          <p className="text-gray-500 mt-2">
            There’s no ‘description’ in team, but you could add one here.
          </p>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          onClick={() => setIsAddPeopleOpen(true)}
        >
          Add people
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Members */}
        <div className="bg-gray-50 p-5 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Members{" "}
            <span className="text-sm text-gray-500">
              ({teamMembers.length})
            </span>
          </h2>

          {teamMembers.length > 0 ? (
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div
                  key={member.userId}
                  className="flex items-center gap-3 p-3 bg-white border rounded"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${member.username}&background=random`}
                    alt={member.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{member.username}</div>
                    <div className="text-sm text-gray-500">{member.email}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 italic">No members found.</div>
          )}
        </div>

        {/* Project Summary */}
        <div className="bg-gray-50 p-5 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Where we work</h2>
          <div className="flex items-center gap-4 p-4 bg-white border rounded-xl">
            <FaRocket className="text-2xl text-indigo-500" />
            <div>
              <div className="font-semibold text-lg">{projectSummary.name}</div>
              <div className="text-sm text-gray-600">
                Key: {projectSummary.projectKey}
              </div>
              <div className="text-sm text-gray-600">
                Type: {projectSummary.projectType}
              </div>
              <div className="text-sm text-gray-600">
                Access: {projectSummary.access}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Activity */}
      <div className="mt-10 bg-gray-50 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Team activity</h2>
        <div className="text-gray-500 italic">
          There is no recent team activity.
        </div>
      </div>
    </div>
  );
};

export default TeamManage;

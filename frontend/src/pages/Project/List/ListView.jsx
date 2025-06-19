import React, { useState, useEffect } from "react";
import { FaPlus, FaFilter, FaUserCircle } from "react-icons/fa";
import TypeSelector from "./TypeSelector";
import axios from "axios";
import { useParams } from "react-router-dom";
import StatusDropdown from "./StatusDropdown";
import AssigneeDropdown from "./AssigneeDropdown";
import { FaBug, FaTasks, FaRegLightbulb, FaFlag } from "react-icons/fa";
import StatusDropdownMenu from "./StatusDropdownMenu";

const ListView = () => {
  const { projectId } = useParams();
  const [projectKey, setProjectKey] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [membersByTeam, setMembersByTeam] = useState({});
  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    type: "Task",
    key: "",
    summary: "",
    status: "To_Do",
    assignee: "",
    updated: "",
    created: "",
    team: "",
    reporter: "",
  });

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/tasks/project/${projectId}`
      );
      setTasks(res.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      type: formData.type,
      key: formData.key,
      summary: formData.summary,
      status: formData.status,
      assignee: {
        userId: formData.assignee,
      },
      created: formData.created,
      team: {
        teamId: formData.team,
      },
      project: {
        projectId: projectId,
      },
      reporter: formData.reporter,
    };

    try {
      await axios.post("http://localhost:8080/api/tasks", payload);
      alert("Task created successfully!");
      fetchTasks();
      setShowCreateForm(false);
    } catch (error) {
      console.error(
        "Error creating task",
        error.response ? error.response.data : error.message
      );
      alert("Failed to create task!");
    }
  };

  const handleInlineUpdate = async (taskId, field, value) => {
    try {
      const updatePayload =
        field === "teamId"
          ? { teamId: value }
          : field === "assigneeId"
          ? { assigneeId: value }
          : { [field]: value };

      await axios.patch(
        `http://localhost:8080/api/tasks/${taskId}`,
        updatePayload
      );
      fetchTasks();

      // If team was updated, fetch members for the new team
      if (field === "teamId") {
        if (!membersByTeam[value]) {
          const res = await axios.get(
            `http://localhost:8080/api/teams/${value}/members`
          );
          setMembersByTeam((prev) => ({ ...prev, [value]: res.data }));
        }
      }
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task!");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/teams/project/${projectId}/teams`)
      .then((res) => {
        setTeams(res.data);
      })
      .catch((err) => console.error("Error fetching teams:", err));
  }, [projectId]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const keyRes = await axios.get(
          `http://localhost:8080/api/projects/${projectId}/key`
        );
        const key = keyRes.data.projectKey;

        setFormData((prev) => ({
          ...prev,
          key,
          created: new Date().toISOString().split("T")[0],
        }));
      } catch (err) {
        console.error("Error fetching project key:", err);
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

  // Fetch all unique team members after tasks load
  useEffect(() => {
    const fetchTeamMembers = async () => {
      const uniqueTeamIds = [
        ...new Set(tasks.map((task) => task.team?.teamId).filter(Boolean)),
      ];

      for (const teamId of uniqueTeamIds) {
        if (!membersByTeam[teamId]) {
          try {
            const res = await axios.get(
              `http://localhost:8080/api/teams/${teamId}/members`
            );
            setMembersByTeam((prev) => ({
              ...prev,
              [teamId]: res.data,
            }));
          } catch (err) {
            console.error("Error fetching members for team", teamId, err);
          }
        }
      }
    };

    if (tasks.length > 0) {
      fetchTeamMembers();
    }
  }, [tasks]);

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
          <button className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">
            Group
          </button>
          <button className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">
            ⚙️
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-md overflow-x-full">
        <div className="grid grid-cols-8 gap-6 px-4 py-3 border-b text-xs font-semibold bg-gray-100 min-w-full">
          <div>Type</div>
          <div>Key</div>
          <div>Summary</div>
          <div>Status</div>
          <div>Team</div>
          <div>Assignee</div>
          <div>Created</div>
          <div>Reporter</div>
        </div>

        {tasks.map((task) => {
          const createdAt = task.created
            ? new Date(task.created).toLocaleDateString("en-GB")
            : "";

          const teamId = task.team?.teamId;
          const assignees =
            teamId && membersByTeam[teamId] ? membersByTeam[teamId] : [];

          return (
            <div
              key={task.taskId}
              className="grid grid-cols-8 gap-6 px-4 py-3 border-b text-xs min-w-full"
            >
              <div className="flex items-center gap-2">
                {
                  {
                    Epic: <FaFlag className="text-purple-600" />,
                    Story: <FaRegLightbulb className="text-green-600" />,
                    Task: <FaTasks className="text-blue-600" />,
                    Bug: <FaBug className="text-red-600" />,
                  }[task.type]
                }
                <select
                  value={task.type}
                  onChange={(e) =>
                    handleInlineUpdate(task.taskId, "type", e.target.value)
                  }
                  className="border px-1 py-0.5 rounded text-xs"
                >
                  <option value="Epic">Epic</option>
                  <option value="Story">Story</option>
                  <option value="Task">Task</option>
                  <option value="Bug">Bug</option>
                </select>
              </div>

              <div>{task.project.projectKey}</div>

              <input
                type="text"
                value={task.summary}
                onChange={(e) =>
                  handleInlineUpdate(task.taskId, "summary", e.target.value)
                }
                className="border px-1 py-0.5 rounded"
              />

              {/* <select
                value={task.status}
                onChange={(e) =>
                  handleInlineUpdate(task.taskId, "status", e.target.value)
                }
                className="border px-1 py-0.5 rounded"
              >
                <option value="To_Do">To Do</option>
                <option value="In_Progress">In Progress</option>
                <option value="Done">Done</option>
              </select> */}

              <StatusDropdownMenu
                value={task.status}
                onChange={(newStatus) =>
                handleInlineUpdate(task.taskId, "status", newStatus)
                }
              />

              <select
                value={teamId || ""}
                onChange={(e) =>
                  handleInlineUpdate(task.taskId, "teamId", e.target.value)
                }
                className="border px-1 py-0.5 rounded"
              >
                <option value="">Select Team</option>
                {teams.map((team) => (
                  <option key={team.teamId} value={team.teamId}>
                    {team.teamName}
                  </option>
                ))}
              </select>

              <select
                value={task.assignee?.userId || ""}
                onChange={(e) =>
                  handleInlineUpdate(task.taskId, "assigneeId", e.target.value)
                }
                className="border px-1 py-0.5 rounded"
              >
                <option value="">Select Assignee</option>
                {assignees.map((member) => (
                  <option key={member.userId} value={member.userId}>
                    {member.username}
                  </option>
                ))}
              </select>

              {/* <div>{task.createdAt}</div>
               */}

              <div>
                {task.createdAt
                  ? new Date(task.createdAt).toLocaleDateString("en-GB")
                  : ""}
              </div>
              <div>{task.reporter}</div>
            </div>
          );
        })}

        {!showCreateForm && (
          <div
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 hover:bg-gray-50 text-xs text-blue-600 border-b cursor-pointer flex items-center gap-2"
          >
            <FaPlus className="text-xs" /> Create
          </div>
        )}

        {showCreateForm && (
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
              <select
                name="team"
                value={formData.team}
                onChange={handleChange}
                className="border px-2 py-1 rounded-md bg-white"
              >
                <option value="">Select a team</option>
                {teams.map((team) => (
                  <option key={team.teamId} value={team.teamId}>
                    {team.teamName}
                  </option>
                ))}
              </select>
              <AssigneeDropdown
                members={membersByTeam[formData.team] || []}
                value={formData.assignee}
                onChange={(val) => setFormData({ ...formData, assignee: val })}
              />
              <input
                type="date"
                name="created"
                value={formData.created}
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

            <div className="flex gap-2 px-4 py-3 bg-gray-50 border-t">
              <button
                onClick={handleSubmit}
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
        )}
      </div>
    </div>
  );
};

export default ListView;

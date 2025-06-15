import React, { useState, useEffect } from "react";
import axios from "axios";

const AddPeopleModal = ({ isOpen, onClose }) => {
  const [emailInput, setEmailInput] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Fetch all users and projects when modal opens
  useEffect(() => {
    if (isOpen) {
      axios
        .get("http://localhost:8080/api/projects")
        .then((res) => setProjects(res.data))
        .catch(() => setProjects([]));

      axios
        .get("http://localhost:8080/api/auth/users") // <-- Your endpoint
        .then((res) => setAllUsers(res.data))
        .catch(() => setAllUsers([]));
    }
  }, [isOpen]);


  const handleUserSelect = (user) => {
    setEmailInput(user.email);
    setSelectedUser(user);
    setShowUserDropdown(false);
  };

  useEffect(() => {
  const delayDebounce = setTimeout(() => {
    if (emailInput.trim().length > 0) {
      axios
        .get(`http://localhost:8080/api/users/search-by-username?q=${emailInput}`)
        .then((res) => {
          setFilteredUsers(res.data);
          setShowUserDropdown(true);
        })
        .catch(() => {
          setFilteredUsers([]);
          setShowUserDropdown(false);
        });
    } else {
      setFilteredUsers([]);
      setShowUserDropdown(false);
    }
  }, 300); // debounce delay

  return () => clearTimeout(delayDebounce);
}, [emailInput]);


  const handleAdd = async () => {
  if (!emailInput || !selectedProject) {
    alert("Please select an email and a project.");
    return;
  }

  const selectedUser = allUsers.find(u => u.email === emailInput);
  const name = selectedUser?.username || emailInput;

  try {
    await axios.post("http://localhost:8080/api/addpeople", {
      name,
      email: emailInput,
      projectId: selectedProject,
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

        <label className="block mb-1 font-medium">
          Names or emails<span className="text-red-500">*</span>
        </label>
        <div className="relative mb-4">
          <input
            type="text"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="e.g., Maria, maria@company.com"
            className="w-full border border-gray-300 rounded px-4 py-2 text-sm"
            autoComplete="off"
            onFocus={() => {
              if (filteredUsers.length > 0) setShowUserDropdown(true);
            }}
            onBlur={() => setTimeout(() => setShowUserDropdown(false), 150)}
          />
          {showUserDropdown && filteredUsers.length > 0 && (
            <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded shadow mt-1 max-h-40 overflow-y-auto">
              {filteredUsers.map((user, idx) => (
                <li
                  key={user.email + idx}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex flex-col"
                  onClick={() => handleUserSelect(user)}
                >
                  <span className="font-medium">{user.username}</span>
                  <span className="text-gray-500 text-xs">{user.email}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        

        <label className="block mb-1 font-medium">
          Select which project they'll be added to
        </label>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 text-sm"
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.id || project.projectId} value={project.id || project.projectId}>
              {project.name}
            </option>
          ))}
        </select>

        <p className="text-xs text-gray-500 mb-4">
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="https://policies.google.com/privacy" className="underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="https://policies.google.com/terms" className="underline">
            Terms of Service
          </a>{" "}
          apply.
        </p>

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

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const TeamCard = ({ team, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/TeamManage/${team.teamId}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent navigating when clicking delete
    const confirmed = window.confirm(
      `Are you sure you want to delete the team "${team.teamName}"?`
    );
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:8080/api/teams/${team.teamId}`);
      alert("Team deleted successfully!");
      if (onDelete) onDelete(team.teamId); // Notify parent to refresh list
    } catch (error) {
      console.error("Failed to delete team:", error);
      alert("Failed to delete team.");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-full text-left bg-white p-4 border rounded shadow hover:bg-gray-50 transition cursor-pointer"
    >
      <div>
        <h3 className="font-semibold text-base">{team.teamName}</h3>
        <p className="text-sm text-gray-600">
          Project: {team.project ? team.project.name : "N/A"}
        </p>
      </div>

      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
        title="Delete Team"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default TeamCard;

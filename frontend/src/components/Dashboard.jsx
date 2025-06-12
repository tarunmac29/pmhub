import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <>
      <Navbar showAuthLinks={false} onLogout={handleLogout} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold mt-10 mb-4 text-indigo-700">Dashboard</h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
          Welcome to your dashboard! Here you can manage your projects and tasks.
        </p>
      </div>
    </>
  );
}

export default Dashboard;
import Navbar from "../components/NavbarComponents/Navbar";

function About() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return (
    <>
      <Navbar showAuthLinks={!isLoggedIn} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold mt-10 mb-4 text-indigo-700">About PMHub</h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
          PMHub is a platform designed to help you manage your projects efficiently.
          Our mission is to simplify project management for teams and individuals.
        </p>
      </div>
    </>
  );
}

export default About;
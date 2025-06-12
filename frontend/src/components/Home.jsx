import Navbar from "./Navbar";

function Home() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return (
    <>
      <Navbar showAuthLinks={!isLoggedIn} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold mt-10 mb-4 text-indigo-700">Welcome to PMHub</h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
          PMHub is your project management hub. Sign in or register to get started!
        </p>
      </div>
    </>
  );
}

export default Home;
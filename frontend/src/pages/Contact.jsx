import Navbar from "../components/NavbarComponents/Navbar";

function Contact() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return (
    <>
      <Navbar showAuthLinks={!isLoggedIn} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold mt-10 mb-4 text-indigo-700">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
          Have questions or feedback? Reach out to us at <a href="mailto:support@pmhub.com" className="text-indigo-600 underline">support@pmhub.com</a>.
        </p>
      </div>
    </>
  );
}

export default Contact;
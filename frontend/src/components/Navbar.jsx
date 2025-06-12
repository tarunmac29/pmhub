function Navbar({ showAuthLinks = true, onLogout }) {
    return (
        <nav className="bg-indigo-600 px-4 py-3">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">PMHub</div>
                <div className="space-x-6">
                    <a href="/" className="text-white hover:text-indigo-200 font-medium">HOME</a>
                    <a href="/about" className="text-white hover:text-indigo-200 font-medium">ABOUT</a>
                    <a href="/contact" className="text-white hover:text-indigo-200 font-medium">CONTACT</a>
                    {showAuthLinks ? (
                        <>
                            <a href="/login" className="text-white hover:text-indigo-200 font-medium">LOGIN</a>
                            <a href="/register" className="text-white hover:text-indigo-200 font-medium">REGISTER</a>
                        </>
                    ) : (
                        <button
                            onClick={onLogout}
                            className="text-white hover:text-indigo-200 font-medium"
                        >
                            LOGOUT
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
import React from "react";

import Sidebar from "../components/sidebarComponent/sidebar";
import Navbar1 from "../components/NavbarComponents/Navbar1";


const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar1 />

      {/* Main Body Layout */}
      <div className="flex flex-grow h-[calc(100vh-60px)]">
        {/* Sidebar (left) */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-grow overflow-auto bg-gray-50 p-6">
          {children}
        </main>

        {/* Optional Right Aside Panel */}
        <aside className="w-72 bg-white border-l p-4 hidden lg:block">
          <div className="bg-orange-100 border border-orange-300 p-4 rounded">
            <h4 className="font-semibold mb-1">💡 Jira Product Discovery</h4>
            <p className="text-sm text-gray-700 mb-3">
              Build the right features, the right way. Prioritize your ideas then move them into delivery without losing details.
            </p>
            <div className="space-x-2 text-sm">
              <button className="bg-blue-600 text-white px-3 py-1 rounded">Try it now</button>
              <button className="text-blue-600">Learn more</button>
            </div>
          </div>

            <br/>
          <div className="bg-orange-100 border border-orange-300 p-4 rounded">
            <h4 className="font-semibold mb-1">💡 Jira Product Discovery</h4>
            <p className="text-sm text-gray-700 mb-3">
              Build the right features, the right way. Prioritize your ideas then move them into delivery without losing details.
            </p>
            <div className="space-x-2 text-sm">
              <button className="bg-blue-600 text-white px-3 py-1 rounded">Try it now</button>
              <button className="text-blue-600">Learn more</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Layout;

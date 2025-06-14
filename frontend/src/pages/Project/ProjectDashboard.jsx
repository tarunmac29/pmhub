import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../api/project";
import ListView from "./List/ListView";
import SummaryView from "./Summary/SummaryView";
import {
  FaCheckCircle,
  FaClock,
  FaPlusCircle,
  FaCalendarAlt,
} from "react-icons/fa";

const TABS = [
  "Summary",
  "Timeline",
  "Board",
  "Calendar",
  "List",
  "Forms",
  "All work",
  "Code",
  "Archived work items",
];

const DashboardSummary = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState("Summary");

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId)
        .then((res) => setProject(res.data))
        .catch(() => setProject(null));
    }
  }, [projectId]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Project Title */}
      <h2 className="text-gray-700 text-sm font-medium">Project</h2>
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        {project ? project.name : "Loading..."}
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap space-x-4 border-b pb-2 mb-6 text-sm">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2 pb-1 ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conditional Rendering */}
      {activeTab === "List" && <ListView />}
      {activeTab === "Summary" && <SummaryView />}

{/*       <div className="flex flex-wrap md:flex-nowrap justify-between items-start mb-8 gap-4"> */}
{/*          */}{/* Filter Button */}
{/*         <button className="flex items-center gap-2 border px-3 py-1.5 rounded-md bg-white text-sm shadow-sm hover:bg-gray-50"> */}
{/*           <svg */}
{/*             xmlns="http://www.w3.org/2000/svg" */}
{/*             className="h-4 w-4" */}
{/*             fill="none" */}
{/*             viewBox="0 0 24 24" */}
{/*             stroke="currentColor" */}
{/*           > */}
{/*             <path */}
{/*               strokeLinecap="round" */}
{/*               strokeLinejoin="round" */}
{/*               strokeWidth={2} */}
{/*               d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z" */}
{/*             /> */}
{/*           </svg> */}
{/*           Filter */}
{/*         </button> */}

{/*          */}{/* Summary Cards */}
{/*         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-grow"> */}
{/*           {[ */}
{/*             { */}
{/*               label: "0 completed", */}
{/*               subtitle: "in the last 7 days", */}
{/*               icon: ( */}
{/*                 <svg */}
{/*                   className="w-5 h-5 text-gray-500" */}
{/*                   fill="none" */}
{/*                   stroke="currentColor" */}
{/*                   strokeWidth="1.5" */}
{/*                   viewBox="0 0 24 24" */}
{/*                 > */}
{/*                   <path */}
{/*                     strokeLinecap="round" */}
{/*                     strokeLinejoin="round" */}
{/*                     d="M5 13l4 4L19 7" */}
{/*                   /> */}
{/*                 </svg> */}
{/*               ), */}
{/*             }, */}
{/*             { */}
{/*               label: "0 updated", */}
{/*               subtitle: "in the last 7 days", */}
{/*               icon: ( */}
{/*                 <svg */}
{/*                   className="w-5 h-5 text-gray-500" */}
{/*                   fill="none" */}
{/*                   stroke="currentColor" */}
{/*                   strokeWidth="1.5" */}
{/*                   viewBox="0 0 24 24" */}
{/*                 > */}
{/*                   <path */}
{/*                     strokeLinecap="round" */}
{/*                     strokeLinejoin="round" */}
{/*                     d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" */}
{/*                   /> */}
{/*                 </svg> */}
{/*               ), */}
{/*             }, */}
{/*             { */}
{/*               label: "0 created", */}
{/*               subtitle: "in the last 7 days", */}
{/*               icon: ( */}
{/*                 <svg */}
{/*                   className="w-5 h-5 text-gray-500" */}
{/*                   fill="none" */}
{/*                   stroke="currentColor" */}
{/*                   strokeWidth="1.5" */}
{/*                   viewBox="0 0 24 24" */}
{/*                 > */}
{/*                   <path */}
{/*                     strokeLinecap="round" */}
{/*                     strokeLinejoin="round" */}
{/*                     d="M12 4v16m8-8H4" */}
{/*                   /> */}
{/*                 </svg> */}
{/*               ), */}
{/*             }, */}
{/*             { */}
{/*               label: "0 due soon", */}
{/*               subtitle: "in the next 7 days", */}
{/*               icon: ( */}
{/*                 <svg */}
{/*                   className="w-5 h-5 text-gray-500" */}
{/*                   fill="none" */}
{/*                   stroke="currentColor" */}
{/*                   strokeWidth="1.5" */}
{/*                   viewBox="0 0 24 24" */}
{/*                 > */}
{/*                   <path */}
{/*                     strokeLinecap="round" */}
{/*                     strokeLinejoin="round" */}
{/*                     d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 */}
{/*                     00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" */}
{/*                   /> */}
{/*                 </svg> */}
{/*               ), */}
{/*             }, */}
{/*           ].map(({ label, subtitle, icon }, index) => ( */}
{/*             <div */}
{/*               key={index} */}
{/*               className="flex items-center gap-3 p-3 bg-white border rounded-md" */}
{/*             > */}
{/*               <div className="flex-shrink-0">{icon}</div> */}
{/*               <div> */}
{/*                 <p className="text-sm font-medium text-gray-800">{label}</p> */}
{/*                 <p className="text-xs text-gray-500">{subtitle}</p> */}
{/*               </div> */}
{/*             </div> */}
{/*           ))} */}
{/*         </div> */}
{/*       </div> */}

{/*        */}{/* Status Overview + No Activity */}
{/*       <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
{/*          */}{/* Status Overview */}
{/*         <div className="bg-white p-5 border rounded-lg shadow-sm"> */}
{/*           <h3 className="text-lg font-semibold mb-3 text-gray-800"> */}
{/*             Status Overview */}
{/*           </h3> */}
{/*           <p className="text-sm text-gray-500 mb-4"> */}
{/*             The status overview for this project will display here after you{" "} */}
{/*             <a href="#" className="text-blue-600 underline"> */}
{/*               create some work items */}
{/*             </a> */}
{/*             . */}
{/*           </p> */}
{/*           <div className="grid grid-cols-2 gap-4 text-sm"> */}
{/*             {[ */}
{/*               { label: "To Do", color: "bg-blue-500", count: 0 }, */}
{/*               { label: "In Progress", color: "bg-yellow-500", count: 0 }, */}
{/*               { label: "In Review", color: "bg-pink-500", count: 0 }, */}
{/*               { label: "Done", color: "bg-green-500", count: 0 }, */}
{/*             ].map(({ label, color, count }, i) => ( */}
{/*               <div key={i} className="flex items-center gap-2"> */}
{/*                 <span className={`w-3 h-3 rounded-full ${color}`}></span> */}
{/*                 {label}: {count} */}
{/*               </div> */}
{/*             ))} */}
{/*           </div> */}
{/*         </div> */}

{/*          */}{/* No Activity Box */}
{/*         <div className="flex flex-col justify-center items-center bg-white p-6 border rounded-lg shadow-sm text-center"> */}
{/*           <div className="text-4xl mb-2">✅</div> */}
{/*           <p className="text-sm text-gray-600"> */}
{/*             No activity yet <br /> */}
{/*             Create a few work items and invite some teammates to your project to */}
{/*             see your project activity. */}
{/*           </p> */}
{/*         </div> */}

{/*          */}{/* Recent Activity */}
{/*          */}{/* Priority Breakdown */}
{/*         <div className="bg-white p-5 border rounded-lg shadow-sm"> */}
{/*           <h3 className="text-lg font-semibold text-gray-800 mb-1"> */}
{/*             Priority breakdown */}
{/*           </h3> */}
{/*           <p className="text-sm text-gray-500 mb-4"> */}
{/*             Get a holistic view of how work is being prioritized.{" "} */}
{/*             <a href="#" className="text-blue-600 underline"> */}
{/*               How to manage priorities for projects */}
{/*             </a> */}
{/*             . */}
{/*           </p> */}
{/*            */}{/* Placeholder for Graph */}
{/*           <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm"> */}
{/*             Priority graph placeholder */}
{/*           </div> */}
{/*         </div> */}

{/*          */}{/* Types of Work */}
{/*         <div className="bg-white p-5 border rounded-lg shadow-sm"> */}
{/*           <h3 className="text-lg font-semibold text-gray-800 mb-1"> */}
{/*             Types of work */}
{/*           </h3> */}
{/*           <p className="text-sm text-gray-500 mb-4"> */}
{/*             Create some work items to view a breakdown of total work by work */}
{/*             type.{" "} */}
{/*             <a href="#" className="text-blue-600 underline"> */}
{/*               What are work types? */}
{/*             </a> */}
{/*           </p> */}
{/*           <div className="overflow-y-auto max-h-44 pr-2"> */}
{/*             {[ */}
{/*               { label: "Epic", color: "bg-purple-600" }, */}
{/*               { label: "Task", color: "bg-blue-500" }, */}
{/*               { label: "Bug", color: "bg-red-500" }, */}
{/*               { label: "Feature", color: "bg-green-500" }, */}
{/*               { label: "Story", color: "bg-yellow-500" }, */}
{/*             ].map(({ label, color }, idx) => ( */}
{/*               <div key={idx} className="flex items-center justify-between mb-2"> */}
{/*                 <div className="flex items-center gap-2"> */}
{/*                   <span className={`w-3 h-3 rounded ${color}`}></span> */}
{/*                   <span className="text-sm text-gray-700">{label}</span> */}
{/*                 </div> */}
{/*                 <div className="bg-gray-200 h-3 rounded w-3/4"></div> */}
{/*               </div> */}
{/*             ))} */}
{/*           </div> */}
{/*         </div> */}

{/*          */}{/* Team Workload */}
{/*         <div className="bg-white p-5 border rounded-lg shadow-sm"> */}
{/*           <h3 className="text-lg font-semibold text-gray-800 mb-1"> */}
{/*             Team workload */}
{/*           </h3> */}
{/*           <p className="text-sm text-gray-500 mb-4"> */}
{/*             To monitor the capacity of your team,{" "} */}
{/*             <a href="#" className="text-blue-600 underline"> */}
{/*               create some work items */}
{/*             </a> */}
{/*             . */}
{/*           </p> */}
{/*           <div className="flex items-center gap-4"> */}
{/*             <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-600"> */}
{/*               👤 */}
{/*             </div> */}
{/*             <div className="flex-1"> */}
{/*               <p className="text-sm font-medium text-gray-700">Unassigned</p> */}
{/*               <div className="bg-gray-200 h-3 rounded w-full mt-1"></div> */}
{/*             </div> */}
{/*           </div> */}
{/*         </div> */}

{/*          */}{/* Epic Progress */}
{/*         <div className="flex flex-col justify-center items-center bg-white p-6 border rounded-lg shadow-sm text-center"> */}
{/*           <div className="mb-2"> */}
{/*             <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded"> */}
{/*               <svg */}
{/*                 className="w-6 h-6 text-gray-500" */}
{/*                 fill="currentColor" */}
{/*                 viewBox="0 0 20 20" */}
{/*               > */}
{/*                 <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11H9v2H7v2h2v2h2v-2h2v-2h-2V7z" /> */}
{/*               </svg> */}
{/*             </div> */}
{/*           </div> */}
{/*           <p className="text-sm text-gray-600"> */}
{/*             Epic progress <br /> */}
{/*             Use epics to track larger initiatives in your project.{" "} */}
{/*             <a href="#" className="text-blue-600 underline"> */}
{/*               What is an epic? */}
{/*             </a> */}
{/*           </p> */}
{/*         </div> */}
{/*       </div> */}
    </div>
  );
};

export default DashboardSummary;

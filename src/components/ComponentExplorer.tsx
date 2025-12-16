// import React, { useState } from "react";
// import AllComponents, { type Component } from "./AllComponents";
// import SelectedComponents from "./SelectedComponents";

// const ComponentExplorer: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<"selected" | "list">("list");

//   const [selectedItems, setSelectedItems] = useState<Component[]>([]);

//   return (
//     <div className="space-y-5">
//       {/* <section className="flex flex-wrap items-stretch gap-4 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 bg-white dark:bg-black">
//         <div className="flex-1 min-w-[300px]">
//           <OrganizationMapping />
//         </div>
//         <div className="flex-1 min-w-[300px]">
//           <DeploymentActions />
//         </div>
//       </section> */}

//       <section className="border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black">
//         <div className="flex border-b border-gray-300 dark:border-gray-700">
//           {[
//             { id: "selected", label: "Selected" },
//             { id: "list", label: "All Components" }
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id as "selected" | "list")}
//               className={`
//                 px-4 py-2 text-sm font-medium
//                 transition-colors
//                 ${
//                   activeTab === tab.id
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
//                 }
//               `}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         <div className="p-4">
//           {activeTab === "selected" && (
//             <SelectedComponents
//               selectedItems={selectedItems}
//               setSelectedItems={setSelectedItems}
//             />
//           )}
//           {activeTab === "list" && (
//             <AllComponents
//               selectedItems={selectedItems}
//               setSelectedItems={setSelectedItems}
//             />
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ComponentExplorer;



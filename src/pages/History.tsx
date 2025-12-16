import { Clock, RefreshCw, Search } from "lucide-react";
import React from "react";

const History: React.FC = () => {
  const logs = [
    {
      id: "1",
      type: "Deploy",
      status: "Success",
      timestamp: "2025-12-10 14:32",
      org: "RJ05 Dev Org"
    },
    {
      id: "2",
      type: "Retrieve",
      status: "Failed",
      timestamp: "2025-12-09 18:10",
      org: "Production Org"
    },
    {
      id: "3",
      type: "Deploy",
      status: "Success",
      timestamp: "2025-12-08 11:05",
      org: "RJ05 Dev Org"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Deployment & Retrieval History
        </h1>

        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="flex items-center gap-3 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 w-full max-w-md">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search history..."
          className="w-full bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200"
        />
      </div>

      {/* History List */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-md divide-y divide-gray-200 dark:divide-gray-700">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between px-4 py-3 bg-white dark:bg-black"
          >
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-blue-600 dark:text-blue-400" />

              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {log.type}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {log.org}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300">
                {log.status}
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {log.timestamp}
              </p>
            </div>
          </div>
        ))}

        {logs.length === 0 && (
          <div className="text-center py-12 text-sm text-gray-500 dark:text-gray-400">
            No history found.
          </div>
        )}
      </div>
    </div>
  );
};

export default History;

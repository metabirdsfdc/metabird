import { Building2, Gauge, History, Layers } from "lucide-react";
import React from "react";

const Dashboard: React.FC = () => {
  const cards = [
    {
      id: "1",
      label: "Total Deployments",
      value: 42,
      icon: <Layers size={22} className="text-blue-600 dark:text-blue-400" />
    },
    {
      id: "2",
      label: "Successful Deployments",
      value: 38,
      icon: <Gauge size={22} className="text-blue-600 dark:text-blue-400" />
    },
    {
      id: "3",
      label: "Failed Deployments",
      value: 4,
      icon: <History size={22} className="text-blue-600 dark:text-blue-400" />
    },
    {
      id: "4",
      label: "Connected Organizations",
      value: 2,
      icon: <Building2 size={22} className="text-blue-600 dark:text-blue-400" />
    }
  ];

  const recent = [
    {
      id: "1",
      type: "Deploy",
      status: "Success",
      org: "RJ05 Dev Org",
      time: "Today • 2:10 PM"
    },
    {
      id: "2",
      type: "Retrieve",
      status: "Failed",
      org: "Production Org",
      time: "Yesterday • 6:42 PM"
    },
    {
      id: "3",
      type: "Deploy",
      status: "Success",
      org: "RJ05 Dev Org",
      time: "2 days ago • 11:22 AM"
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Dashboard
      </h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="
              bg-white dark:bg-black
              border border-gray-300 dark:border-gray-700
              rounded-md px-4 py-3
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {card.label}
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
                  {card.value}
                </p>
              </div>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          Recent Activity
        </h2>

        <div className="divide-y divide-gray-200 dark:divide-gray-700 border border-gray-300 dark:border-gray-700 rounded-md">
          {recent.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-4 py-3 bg-white dark:bg-black"
            >
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {item.type}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {item.org}
                </p>
              </div>

              <div className="text-right">
                <span
                  className="
                    inline-block px-2 py-1 text-xs
                    border border-gray-300 dark:border-gray-600
                    rounded-md text-gray-700 dark:text-gray-300
                  "
                >
                  {item.status}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.time}
                </p>
              </div>
            </div>
          ))}

          {recent.length === 0 && (
            <div className="text-center py-12 text-sm text-gray-500 dark:text-gray-400">
              No recent activity.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

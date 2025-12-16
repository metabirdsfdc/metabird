import clsx from "clsx";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Theme from "../components/Theme";
import { useSidebarStore } from "../hooks/useSidebarStore";

const MainLayout: React.FC = () => {
  const { isOpen } = useSidebarStore();

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-black transition-colors">
      <Sidebar />

      <div
        className={clsx(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out",
          isOpen ? "ml-64" : "ml-16"
        )}
      >
        <header
          className="
            h-16 flex items-center justify-between px-6
            bg-white dark:bg-gray-900
            border-b border-gray-200 dark:border-gray-800
            shadow-sm transition-all
          "
        >
          <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
            Metabird
          </div>

          <div className="flex items-center gap-3">
            <Theme />
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

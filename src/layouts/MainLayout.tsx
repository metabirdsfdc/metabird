import clsx from "clsx";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
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
    bg-white/80 dark:bg-gray-950/80
    backdrop-blur-md
    border-b border-gray-200/60 dark:border-gray-800/60
    transition-all
  "
        >
          <div className="text-base font-semibold tracking-wide text-blue-900 dark:text-blue-900">
            Metabird
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

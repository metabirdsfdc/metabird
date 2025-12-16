import { Monitor, Moon, Palette, Smartphone, Sun } from "lucide-react";
import React, { useState } from "react";
import { useThemeStore } from "../hooks/useThemeStore";

const Personalization: React.FC = () => {
  const { theme, toggle } = useThemeStore();
  const [density, setDensity] = useState("comfortable");
  const [sidebarMode, setSidebarMode] = useState("expanded");

  const densities = ["compact", "comfortable", "spacious"];

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Personalization
      </h1>

      <section className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Palette className="text-blue-600 dark:text-blue-400" size={22} />
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Theme
          </h2>
        </div>

        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={toggle}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-white text-gray-600 dark:text-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          >
            {theme === "light" ? (
              <>
                <Moon size={16} className="text-gray-600 dark:text-white" />
                Switch to Dark
              </>
            ) : (
              <>
                <Sun size={16} className="text-gray-600 dark:text-gray-300" />
                Switch to Light
              </>
            )}
          </button>
        </div>
      </section>

      <section className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Monitor className="text-blue-600 dark:text-blue-400" size={22} />
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Interface Density
          </h2>
        </div>

        <div className="flex items-center gap-3 mt-2">
          {densities.map((d) => (
            <button
              key={d}
              onClick={() => setDensity(d)}
              className={
                density === d
                  ? "px-4 py-2 text-sm bg-blue-600 text-white rounded-md"
                  : "px-4 py-2 text-sm bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition text-gray-700 dark:text-gray-300"
              }
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Smartphone className="text-blue-600 dark:text-blue-400" size={22} />
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Sidebar Mode
          </h2>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => setSidebarMode("expanded")}
            className={
              sidebarMode === "expanded"
                ? "px-4 py-2 text-sm bg-blue-600 text-white rounded-md"
                : "px-4 py-2 text-sm bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition text-gray-700 dark:text-gray-300"
            }
          >
            Expanded
          </button>

          <button
            onClick={() => setSidebarMode("collapsed")}
            className={
              sidebarMode === "collapsed"
                ? "px-4 py-2 text-sm bg-blue-600 text-white rounded-md"
                : "px-4 py-2 text-sm bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition text-gray-700 dark:text-gray-300"
            }
          >
            Collapsed
          </button>
        </div>
      </section>

      <section className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md p-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Personalization settings are stored locally and apply only to this
          device. You can extend these options later by syncing with user
          profiles in Salesforce.
        </p>
      </section>
    </div>
  );
};

export default Personalization;

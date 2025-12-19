import clsx from "clsx";
import React, { useState } from "react";
import DeploymentActions from "../components/Actions";
import type { Component } from "../components/AllComponents";
import AllComponents from "../components/AllComponents";
import OrganizationMapping from "../components/OrganizationMapping";
import SelectedComponents from "../components/SelectedComponents";
import type { DeployResult } from "../hooks/useActions";

const Deployments: React.FC = () => {
  const [isConfigCollapsed, setIsConfigCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"selected" | "list">("list");
  const [selectedItems, setSelectedItems] = useState<Component[]>([]);
  const [results, setResults] = useState<DeployResult | null>(null);

  const handleSetResults = (results: DeployResult | null) => {
    setResults(results);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Deployments Metadata
        </h1>

        <button
          onClick={() => setIsConfigCollapsed((v) => !v)}
          className="
            text-xs px-3 py-1.5
            border border-gray-300 dark:border-gray-700
            rounded-md
            text-gray-700 dark:text-gray-300
            hover:bg-gray-100 dark:hover:bg-gray-900
            transition-colors
          "
        >
          {isConfigCollapsed ? "Show Configuration" : "Hide Configuration"}
        </button>
      </div>

      <div
        className={clsx(
          "flex flex-col lg:flex-row",
          isConfigCollapsed ? "gap-0" : "gap-6"
        )}
      >
        <div
          className={clsx(
            "transition-all duration-300 ease-in-out shrink-0 flex flex-col gap-4 h-full",
            isConfigCollapsed
              ? "w-0 opacity-0 pointer-events-none"
              : "w-full lg:w-[250px] opacity-100 pointer-events-auto"
          )}
        >
          <div className="flex-1 flex flex-col gap-4 h-full">
            <OrganizationMapping />
            <DeploymentActions
              selectedItems={selectedItems}
              result={results}
              handleSetResults={handleSetResults}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0 overflow-y-auto">
          {results && (
            <section className="mb-5 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black flex flex-col h-[300px] overflow-y-auto text-white">
              {results && (
                <pre
                  className="
      text-xs
      bg-gray-100 dark:bg-gray-900
      text-gray-900 dark:text-gray-100
      p-3
      rounded-md
      overflow-auto
      max-h-[280px]
      font-mono
      whitespace-pre-wrap
      break-words
    "
                >
                  {JSON.stringify(results, null, 2)}
                </pre>
              )}
            </section>
          )}
          <section className="border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black flex flex-col h-full">
            <div className="flex border-b border-gray-300 dark:border-gray-700">
              {[
                { id: "selected", label: "Selected" },
                { id: "list", label: "All Components" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "selected" | "list")}
                  className={clsx(
                    "px-4 py-2 text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-4 flex-1 overflow-auto">
              {activeTab === "selected" && (
                <SelectedComponents
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              )}
              {activeTab === "list" && (
                <AllComponents
                  sourceOrg=""
                  targetOrg=""
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Deployments;

import { Loader2, PlayCircle } from "lucide-react";
import React, { useEffect } from "react";
import { useActions, type DeployResult } from "../hooks/useActions";
import type { Component } from "./AllComponents";

type Props = {
  selectedItems: Component[];
  result: DeployResult | null;
  handleSetResults: (result: DeployResult | null) => void;
};

const Actions: React.FC<Props> = ({ selectedItems, handleSetResults }) => {
  const { deploy, isDeploying, result } = useActions();
  useEffect(() => {
    handleSetResults(result);
  }, [result]);
  return (
    <section
      className="
        w-full sm:w-[calc(50%-0.5rem)] lg:w-full
        bg-white dark:bg-black
        border border-gray-300 dark:border-gray-700
        rounded-md p-4 space-y-3
        transition-colors
        hover:border-gray-400 dark:hover:border-gray-600
      "
    >
      <h2 className="text-xs font-semibold text-gray-900 dark:text-gray-100">
        Deployment Actions
      </h2>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => deploy(selectedItems)}
          disabled={isDeploying}
          className="
            w-full flex items-center justify-center gap-2 px-3 py-2 text-xs
            bg-blue-600 text-white
            rounded-md
            hover:bg-blue-700
            transition-colors disabled:opacity-50
          "
        >
          {isDeploying ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <PlayCircle size={14} />
          )}
          Deploy
        </button>

        {/* <button
          onClick={() => retrieve(selectedItems)}
          disabled={isRetrieving}
          className="
            w-full flex items-center justify-center gap-2 px-3 py-2 text-xs
            border border-gray-300 dark:border-gray-700
            text-gray-700 dark:text-gray-300
            rounded-md
            hover:bg-gray-100 dark:hover:bg-gray-900
            transition-colors disabled:opacity-50
          "
        >
          {isRetrieving ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Download size={14} />
          )}
          Retrieve
        </button> */}
      </div>
    </section>
  );
};

export default Actions;

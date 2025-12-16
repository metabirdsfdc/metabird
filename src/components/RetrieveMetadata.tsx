import { FileSearch, Loader2 } from "lucide-react";
import React from "react";

type RetrieveMetadataProps = {
  loading: boolean;
  onRetrieve: () => void;
};

const RetrieveMetadata: React.FC<RetrieveMetadataProps> = ({
  loading,
  onRetrieve
}) => {
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
        Retrieve Metadata
      </h2>

      <button
        onClick={onRetrieve}
        disabled={loading}
        className="
          w-full flex items-center justify-center gap-2 px-3 py-2 text-xs
          bg-blue-600 text-white
          rounded-md
          hover:bg-blue-700
          transition-colors disabled:opacity-50
        "
      >
        {loading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <FileSearch size={14} />
        )}
        Retrieve
      </button>
    </section>
  );
};

export default RetrieveMetadata;

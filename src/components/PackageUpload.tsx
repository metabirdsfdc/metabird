import React from "react";

type PackageUploadProps = {
  file: File | null;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PackageUpload: React.FC<PackageUploadProps> = ({
  file,
  onFileSelect
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
        Package Upload
      </h2>

      <input
        type="file"
        onChange={onFileSelect}
        className="text-xs text-gray-700 dark:text-gray-300"
      />

      {file && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Selected: {file.name}
        </p>
      )}
    </section>
  );
};

export default PackageUpload;

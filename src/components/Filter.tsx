import React from "react";

type FilterProps = {
  labelName: string;
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
};

const Filter: React.FC<FilterProps> = ({
  labelName,
  placeholder,
  value = "",
  onChange
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] text-gray-500">
        {labelName}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="text-xs px-2 py-1 border rounded
          border-gray-300 dark:border-gray-700
          bg-white dark:bg-black"
      />
    </div>
  );
};

export default Filter;

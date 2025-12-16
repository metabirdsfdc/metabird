import React, { useEffect, useRef, useState } from "react";

type SearchableSelectProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "--Choose--"
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredOptions.length > 0) {
      onChange(filteredOptions[0]);
      setOpen(false);
      setSearch("");
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className="flex items-center justify-between border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1.5 bg-white dark:bg-gray-900 cursor-pointer shadow-sm hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span
          className={`text-sm ${
            value
              ? "text-gray-900 dark:text-gray-100"
              : "text-gray-400 dark:text-gray-500"
          }`}
        >
          {value || placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {open && (
        <div className="absolute z-20 w-full max-h-48 mt-1 overflow-auto border border-gray-300 dark:border-gray-700 rounded-md shadow-lg bg-white dark:bg-gray-900">
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            className="w-full px-3 py-2 text-sm border-b border-gray-200 dark:border-gray-700 focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
              No results found
            </div>
          ) : (
            filteredOptions.map((opt, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                  setSearch("");
                }}
                className="px-3 py-2 text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
              >
                {opt}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;

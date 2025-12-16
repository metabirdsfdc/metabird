import React, { useEffect, useMemo, useState } from "react";
import { buildColumns, type ComponentFilterKey } from "../services/records";
import type { Component } from "./AllComponents";
import { SelectableGridTable } from "./SelectableGridTable";

type TabAProps = {
  selectedItems: Component[];
  setSelectedItems: React.Dispatch<React.SetStateAction<Component[]>>;
};

const SelectedComponents: React.FC<TabAProps> = ({
  selectedItems,
  setSelectedItems
}) => {
  const [data, setData] = useState<Component[]>([]);
  const [filters, setFilters] = useState<
    Partial<Record<ComponentFilterKey, string>>
  >({});

  const handleFilterChange = (key: ComponentFilterKey, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredRows = useMemo(() => {
    return data.filter((row) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const cellValue = row[key as ComponentFilterKey];
        return String(cellValue ?? "")
          .toLowerCase()
          .includes(value.toLowerCase());
      })
    );
  }, [data, filters]);

  useEffect(() => {
    setData([...selectedItems]);
  }, [selectedItems]);

  const toggleSelection = (item: Component) => {
    setSelectedItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  const clearAll = () => {
    setSelectedItems([]);
    setFilters({});
  };

  return (
    <section className="border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Components Selected ({data.length})
        </p>

        {data.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs px-3 py-1.5 border rounded-md
              text-gray-700 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {data.length === 0 ? (
        <div className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400 text-center">
          No components selected.
        </div>
      ) : (
        <SelectableGridTable<Component>
          rows={filteredRows}
          columns={buildColumns(filters, handleFilterChange)}
          gridTemplate="2fr 1.2fr 1.5fr 1.5fr 120px 70px"
          onToggle={toggleSelection}
          selectedItems={selectedItems}
          isSelected={(row, selected) =>
            selected.some((i) => i.name === row.name && i.type === row.type)
          }
        />
      )}
    </section>
  );
};

export default SelectedComponents;

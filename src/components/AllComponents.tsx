import React, { useEffect, useMemo, useState } from "react";
import {
  fetchMetadataComponents,
  fetchMetadataTypes
} from "../api/types.api";
import { useOrganizationMappingStore } from "../hooks/useOrganizationMapping";
import { buildColumns, type ComponentFilterKey } from "../services/records";
import SearchableSelect from "./SearchableSelect";
import { SelectableGridTable } from "./SelectableGridTable";

export type Component = {
  id: string;
  name: string;
  type: string;
  parent?: string;
  modifiedBy: string;
  modifiedDate: string;
  manageableState: string;
  select?: boolean;
};

type TabBProps = {
  sourceOrg: string;
  targetOrg: string;
  selectedItems: Component[];
  setSelectedItems: React.Dispatch<React.SetStateAction<Component[]>>;
};

const AllComponents: React.FC<TabBProps> = ({
  selectedItems,
  setSelectedItems
}) => {
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [typeItems, setTypeItems] = useState<Component[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);

  const [filters, setFilters] = useState<
    Partial<Record<ComponentFilterKey, string>>
  >({});

  const { sourceOrg } = useOrganizationMappingStore();

  useEffect(() => {
    if (!sourceOrg) return;

    fetchMetadataTypes(sourceOrg).then(setTypes).catch(console.error);
  }, [sourceOrg]);

  useEffect(() => {
    if (!sourceOrg || !selectedType) return;

    setLoadingItems(true);

    fetchMetadataComponents(sourceOrg, selectedType)
      .then(setTypeItems)
      .catch(console.error)
      .finally(() => setLoadingItems(false));
  }, [sourceOrg, selectedType]);

  const toggleSelection = (item: Component) => {
    setSelectedItems((prev) =>
      prev.some((i) => i.name === item.name && i.type === item.type)
        ? prev.filter((i) => !(i.name === item.name && i.type === item.type))
        : [...prev, item]
    );
  };

  const handleFilterChange = (key: ComponentFilterKey, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredRows = useMemo(() => {
    return typeItems.filter((row) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const cellValue = row[key as ComponentFilterKey];
        return String(cellValue ?? "")
          .toLowerCase()
          .includes(value.toLowerCase());
      })
    );
  }, [typeItems, filters]);

  return (
    <section className="border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
            Component Types
          </p>

          <div className="w-48 min-w-[300px]">
            <SearchableSelect
              options={[...types].sort((a, b) => a.localeCompare(b))}
              value={selectedType}
              onChange={setSelectedType}
              placeholder="--Choose Type--"
            />
          </div>

          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
            Total : {typeItems.length}
          </span>
        </div>
      </div>

      {loadingItems ? (
        <div className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400 text-center">
          Loading items...
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

export default AllComponents;

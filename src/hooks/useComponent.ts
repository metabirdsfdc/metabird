import axios from "axios";
import { useEffect, useMemo, useState } from "react";

/* ======================= TYPES ======================= */

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

export type ComponentFilterKey =
  | "name"
  | "type"
  | "parent"
  | "modifiedBy"
  | "modifiedDate"
  | "manageableState";

interface UseComponentsResult {
  types: string[];
  selectedType: string;
  setSelectedType: (type: string) => void;

  items: Component[];
  filteredItems: Component[];
  loading: boolean;

  filters: Partial<Record<ComponentFilterKey, string>>;
  setFilter: (key: ComponentFilterKey, value: string) => void;
}

/* ======================= CONFIG ======================= */

const TYPES_URL = "http://localhost:8080/api/metadata/types";
const COMPONENTS_URL = "http://localhost:8080/api/metadata/components";

/* ======================= HOOK ======================= */

export const useComponents = (
  sourceOrg: string | null
): UseComponentsResult => {
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");

  const [items, setItems] = useState<Component[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState<
    Partial<Record<ComponentFilterKey, string>>
  >({});

  /* -------------------- LOAD TYPES -------------------- */
  useEffect(() => {
    if (!sourceOrg) return;

    axios
      .post<string[]>(
        TYPES_URL,
        { userId: sourceOrg, type: "" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        }
      )
      .then((res) => setTypes(res.data))
      .catch(console.error);
  }, [sourceOrg]);

  /* -------------------- LOAD COMPONENTS -------------------- */
  useEffect(() => {
    if (!sourceOrg || !selectedType) return;

    setLoading(true);

    axios
      .post<Component[]>(
        COMPONENTS_URL,
        { userId: sourceOrg, type: selectedType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        }
      )
      .then((res) => setItems(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [sourceOrg, selectedType]);

  /* -------------------- FILTERING -------------------- */
  const filteredItems = useMemo(() => {
    return items.filter((row) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const cell = row[key as ComponentFilterKey];
        return String(cell ?? "")
          .toLowerCase()
          .includes(value.toLowerCase());
      })
    );
  }, [items, filters]);

  const setFilter = (key: ComponentFilterKey, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return {
    types,
    selectedType,
    setSelectedType,

    items,
    filteredItems,
    loading,

    filters,
    setFilter
  };
};

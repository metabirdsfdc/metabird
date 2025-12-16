import type { Component } from "../components/AllComponents";
import Filter from "../components/Filter";
import type { Column } from "../components/SelectableGridTable";

export type ComponentFilterKey =
  | "name"
  | "type"
  | "parent"
  | "modifiedBy";

export const buildColumns = (
  filters: Partial<Record<ComponentFilterKey, string>>,
  onFilterChange: (key: ComponentFilterKey, value: string) => void
): Column<Component>[] => [
  {
    key: "name",
    header: (
      <Filter
        labelName="Name"
        placeholder="Name contains"
        value={filters.name ?? ""}
        onChange={(v) => onFilterChange("name", v)}
      />
    )
  },
  {
    key: "type",
    header: (
      <Filter
        labelName="Type"
        placeholder="Type"
        value={filters.type ?? ""}
        onChange={(v) => onFilterChange("type", v)}
      />
    )
  },
  {
    key: "parent",
    header: (
      <Filter
        labelName="Parent"
        placeholder="Parent contains"
        value={filters.parent ?? ""}
        onChange={(v) => onFilterChange("parent", v)}
      />
    ),
    render: (row) => row.parent || "-"
  },
  {
    key: "modifiedBy",
    header: (
      <Filter
        labelName="Modified by"
        placeholder="Modified By"
        value={filters.modifiedBy ?? ""}
        onChange={(v) => onFilterChange("modifiedBy", v)}
      />
    )
  },
  {
    key: "modifiedDate",
    header: <span className="text-center">Modified Date</span>,
    align: "center"
  },
  {
    key: "select",
    header: <span className="text-center">Select</span>,
    align: "center"
  }
];

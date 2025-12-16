import React from "react";

/** Generic column definition */
export type Column<T> = {
  key: keyof T | "select";
  header: React.ReactNode;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
};

/** Props with generic constraint */
type Props<T extends { id: string }> = {
  rows: T[];
  columns: Column<T>[];
  gridTemplate: string;
  onToggle?: (item: T) => void;
  selectedItems: T[];

  /** How to compare selected items (default: id) */
  isSelected?: (row: T, selected: T[]) => boolean;
};

export function SelectableGridTable<T extends { id: string }>({
  rows,
  columns,
  gridTemplate,
  onToggle,
  selectedItems,
  isSelected
}: Props<T>) {
  return (
    <>
      {/* Header */}
      <div
        className="grid gap-2 px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-xs"
        style={{ gridTemplateColumns: gridTemplate }}
      >
        {columns.map((col, idx) => (
          <div
            key={idx}
            className={`text-gray-500 dark:text-blue-400 ${
              col.align === "center" ? "text-center" : ""
            }`}
          >
            {col.header}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {rows.map((row) => {
          const checked = isSelected
            ? isSelected(row, selectedItems)
            : selectedItems.some((i) => i.id === row.id);

          return (
            <div
              key={row.id}
              className="grid items-center px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition"
              style={{ gridTemplateColumns: gridTemplate }}
            >
              {columns.map((col, idx) => {
                if (col.key === "select") {
                  return (
                    <div key={idx} className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggle?.(row)}
                      />
                    </div>
                  );
                }

                return (
                  <div
                    key={idx}
                    className={`text-gray-700 dark:text-gray-300 ${
                      col.align === "center"
                        ? "text-center"
                        : col.align === "right"
                        ? "text-right"
                        : ""
                    }`}
                  >
                    {col.render ? col.render(row) : String(row[col.key])}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

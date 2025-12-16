import { createSelector } from "@reduxjs/toolkit";
import { type RootState } from "../store/store";

// basic selectors
export const selectComponents = (state: RootState) =>
  state.components.components;

export const selectSelectedIds = (state: RootState) =>
  state.components.selectedIds;

// ⭐ derived selector you need
export const selectSelectedItems = createSelector(
  [selectComponents, selectSelectedIds],
  (components, selectedIds) =>
    components.filter((c) => selectedIds.includes(c.id))
);

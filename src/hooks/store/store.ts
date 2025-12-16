import { configureStore } from "@reduxjs/toolkit";
import componentsReducer from "../slices/componentsSlice";

const STORAGE_KEY = "selected_component_ids";

const loadSelectedIds = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
};

export const store = configureStore({
  reducer: {
    components: componentsReducer
  },
  preloadedState: {
    components: {
      components: [],
      selectedIds: loadSelectedIds()
    }
  }
});

// Persist ONLY IDs
store.subscribe(() => {
  const { selectedIds } = store.getState().components;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export type ComponentRow = {
  id: string; // ✅ ONLY stable identity
  name: string;
  type: string;
  parent?: string;
  modifiedBy: string;
  modifiedDate: string;
  manageableState: string;
};

export type ComponentsState = {
  components: ComponentRow[]; // source of truth
  selectedIds: string[]; // selection state
};

const initialState: ComponentsState = {
  components: [],
  selectedIds: []
};

const componentsSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    // Replace component list (API refresh, polling, etc.)
    setComponents(state, action: PayloadAction<ComponentRow[]>) {
      state.components = action.payload;

      // ⛔ Do NOT clear selection during loading
      if (action.payload.length === 0) return;

      const validIds = new Set(action.payload.map((c) => c.id));
      state.selectedIds = state.selectedIds.filter((id) => validIds.has(id));
    },
    // Toggle selection by ID
    toggleSelection(state, action: PayloadAction<string>) {
      const id = action.payload;

      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((x) => x !== id);
      } else {
        state.selectedIds.push(id);
      }
    },

    // Explicit selection (useful for bulk select)
    setSelection(state, action: PayloadAction<string[]>) {
      state.selectedIds = action.payload;
    },

    // Clear everything
    clearSelection(state) {
      state.selectedIds = [];
    }
  }
});

export const { setComponents, toggleSelection, setSelection, clearSelection } =
  componentsSlice.actions;

export default componentsSlice.reducer;

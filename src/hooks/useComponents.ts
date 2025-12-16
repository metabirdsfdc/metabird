import { create } from "zustand";
export type ComponentRow = {
  id: string;
  name: string;
  type: string;
  parent?: string;
  modifiedBy: string;
  modifiedDate: string;
  manageableState: string;
  selected: boolean;
};
export type RetrieveType = {
  name: string;
  members: string[];
};

type ComponentsState = {
  components: ComponentRow[];

  setComponents: (items: ComponentRow[]) => void;
  toggleSelection: (id: string) => void;
  addComponent: (item: ComponentRow) => void;
  removeComponent: (id: string) => void;
  clearSelection: () => void;
};

export const useComponentsStore = create<ComponentsState>((set) => ({
  components: [],

  setComponents: (items) => set({ components: items }),

  toggleSelection: (id) =>
    set((state) => ({
      components: state.components.map((c) =>
        c.id === id ? { ...c, selected: !c.selected } : c
      )
    })),

  addComponent: (item) =>
    set((state) => {
      if (state.components.some((c) => c.id === item.id)) return state;
      return { components: [...state.components, item] };
    }),

  removeComponent: (id) =>
    set((state) => ({
      components: state.components.filter((c) => c.id !== id)
    })),

  clearSelection: () =>
    set((state) => ({
      components: state.components.map((c) => ({
        ...c,
        selected: false
      }))
    }))
}));

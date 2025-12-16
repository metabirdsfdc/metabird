import { create } from "zustand";

type OrganizationMappingStore = {
  sourceOrg: string | null;
  targetOrg: string | null;

  setSource: (id: string) => void;
  setTarget: (id: string) => void;
  reset: () => void;
};

export const useOrganizationMappingStore = create<OrganizationMappingStore>(
  (set) => ({
    sourceOrg: null,
    targetOrg: null,

    setSource: (id) => set({ sourceOrg: id }),
    setTarget: (id) => set({ targetOrg: id }),
    reset: () => set({ sourceOrg: null, targetOrg: null })
  })
);

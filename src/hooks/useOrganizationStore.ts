import { create } from "zustand";

interface OrganizationUIState {
  isAddModalOpen: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;
}

export const useOrganizationStore = create<OrganizationUIState>((set) => ({
  isAddModalOpen: false,
  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false })
}));

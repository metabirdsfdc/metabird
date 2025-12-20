import { create } from "zustand";
import { organizationsApi } from "../api/organizations.api";
import type { OAuthCredRequest } from "../components/modals/AddOrganizationModal";

export interface SalesforceSession {
  userId: string;
  organizationId: string;

  sessionId: string;
  serverUrl: string;
  metadataServerUrl: string;

  sandbox: boolean;
  passwordExpired: boolean;

  userFullName: string;
  userEmail: string;
  organizationName: string;

  sessionSecondsValid: number;
}

interface OrganizationsState {
  organizationList: SalesforceSession[];
  isLoadingOrganizations: boolean;
  loadError: string | null;

  getAll: () => Promise<void>;
  read: (email: string) => Promise<SalesforceSession | null>;
  create: (session: OAuthCredRequest) => Promise<void>;
  update: (session: OAuthCredRequest) => Promise<void>;
  deleteOrg: (email: string) => Promise<void>;
}

export const useOrganizations = create<OrganizationsState>((set, get) => ({
  organizationList: [],
  isLoadingOrganizations: false,
  loadError: null,

  getAll: async () => {
    const { isLoadingOrganizations, organizationList } = get();

    if (isLoadingOrganizations || organizationList.length > 0) {
      return;
    }

    set({ isLoadingOrganizations: true, loadError: null });

    try {
      const list = await organizationsApi.getAll();

      set({
        organizationList: Array.isArray(list) ? list : [],
        loadError: null
      });
    } catch (e: any) {
      set({
        organizationList: [],
        loadError: e?.response?.data?.message ?? "Failed to load organizations"
      });
    } finally {
      set({ isLoadingOrganizations: false });
    }
  },

  read: async (email) => {
    try {
      return await organizationsApi.read(email);
    } catch {
      set({ loadError: "Read failed" });
      return null;
    }
  },

  create: async (session) => {
    set({ isLoadingOrganizations: true, loadError: null });

    try {
      await organizationsApi.create(session);
      await get().getAll();
    } catch (e: any) {
      const message =
        e?.response?.data?.message ??
        (e?.response?.status === 401 || e?.response?.status === 403
          ? "Authentication failed. Please check your credentials."
          : "Create failed");

      set({ loadError: message });
    } finally {
      set({ isLoadingOrganizations: false });
    }
  },

  update: async (session) => {
    await get().create(session);
  },

  deleteOrg: async (email) => {
    set({ isLoadingOrganizations: true, loadError: null });

    try {
      await organizationsApi.delete(email);
      set((state) => ({
        organizationList: state.organizationList.filter(
          (org) => org.userEmail !== email
        )
      }));
    } catch {
      set({ loadError: "Delete failed" });
    } finally {
      set({ isLoadingOrganizations: false });
    }
  }
}));

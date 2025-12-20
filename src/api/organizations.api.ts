import axios from "axios";
import type { OAuthCredRequest } from "../components/modals/AddOrganizationModal";
import type { SalesforceSession } from "../hooks/useOrganizations";

const baseURL = `${import.meta.env.VITE_APP_BASE_URL}/api/organizations`;

const axiosClient = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "Content-Type": "application/json"
  }
});

export const organizationsApi = {
  getAll: async (): Promise<SalesforceSession[]> => {
    const res = await axiosClient.get<SalesforceSession[]>("");
    return Array.isArray(res.data) ? res.data : [];
  },

  read: async (email: string): Promise<SalesforceSession | null> => {
    try {
      const res = await axiosClient.get<SalesforceSession>(
        `/${encodeURIComponent(email)}`
      );
      return res.data;
    } catch (e: any) {
      if (e?.response?.status === 404) return null;
      throw e;
    }
  },

  create: async (session: OAuthCredRequest): Promise<void> => {
    await axiosClient.post("", session);
  },

  delete: async (email: string): Promise<void> => {
    await axiosClient.delete(`/${encodeURIComponent(email)}`);
  }
};

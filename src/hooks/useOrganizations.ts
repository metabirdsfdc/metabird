import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import type { OAuthCredRequest } from "../components/modals/AddOrganizationModal";

/* ======================= TYPES ======================= */

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

interface UseOrganizationsResult {
  organizationList: SalesforceSession[];
  isLoadingOrganizations: boolean;
  loadError: string | null;

  getAll: () => Promise<void>;
  read: (email: string) => Promise<SalesforceSession | null>;
  create: (session: OAuthCredRequest) => Promise<void>;
  update: (session: OAuthCredRequest) => Promise<void>;
  deleteOrg: (email: string) => Promise<void>;
}

/* ======================= CONFIG ======================= */

const BASE_URL = "http://localhost:8080/api/organizations";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "Content-Type": "application/json"
  }
});

/* ======================= HOOK ======================= */

export const useOrganizations = (): UseOrganizationsResult => {
  const [organizationList, setOrganizationList] = useState<SalesforceSession[]>(
    []
  );
  const [isLoadingOrganizations, setIsLoadingOrganizations] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  /* ----------------------- GET ALL ----------------------- */
  const getAll = useCallback(async () => {
    setIsLoadingOrganizations(true);
    setLoadError(null);

    try {
      const res = await axiosClient.get<SalesforceSession[]>("");
      setOrganizationList(res.data);
    } catch (e) {
      setLoadError(
        axios.isAxiosError(e)
          ? e.response?.data?.message ?? "Failed to load organizations"
          : "Failed to load organizations"
      );
    } finally {
      setIsLoadingOrganizations(false);
    }
  }, []);

  /* ----------------------- READ ----------------------- */
  const read = useCallback(async (email: string) => {
    try {
      const res = await axiosClient.get<SalesforceSession>(
        `/${encodeURIComponent(email)}`
      );
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 404) {
        return null;
      }
      setLoadError("Read failed");
      return null;
    }
  }, []);

  /* ----------------------- CREATE ----------------------- */
  const create = useCallback(
    async (session: OAuthCredRequest) => {
      console.log("Clicked");
      setIsLoadingOrganizations(true);
      setLoadError(null);

      try {
        console.log("Clicked22");
        await axiosClient.post("", session);
        console.log("Clicked33");
        await getAll(); // refresh list
      } catch (e) {
        setLoadError("Create failed");
      } finally {
        setIsLoadingOrganizations(false);
      }
    },
    [getAll]
  );

  /* ----------------------- UPDATE ----------------------- */
  const update = useCallback(
    async (session: OAuthCredRequest) => {
      // same endpoint as create (upsert semantics)
      await create(session);
    },
    [create]
  );

  /* ----------------------- DELETE ----------------------- */
  const deleteOrg = useCallback(async (email: string) => {
    setIsLoadingOrganizations(true);
    setLoadError(null);

    try {
      await axiosClient.delete(`/${encodeURIComponent(email)}`);
      setOrganizationList((prev) =>
        prev.filter((org) => org.userEmail !== email)
      );
    } catch (e) {
      setLoadError("Delete failed");
    } finally {
      setIsLoadingOrganizations(false);
    }
  }, []);

  /* ----------------------- INITIAL LOAD ----------------------- */
  useEffect(() => {
    getAll();
  }, [getAll]);

  return {
    organizationList,
    isLoadingOrganizations,
    loadError,

    getAll,
    read,
    create,
    update,
    deleteOrg
  };
};

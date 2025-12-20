import axios from "axios";
import type { DeployResult, RetrievePayload } from "../hooks/useActions";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const axiosClient = axios.create({
  baseURL: `${BASE_URL}/api/metadata`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    "Content-Type": "application/json"
  }
});

export const deploymentsApi = {
  deploy: async (
    userId: string,
    types: RetrievePayload[]
  ): Promise<DeployResult> => {
    const res = await axiosClient.post<DeployResult>("/deployment/execute", {
      userId,
      types
    });
    return res.data;
  },

  retrieve: async (
    userId: string,
    types: RetrievePayload[]
  ): Promise<DeployResult> => {
    const res = await axiosClient.post<DeployResult>("/deployment/retrieve", {
      userId,
      types
    });
    return res.data;
  }
};

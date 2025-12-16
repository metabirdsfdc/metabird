import axios from "axios";
import { useCallback, useState } from "react";
import type { Component } from "../components/AllComponents";
import { useOrganizationMappingStore } from "./useOrganizationMapping";

export type RetrievePayload = {
  name: string;
  members: string[];
};

export type DeployResult = {
  deploymentId: string;
  status: string;
  success: boolean;
  done: boolean;

  summary?: DeploySummary;
  failures?: ComponentFailure[];
  successes?: ComponentSuccess[];
};

export type DeploySummary = {
  totalComponents: number;
  deployed: number;
  errors: number;
  testsRun: number;
  testErrors: number;
};

export type ComponentFailure = {
  fullName: string;
  type: string;
  fileName: string;
  problemType: string;
  message: string;
};

export type ComponentSuccess = {
  fullName: string;
  type: string;
  fileName: string;
  id: string;
};

export type Payload = {
  userId: string;
  types: RetrievePayload[];
};

type UseActionsResult = {
  deploy: (selectedItems: Component[]) => Promise<void>;
  retrieve: (selectedItems: Component[]) => Promise<void>;
  isDeploying: boolean;
  isRetrieving: boolean;
  result: DeployResult | null; // 👈 added
};

const buildPayload = (components: Component[]): RetrievePayload[] => {
  const grouped = new Map<string, string[]>();

  for (const component of components) {
    if (!grouped.has(component.type)) grouped.set(component.type, []);
    grouped.get(component.type)!.push(component.name);
  }

  return Array.from(grouped.entries()).map(([name, members]) => ({
    name,
    members
  }));
};

export const useActions = (): UseActionsResult => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [result, setResult] = useState<DeployResult | null>(null); // 👈 added
  const { sourceOrg } = useOrganizationMappingStore();

  const deploy = useCallback(async (selectedItems: Component[]) => {
    if (!selectedItems.length) {
      alert("Please select at least one component to deploy.");
      return;
    }

    const payload = buildPayload(selectedItems);
    setIsDeploying(true);
    setResult(null);
    console.log("Started.", payload, sourceOrg);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/metadata/retrieve_and_deploy",
        {
          userId: sourceOrg,
          types: payload
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        }
      );

      setResult(response.data);
      console.log("Deployment successful:", response.data);
    } catch (error: any) {
      console.error("Deployment failed:", error);
      setResult(error?.response?.data || error); // 👈 store error result
      alert(
        error?.response?.data?.message || "Deployment failed. Please try again."
      );
    } finally {
      setIsDeploying(false);
    }
  }, []);

  const retrieve = useCallback(async (selectedItems: Component[]) => {
    if (!selectedItems.length) {
      alert("Please select at least one component to retrieve.");
      return;
    }

    const payload = buildPayload(selectedItems);
    setIsRetrieving(true);
    setResult(null); // reset

    try {
      const response = await axios.post(
        "http://localhost:8080/api/metadata/retrieve_and_validate",
        {
          userId: sourceOrg,
          types: payload
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        }
      );
      console.log("Retrieve successful:", response.data);
      setResult(response.data); // 👈 store result
    } catch (error: any) {
      console.error("Retrieve failed:", error);
      setResult(error?.response?.data || error); // 👈 store error result
      alert(
        error?.response?.data?.message || "Retrieve failed. Please try again."
      );
    } finally {
      setIsRetrieving(false);
    }
  }, []);

  return {
    deploy,
    retrieve,
    isDeploying,
    isRetrieving,
    result // 👈 returned
  };
};

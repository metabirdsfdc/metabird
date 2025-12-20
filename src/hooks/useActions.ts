import { useCallback, useState } from "react";
import type { Component } from "../components/AllComponents";
import { useOrganizationMappingStore } from "./useOrganizationMapping";
import { deploymentsApi } from "../api/deployments.api";

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

// type UseActionsResult = {
//   deploy: (selectedItems: Component[]) => Promise<void>;
//   retrieve: (selectedItems: Component[]) => Promise<void>;
//   isDeploying: boolean;
//   isRetrieving: boolean;
//   result: DeployResult | null;
// };

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

export const useActions = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [result, setResult] = useState<DeployResult | null>(null);

  const { sourceOrg, targetOrg } = useOrganizationMappingStore();

  const deploy = useCallback(
    async (selectedItems: Component[]) => {
      if (!selectedItems.length) {
        alert("Please select at least one component to deploy.");
        return;
      }

      const payload = buildPayload(selectedItems);

      setIsDeploying(true);
      setResult(null);

      try {
        const res = await deploymentsApi.deploy(targetOrg!, payload);
        setResult(res);
        console.log("Deployment successful:", res);
      } catch (error: any) {
        console.error("Deployment failed:", error);
        setResult(error?.response?.data || null);

        alert(
          error?.response?.data?.message ||
            "Deployment failed. Please try again."
        );
      } finally {
        setIsDeploying(false);
      }
    },
    [targetOrg]
  );

  const retrieve = useCallback(
    async (selectedItems: Component[]) => {
      if (!selectedItems.length) {
        alert("Please select at least one component to retrieve.");
        return;
      }

      const payload = buildPayload(selectedItems);

      setIsRetrieving(true);
      setResult(null);

      try {
        const res = await deploymentsApi.retrieve(sourceOrg!, payload);
        setResult(res);
        console.log("Retrieve successful:", res);
      } catch (error: any) {
        console.error("Retrieve failed:", error);
        setResult(error?.response?.data || null);

        alert(
          error?.response?.data?.message || "Retrieve failed. Please try again."
        );
      } finally {
        setIsRetrieving(false);
      }
    },
    [sourceOrg]
  );

  return {
    deploy,
    retrieve,
    isDeploying,
    isRetrieving,
    result
  };
};

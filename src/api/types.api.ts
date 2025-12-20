import axios from "axios";

export type Component = {
  id: string;
  name: string;
  type: string;
  parent?: string;
  modifiedBy: string;
  modifiedDate: string;
  manageableState: string;
  select?: boolean;
};

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const fetchMetadataTypes = async (userId: string): Promise<string[]> => {
  const res = await axios.post<string[]>(
    `${BASE_URL}/api/metadata/types`,
    { userId, type: "" },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    }
  );

  return res.data;
};

export const fetchMetadataComponents = async (
  userId: string,
  type: string
): Promise<Component[]> => {
  const res = await axios.post<Component[]>(
    `${BASE_URL}/api/metadata/components`,
    { userId, type },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    }
  );

  return res.data;
};

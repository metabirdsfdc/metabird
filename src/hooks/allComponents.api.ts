import axios from "axios";

/* ======================= TYPES ======================= */

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

/* ======================= CONFIG ======================= */

const BASE_URL = "http://localhost:8080/api/metadata";

/* ======================= API CALLS ======================= */

export const fetchMetadataTypes = async (userId: string): Promise<string[]> => {
  console.log("Hello");
  const res = await axios.post<string[]>(
    `${BASE_URL}/types`,
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
    `${BASE_URL}/components`,
    { userId, type },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    }
  );

  return res.data;
};

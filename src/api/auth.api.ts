import axios from "axios";

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
    roles: string[];
  };
};

export const BASE_URL = "https://metabird-backend.onrender.com/api/auth";

export const loginApi = async (payload: {
  username: string;
  password: string;
}): Promise<AuthResponse> => {
  const { data } = await axios.post(`${BASE_URL}/login`, {
    authType: "login",
    ...payload
  });
  return data;
};

export const signupApi = async (payload: {
  fullName: string;
  username: string;
  password: string;
}): Promise<AuthResponse> => {
  const { data } = await axios.post(`${BASE_URL}/login`, {
    authType: "signup",
    ...payload
  });
  return data;
};

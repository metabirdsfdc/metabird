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

const BASE_URL = "http://localhost:8080/api/auth/user_auth";

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

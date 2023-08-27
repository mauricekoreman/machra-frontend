import axios from "axios";
import { accessTokenKey } from "../contants";
import { Role } from "../components/state/auth/auth.provider";

// @ts-ignore Property 'env' does not exist on type 'ImportMeta'
const API_URL = `${import.meta.env.VITE_BASE_URL}/auth`;

export interface ILogin {
  username?: string | null;
  password: string;
}

export async function httpSignin(userData: ILogin) {
  if (!userData.username) {
    userData.username = "Machraan";
  }

  const response = await axios.post(`${API_URL}/signin`, userData);
  localStorage.setItem(accessTokenKey, response.data.accessToken);
  return response.data.roles;
}

export interface ICreateNewUser {
  username: string;
  password: string;
  roles: Role[];
}

export async function httpCreateUser(userData: ICreateNewUser) {
  const accessToken = localStorage.getItem(accessTokenKey);
  await axios.post(`${API_URL}/admin/create-user`, userData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

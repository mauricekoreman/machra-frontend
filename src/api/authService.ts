import axios from "axios";
import { accessTokenKey } from "../contants";
import { Role } from "../components/state/auth/auth.provider";

const API_URL = "http://localhost:3000/auth";

export interface ILogin {
  username?: string | null;
  password: string;
}

export async function httpSignin(userData: ILogin) {
  if (!userData.username) {
    userData.username = "Machraan";
  }

  try {
    const response = await axios.post(`${API_URL}/signin`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    sessionStorage.setItem(accessTokenKey, response.data.accessToken);
    return { data: response.data.roles };
  } catch (error: any) {
    if (!error.response) {
      return {
        error: { message: "Internal server error", code: 500 },
      };
    }

    return {
      error: { message: error.response.data.message, code: error.response.data.statusCode },
    };
  }
}

export interface ICreateNewUser {
  username: string;
  password: string;
  roles: Role[];
}

export async function httpCreateUser(userData: ICreateNewUser) {
  try {
    await axios.post(`${API_URL}/admin/create-user`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    if (!error.response) {
      return {
        error: { message: "Internal server error", code: 500 },
      };
    }

    return {
      error: { message: error.response.data.message, code: error.response.data.statusCode },
    };
  }
}

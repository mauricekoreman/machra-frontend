import axios from "axios";

const API_URL = "http://localhost:3000/auth";

export interface ILogin {
  username?: string | null;
  password: string;
}

interface ILoginPromise {
  data?: string | undefined;
  error?: string;
}

export async function httpSignin(userData: ILogin): Promise<ILoginPromise> {
  if (!userData.username) {
    userData.username = "Machraan";
  }

  try {
    const response = await axios.post(`${API_URL}/signin`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data) {
      localStorage.setItem("MACHRA_USER_TOKEN", response.data.accessToken);

      return { data: response.data.accessToken };
    } else {
      throw new Error();
    }
  } catch (error: any) {
    return { error: error.response.data.message };
  }
}

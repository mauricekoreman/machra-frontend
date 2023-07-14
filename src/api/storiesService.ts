import axios from "axios";
import { Verhaal } from "../components/routes/verhalen/verhalen.component";

const API_URL = "http://localhost:3000/stories";

interface HttpGetStories {
  token: string;
  params?: {
    active?: boolean;
    search?: string;
    date1?: number;
    date2?: number;
  };
}

export type GetStoriesParams = HttpGetStories["params"];

export async function httpGetStories({ token, params = {} }: HttpGetStories) {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: params,
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return { data: response.data as Verhaal[] };
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

export interface PostVerhaal {
  title: string;
  description: string;
  active: boolean;
  year_of_story: number;
}

export async function httpPostStory(token: string, story: PostVerhaal) {
  try {
    const response = await axios.post(`${API_URL}`, story, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return { data: response.data as Verhaal };
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

import axios from "axios";
import { Verhaal } from "../components/routes/verhalen/verhalen.component";
import { accessTokenKey } from "../contants";

// const API_URL = "http://localhost:3000/stories";
// @ts-ignore Property 'env' does not exist on type 'ImportMeta'
const API_URL = `${import.meta.env.VITE_BASE_URL}/stories`;

export async function httpGetStoryById(id: string) {
  const accessToken = sessionStorage.getItem(accessTokenKey);
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
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

interface HttpGetStories {
  token?: string;
  params?: {
    active?: boolean;
    search?: string;
    date1?: number;
    date2?: number;
  };
}

export type GetStoriesParams = HttpGetStories["params"];

export async function httpGetStories({ params = {} }: HttpGetStories) {
  const accessToken = sessionStorage.getItem(accessTokenKey);
  try {
    const response = await axios.get(`${API_URL}`, {
      params: params,
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
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

export async function httpPostStory(story: PostVerhaal) {
  const accessToken = sessionStorage.getItem(accessTokenKey);
  try {
    const response = await axios.post(`${API_URL}`, story, {
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
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

type UpdateVerhaal = Partial<PostVerhaal>;

export async function httpPatchStory(story: UpdateVerhaal, storyId: string) {
  const accessToken = sessionStorage.getItem(accessTokenKey);
  try {
    const response = await axios.patch(`${API_URL}/${storyId}`, story, {
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
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

export async function httpDeleteStory(storyId: string) {
  const accessToken = sessionStorage.getItem(accessTokenKey);
  try {
    const response = await axios.delete(`${API_URL}/${storyId}`, {
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    });

    return { data: response };
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

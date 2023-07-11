import axios from "axios";
import { Verhaal } from "../components/routes/verhalen/verhalen.component";

const API_URL = "http://localhost:3000/stories";

export async function httpGetStories(token: string) {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });

    if (response.data) {
      return { data: response.data as Verhaal[] };
    } else {
      throw new Error();
    }
  } catch (error: any) {
    return { error: error.response.data.message };
  }
}

export interface PostVerhaal {
  titel: string;
  desc: string;
  active: boolean;
  year_of_story: number;
}

export async function httpPostStory(token: string, story: PostVerhaal) {
  try {
    const response = await axios.post(`${API_URL}`, story, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });

    if (response.data) {
      return { data: response.data as Verhaal };
    } else {
      throw new Error();
    }
  } catch (error: any) {
    return { error: error.response.data.message };
  }
}

import axios from "axios";
import { Verhaal } from "../components/routes/verhalen/verhalen.component";
import { accessTokenKey } from "../contants";

// @ts-ignore Property 'env' does not exist on type 'ImportMeta'
const API_URL = `${import.meta.env.VITE_BASE_URL}/stories`;

export async function httpGetStoryById(id: string) {
  const accessToken = localStorage.getItem(accessTokenKey);
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data as Verhaal;
}

interface HttpGetStories {
  token?: string;
  params?: {
    active?: boolean;
    search?: string;
    date1?: number;
    date2?: number;
    limit?: number;
    page?: number;
  };
}

export type GetStoriesParams = HttpGetStories["params"];

export interface HttpGetStoriesResponse {
  currentPage: number;
  items: Verhaal[];
  totalItems: number;
  totalPages: number;
}

export async function httpGetStories({ params = {} }: HttpGetStories) {
  const accessToken = localStorage.getItem(accessTokenKey);
  const response = await axios.get(API_URL, {
    params: params,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data as {
    currentPage: number;
    items: Verhaal[];
    totalItems: number;
    totalPages: number;
  };
}

export interface PostVerhaal {
  title: string;
  description: string;
  active: boolean;
  year_of_story: number;
}

export async function httpPostStory(story: PostVerhaal) {
  const accessToken = localStorage.getItem(accessTokenKey);
  const response = await axios.post(`${API_URL}`, story, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data as Verhaal;
}

type UpdateVerhaal = Partial<PostVerhaal>;

export async function httpPatchStory({
  story,
  storyId,
}: {
  story: UpdateVerhaal;
  storyId: string;
}) {
  const accessToken = localStorage.getItem(accessTokenKey);
  const response = await axios.patch(`${API_URL}/${storyId}`, story, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data as Verhaal;
}

export async function httpDeleteStory(storyId: string) {
  const accessToken = localStorage.getItem(accessTokenKey);
  const response = await axios.delete(`${API_URL}/${storyId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
}

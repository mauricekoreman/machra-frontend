import axios from "axios";
import { accessTokenKey } from "../contants";

export interface Verhaal {
  id: string;
  title: string;
  description: string;
  year_of_story: number;
  created_at: string;
  isReviewed: boolean;
}

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
    search?: string;
    date1?: number;
    date2?: number;
    withAlwaysActiveStories?: boolean;
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
  return response.data as HttpGetStoriesResponse;
}

export interface HttpGetStoriesAdmin {
  isReviewed: boolean;
}

export async function httpGetStoriesAdmin(params: HttpGetStoriesAdmin) {
  const accessToken = localStorage.getItem(accessTokenKey);
  const response = await axios.get(`${API_URL}/manager`, {
    params: params,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data as Verhaal[];
}

export type PostVerhaal = Pick<Verhaal, "title" | "description" | "year_of_story">;

export async function httpPostStory(story: PostVerhaal) {
  const accessToken = localStorage.getItem(accessTokenKey);
  const response = await axios.post(`${API_URL}`, story, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data as Verhaal;
}

type UpdateVerhaal = Partial<Verhaal>;

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

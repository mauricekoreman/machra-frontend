import { useInfiniteQuery } from "@tanstack/react-query";
import { httpGetStories } from "../api/storiesService";
import { AxiosError } from "axios";
import { useAuthDispatch } from "../components/state/auth/auth.provider";

export const useInfiniteVerhalen = () => {
  const authDispatch = useAuthDispatch();

  return useInfiniteQuery({
    queryKey: ["infinite-verhalen"],
    staleTime: 60000,
    queryFn: async ({ pageParam = 1 }) => {
      return await httpGetStories({ params: { page: pageParam, limit: 10 } });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage === undefined || lastPage.currentPage === lastPage.totalPages) {
        return undefined;
      }
      return lastPage.currentPage + 1;
    },
    retry: (failureCount, error) => {
      if ((error as AxiosError).response?.status === 401) {
        authDispatch({ type: "signout" });
        return false;
      }
      return failureCount < 3 ? true : false;
    },
  });
};

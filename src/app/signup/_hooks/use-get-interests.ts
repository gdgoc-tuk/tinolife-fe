import { api } from "@/lib/ky";
import type { PaginationResponse } from "@/models/api";
import { calculatePagination } from "@/utils";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import type { HTTPError } from "ky";

interface InterestProps {
  name: string;
  id: number;
  is_active: boolean;
  created_at: string;
}

type GetInterestsResponse = PaginationResponse<{ items: InterestProps[] }>;

const getInterests = async (page: number): Promise<GetInterestsResponse> => {
  return api
    .get("interests", {
      searchParams: {
        page,
        size: 20,
      },
    })
    .json();
};

const useGetInterests = () => {
  return useSuspenseInfiniteQuery<
    GetInterestsResponse,
    HTTPError,
    InterestProps[],
    string[],
    number
  >({
    queryKey: ["interests"],
    queryFn: ({ pageParam }) => getInterests(pageParam),
    getNextPageParam: calculatePagination,
    initialPageParam: 1,
    select: (data) => data.pages.flatMap((page) => page.items),
  });
};

export { useGetInterests, type GetInterestsResponse };

import { api } from "@/lib/ky";
import { useSuspenseQuery } from "@tanstack/react-query";

import type { HTTPError } from "ky";

interface RecentQuestionProps {
  id: number;
  title: string;
  content_preview: string;
  category: {
    name: string;
    display_order: number;
    id: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
  major: {
    name: string;
    code: string;
    id: number;
    is_active: boolean;
    created_at: string;
  };
  tags: {
    name: string;
    id: number;
    usage_count: number;
    is_active: boolean;
    is_official: boolean;
    created_at: string;
  }[];
  bounty: number;
  interest_count: number;
  answer_count: number;
  view_count: number;
  created_at: string;
  is_accepted: boolean;
}

type GetRecentQuestionsResponse = {
  questions: RecentQuestionProps[];
  total: number;
};

const getRecentQuestions = async (limit: number): Promise<GetRecentQuestionsResponse> => {
  return api
    .get("home/recent-questions", {
      searchParams: {
        limit,
      },
    })
    .json();
};

const useGetRecentQuestions = (limit: number = 10) => {
  return useSuspenseQuery<GetRecentQuestionsResponse, HTTPError>({
    queryKey: ["recent-questions"],
    queryFn: () => getRecentQuestions(limit),
  });
};

export { useGetRecentQuestions, type GetRecentQuestionsResponse, type RecentQuestionProps };

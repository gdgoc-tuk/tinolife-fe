import { api } from "@/lib/ky";
import { useSuspenseQuery } from "@tanstack/react-query";

import type { HTTPError } from "ky";

interface MajorProps {
  name: string;
  code: string | null;
  id: number;
  is_active: boolean;
  created_at: string;
}

type GetMajorsResponse = MajorProps[];

const getMajors = async (): Promise<GetMajorsResponse> => {
  return api.get("users/majors").json();
};

const useGetMajors = () => {
  return useSuspenseQuery<GetMajorsResponse, HTTPError>({
    queryKey: ["majors"],
    queryFn: getMajors,
  });
};

export { useGetMajors, type GetMajorsResponse };

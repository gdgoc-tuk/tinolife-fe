import { api } from "@/lib/ky";
import type { BaseResponse } from "@/models/api";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import type { HTTPError } from "ky";

interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
  grade: number;
  major_id: number;
  interest_ids: number[];
  privacy_policy_agreed: boolean;
}

interface SignupResponse {
  id: number;
  email: string;
  nickname: string;
}

const signup = async (request: SignupRequest): Promise<BaseResponse<SignupResponse>> => {
  return api.post("auth/signup", { json: request }).json();
};

const useSignup = (
  options?: UseMutationOptions<BaseResponse<SignupResponse>, HTTPError, SignupRequest>
) => {
  return useMutation<BaseResponse<SignupResponse>, HTTPError, SignupRequest>({
    mutationFn: signup,
    ...options,
  });
};

export { useSignup, type SignupRequest, type SignupResponse };

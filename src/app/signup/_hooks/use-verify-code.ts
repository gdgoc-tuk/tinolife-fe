import { api } from "@/lib/ky";
import type { BaseResponse } from "@/models/api";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import type { HTTPError } from "ky";

interface VerifyCodeRequest {
  email: string;
  code: string;
}

interface VerifyCodeResponse {
  verified: boolean;
}

const verifyCode = async (
  request: VerifyCodeRequest
): Promise<BaseResponse<VerifyCodeResponse>> => {
  return api.post("auth/verify-code", { json: request }).json();
};

const useVerifyCode = (
  options?: UseMutationOptions<BaseResponse<VerifyCodeResponse>, HTTPError, VerifyCodeRequest>
) => {
  return useMutation<BaseResponse<VerifyCodeResponse>, HTTPError, VerifyCodeRequest>({
    mutationFn: verifyCode,
    ...options,
  });
};

export { useVerifyCode, type VerifyCodeRequest, type VerifyCodeResponse };

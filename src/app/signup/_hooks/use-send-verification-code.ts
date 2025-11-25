import { api } from "@/lib/ky";
import type { BaseResponse } from "@/models/api";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import type { HTTPError } from "ky";

interface SendVerificationCodeRequest {
  email: string;
}

interface SendVerificationCodeResponse {
  expires_in_minutes: number;
  resend_count: number;
  max_resend_count: number;
}

const sendVerificationCode = async (
  request: SendVerificationCodeRequest
): Promise<BaseResponse<SendVerificationCodeResponse>> => {
  return api.post("auth/send-verification-code", { json: request }).json();
};

const useSendVerificationCode = (
  options?: UseMutationOptions<
    BaseResponse<SendVerificationCodeResponse>,
    HTTPError,
    SendVerificationCodeRequest
  >
) => {
  return useMutation<
    BaseResponse<SendVerificationCodeResponse>,
    HTTPError,
    SendVerificationCodeRequest
  >({
    mutationFn: sendVerificationCode,
    ...options,
  });
};

export {
  useSendVerificationCode,
  type SendVerificationCodeRequest,
  type SendVerificationCodeResponse,
};

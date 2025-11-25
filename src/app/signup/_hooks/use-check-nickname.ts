import { api } from "@/lib/ky";
import type { BaseResponse } from "@/models/api";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import type { HTTPError } from "ky";

interface CheckNicknameRequest {
  nickname: string;
}

interface CheckNicknameResponse {
  available: boolean;
}

const checkNickname = async (
  request: CheckNicknameRequest
): Promise<BaseResponse<CheckNicknameResponse>> => {
  return api.get("users/check-nickname", { searchParams: { nickname: request.nickname } }).json();
};

const useCheckNickname = (
  options?: UseMutationOptions<BaseResponse<CheckNicknameResponse>, HTTPError, CheckNicknameRequest>
) => {
  return useMutation<BaseResponse<CheckNicknameResponse>, HTTPError, CheckNicknameRequest>({
    mutationFn: checkNickname,
    ...options,
  });
};

export { useCheckNickname, type CheckNicknameRequest, type CheckNicknameResponse };

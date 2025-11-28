import { api } from "@/lib/ky";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import type { HTTPError } from "ky";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user_id: number;
}

const login = async (request: LoginRequest): Promise<LoginResponse> => {
  return api.post("auth/login", { json: request }).json();
};

const useLogin = (options?: UseMutationOptions<LoginResponse, HTTPError, LoginRequest>) => {
  return useMutation<LoginResponse, HTTPError, LoginRequest>({
    mutationFn: login,
    ...options,
  });
};

export { useLogin, type LoginRequest, type LoginResponse };

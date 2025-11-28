import { redirect, RedirectType } from "next/navigation";

import type { LoginResponse } from "@/app/login/_hooks/use-login";
import { getCookie, removeCookie, setCookie } from "@/utils/cookie";

import ky from "ky";

import { useUserStore } from "../zustand/user";

// 토큰 갱신 락 및 Promise 관리
let refreshPromise: Promise<string> | null = null;
let isRefreshing = false;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
const TIMEOUT = 10000;

const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  // 이미 refresh 중이면 기존 Promise 반환
  if (refreshPromise) {
    return refreshPromise;
  }

  // refresh 시작
  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const refreshResponse = await ky
        .post<Omit<LoginResponse, "user_id">>(API_BASE_URL + "/auth/refresh", {
          json: { refresh_token: refreshToken },
        })
        .json();
      useUserStore.getState().updateToken(refreshResponse.access_token);
      await setCookie("refresh_token", refreshResponse.refresh_token);
      return refreshResponse.access_token;
    } catch (error) {
      console.error("Refresh 실패", error);
      useUserStore.getState().reset();
      await removeCookie("refresh_token");
      redirect("/login", RedirectType.replace);
    } finally {
      // refresh 완료 후 상태 초기화
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

export const api = ky.extend({
  prefixUrl: API_BASE_URL,
  credentials: "include",
  timeout: TIMEOUT,
  retry: {
    limit: 2,
    methods: ["get", "post", "put", "patch", "delete"],
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        // refresh 중이면 완료될 때까지 대기
        if (isRefreshing && refreshPromise) {
          await refreshPromise;
        }

        const user = useUserStore.getState().user;
        if (user) {
          request.headers.set("Authorization", `bearer ${user.access_token}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        // 응답 처리 로직 (예: 토큰 갱신)
        if (response.status === 401) {
          const refreshToken = await getCookie("refresh_token");

          if (refreshToken) {
            // 토큰 갱신 (이미 진행 중이면 기존 Promise 사용)
            const newAccessToken = await refreshAccessToken(refreshToken);

            // 새로운 토큰으로 기존 요청 재시도
            request.headers.set("Authorization", `bearer ${newAccessToken}`);
            return ky(request);
          }
        }

        return response;
      },
    ],
  },
});

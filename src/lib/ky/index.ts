import ky, { type KyRequest, type KyResponse } from "ky";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
const TIMEOUT = 10000;

export const api = ky.create({
  prefixUrl: API_BASE_URL,
  credentials: "include",
  timeout: TIMEOUT,
  retry: {
    limit: 2,
    methods: ["get", "post", "put", "patch", "delete"],
  },
  hooks: {
    afterResponse: [
      async (request: KyRequest, _, response: KyResponse) => {
        if (response.status === 401) {
          // 유저 인증 로직 처리
        }
      },
    ],
  },
});

import { redirect, RedirectType } from "next/navigation";

import ky from "ky";

import { useUserStore } from "../zustand/user";

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
    beforeRequest: [
      async (request) => {
        const user = useUserStore.getState().user;
        if (user) {
          request.headers.set("Authorization", `bearer ${user.access_token}`);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 401) {
          useUserStore.getState().setUser(null);
          redirect("/login", RedirectType.replace);
        }
        return response;
      },
    ],
  },
});

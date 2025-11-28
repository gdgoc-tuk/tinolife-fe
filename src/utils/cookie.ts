"use server";

import { cookies } from "next/headers";

export const setCookie = async (name: string, value: string, maxAge?: number) => {
  const cookieStore = await cookies();

  cookieStore.set(name, value, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "strict",
    maxAge: maxAge || 60 * 60 * 24 * 7, // 7 days
  });
};

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();

  return cookieStore.get(name)?.value;
};

export const removeCookie = async (name: string) => {
  const cookieStore = await cookies();

  cookieStore.delete(name);
};

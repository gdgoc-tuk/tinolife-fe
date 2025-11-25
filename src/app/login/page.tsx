"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button, Label } from "@/components/ui";
import { Input } from "@/components/ui";
import { useUserStore } from "@/lib/zustand/user";
import { errorToast, infoToast } from "@/utils";

import { useLogin } from "./_hooks/use-login";

const tinolife = "/static/tinolife.png";

export default function Login() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const {
    mutate: login,
    isPending,
    isSuccess,
  } = useLogin({
    onSuccess: (data) => {
      setUser({
        id: data.user_id,
        access_token: data.access_token,
      });
      router.push("/home");
    },
    onError: () => {
      errorToast("이메일 혹은 비밀번호를 확인해주세요.");
    },
  });

  const isLoginButtonDisabled = isPending || isSuccess;

  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      infoToast("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    login({ email, password });
  };

  return (
    <main className="flex flex-col items-center justify-center gap-10 p-4">
      <div className="relative aspect-24/5 w-4/5">
        <Image src={tinolife} alt="tinolife" fill />
      </div>
      <form onSubmit={onLogin} className="w-full space-y-10">
        <section className="flex w-full flex-col space-y-4">
          <div className="space-y-2.5">
            <Label htmlFor="email" className="block text-sm font-bold">
              이메일 주소
            </Label>
            <Input id="email" type="email" placeholder="tinolife@tukorea.ac.kr" name="email" />
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="password" className="block text-sm font-bold">
              비밀번호
            </Label>
            <Input id="password" type="password" placeholder="tinolife1234!" name="password" />
          </div>
        </section>
        <div className="flex w-full flex-col gap-2">
          <Button
            type="submit"
            variant="secondary"
            className="w-full"
            disabled={isLoginButtonDisabled}
          >
            {isPending ? "로그인 중..." : "로그인"}
          </Button>
          <Button variant="outline" className="hover:text-tino-black w-full hover:bg-white" asChild>
            <Link href="/signup">회원가입</Link>
          </Button>
        </div>
      </form>
    </main>
  );
}

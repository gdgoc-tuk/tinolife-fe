"use client";

import Link from "next/link";

import Close from "@/assets/close.svg";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function GetStartedSection() {
  return (
    <section className="flex flex-col items-center space-y-12 px-4">
      <Drawer>
        <Button variant="secondary" className="w-full" asChild>
          <DrawerTrigger>이메일로 시작하기</DrawerTrigger>
        </Button>
        <DrawerContent className="flex flex-col">
          <button className="self-end">
            <Close />
          </button>
          <div className="my-6 space-y-8">
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">티노라이프에 어서오세요!</h3>
              <p className="text-tino-gray text-sm">이전에 방문하신 적이 있을까요?</p>
            </div>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full">
                로그인
              </Button>
              <Button variant="outline" className="w-full">
                회원가입
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <Link className="text-tino-gray text-xs underline" href="/home">
        둘러보기
      </Link>
    </section>
  );
}

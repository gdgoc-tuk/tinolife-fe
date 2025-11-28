"use client";

import { useRouter } from "next/navigation";

import QuestionMark from "@/assets/question-mark.svg";
import ThumbsUp from "@/assets/thumbs-up-outline.svg";
import { Button, Header, HeaderLeft } from "@/components";
import FloatingContainer from "@/components/container/floating-container";

import { ArrowLeft, Bookmark, Share } from "lucide-react";

import ReportButton from "../_components/report-button";

interface TinoinDetailPageProps {
  id: string;
}

export default function TinoinDetailPage({ id }: TinoinDetailPageProps) {
  const router = useRouter();

  return (
    <main className="pb-10">
      <Header>
        <HeaderLeft className="flex-1">
          <button onClick={() => router.back()}>
            <ArrowLeft />
          </button>
        </HeaderLeft>
      </Header>
      <section className="px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-tino-gray shadow-profile size-8 rounded-full" />
            <div className="text-2xs">
              <p>닉네임</p>
              <p className="text-tino-gray">2025.11.08.18:24</p>
            </div>
          </div>
          <ReportButton id={id} />
        </div>
        <div className="mt-3 flex gap-2.5">
          <QuestionMark className="mt-1 size-6" />
          <h1 className="font-medium">
            웹어플 Git 레파지토리로 업로드하다가 오류 떴는데 이거 제 잘못인가요
          </h1>
        </div>
        <div className="my-2 space-y-7">
          <p className="text-xs">
            요즘 과제가 너무 많아서 거의 매일 새벽 3~4시까지 붙잡고 있어요ㅠ밤새면 멍하고 다음날
            수업 때는 좀비 그 자체라 어떻게 해야할지 모르겠는데 아무튼 분명히 풀을 눌렀는데 무한
            로딩이라 마음이 급해서 계속 광클을 했거든요. 그런데 어느순간부터 오류창이 뜨는 거
            있죠... 이거 어떻게 해야하나요?
          </p>
          <div className="bg-tino-gray aspect-video w-full" />
        </div>
        <div>
          <p className="text-2xs bg-tino-border w-max rounded-full px-3 py-1">#웹어플</p>
        </div>
        <div className="my-5 flex items-center gap-7">
          <button>
            <ThumbsUp className="size-6" />
          </button>
          <button>
            <Bookmark />
          </button>
          <button>
            <Share />
          </button>
        </div>
      </section>
      <FloatingContainer className="flex gap-3">
        <Button className="bg-tino-border flex-1 rounded-[8px] py-2.5" variant="ghost">
          나도 궁금해요
        </Button>
        <Button className="flex-1 rounded-[8px] py-2.5" variant="secondary">
          답변하기
        </Button>
      </FloatingContainer>
    </main>
  );
}

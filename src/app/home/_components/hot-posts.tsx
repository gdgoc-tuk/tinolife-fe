"use client";

import { useEffect, useState } from "react";

import type { CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Chip from "@/components/ui/chip";
import { cn } from "@/utils";

import Autoplay from "embla-carousel-autoplay";

export default function HotPosts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (api) {
      api.on("select", () => {
        setCurrentIndex(api.selectedScrollSnap());
      });
    }
  }, [api]);

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          containScroll: "trimSnaps",
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="pl-4">
          <CarouselItem className="basis-4/5 pl-2">
            <div className="h-full w-full space-y-5 rounded-2xl border p-4">
              <div className="flex gap-1">
                <Chip>학교 생활</Chip>
                <Chip variant="gray">미디어디자인공학전공</Chip>
              </div>
              <p className="text-sm font-bold">선행인터랙션 내일 휴강인가요?</p>
              <div className="text-2xs text-tino-gray flex items-center gap-1">
                <p>🔥</p>
                <p className="text-2xs">
                  현재 <span className="font-bold">디자인공학부</span> 학생들의 주목을 받고 있어요
                </p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-4/5 pl-2">
            <div className="h-full w-full space-y-5 rounded-2xl border p-4">
              <div className="flex gap-1">
                <Chip>학교 생활</Chip>
                <Chip variant="gray">산업디자인공학전공</Chip>
              </div>
              <p className="text-sm font-bold">졸준위 지금 많이 모였나요?</p>
              <div className="text-2xs text-tino-gray flex items-center gap-1">
                <p>🔥</p>
                <p className="text-2xs">
                  현재 <span className="font-bold">21개</span>의 공감을 받은 질문이에요
                </p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="basis-4/5 pr-4 pl-2">
            <div className="h-full w-full space-y-5 rounded-2xl border p-4">
              <div className="flex gap-1">
                <Chip>수업</Chip>
                <Chip variant="gray">미디어디자인공학전공</Chip>
              </div>
              <p className="text-sm font-bold">웹어플 Git 업로드 방법을 모르겠어요</p>
              <div className="text-2xs text-tino-gray flex items-center gap-1">
                <p>🔥</p>
                <p className="text-2xs">내 전공과 관련된 질문이에요</p>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="mx-auto mt-3 flex w-max items-center gap-1">
        {Array.from({ length: 3 }).map((_, index) => (
          // <div key={index} className="w-2 h-2 rounded-full bg-tino-gray">
          //   {index === currentIndex && <div className="size-1 rounded-full bg-tino-blue-02" />}
          // </div>
          <div
            key={index}
            className={cn(
              "bg-tino-light-gray size-1 rounded-full transition-colors",
              index === currentIndex && "bg-secondary"
            )}
          />
        ))}
      </div>
    </>
  );
}

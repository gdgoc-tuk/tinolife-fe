"use client";

import Person from "@/assets/mypage.svg";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Chip from "@/components/ui/chip";
import { getTimeDisplay } from "@/utils";

export default function RecommendStoryCards() {
  return (
    <Carousel
      opts={{
        align: "center",
        containScroll: "trimSnaps",
      }}
    >
      <CarouselContent className="pl-4">
        <CarouselItem className="basis-4/5 pr-4">
          <div className="h-full w-full space-y-2 rounded-2xl border p-4">
            <Chip variant="orange">대외활동</Chip>
            <div className="flex items-center justify-between gap-2 text-sm font-bold">
              <p className="line-clamp-1">전시 보러 가실 분</p>
              <p className="text-secondary">D-2</p>
            </div>
            <p className="text-tino-gray line-clamp-1 text-xs">
              안녕하세요 현대 디자이너로 직무중인 프리랜서입니다
            </p>
            <div className="aspect-3/1">
              <div className="bg-tino-gray h-full w-full rounded-[8px]" />
            </div>
            <div className="text-2xs flex items-center gap-1.5">
              <div className="text-tino-gray flex items-center">
                <Person className="size-4" />
                <p>xlsh1103</p>
              </div>
              <p>|</p>
              <p className="text-tino-gray">{getTimeDisplay("2025-11-26 00:00:00")}</p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="basis-4/5 pr-4 pl-0">
          <div className="h-full w-full space-y-2 rounded-2xl border p-4">
            <Chip variant="orange">대외활동</Chip>
            <div className="flex items-center justify-between gap-2 text-sm font-bold">
              <p className="line-clamp-1">전시 보러 가실 분</p>
              <p className="text-secondary">D-2</p>
            </div>
            <p className="text-tino-gray line-clamp-1 text-xs">
              안녕하세요 현대 디자이너로 직무중인 프리랜서입니다
            </p>
            <div className="aspect-3/1">
              <div className="bg-tino-gray h-full w-full rounded-[8px]" />
            </div>
            <div className="text-2xs flex items-center gap-1.5">
              <div className="text-tino-gray flex items-center">
                <Person className="size-4" />
                <p>xlsh1103</p>
              </div>
              <p>|</p>
              <p className="text-tino-gray">{getTimeDisplay("2025-11-26 00:00:00")}</p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="basis-4/5 pr-4 pl-0">
          <div className="h-full w-full space-y-2 rounded-2xl border p-4">
            <Chip variant="orange">대외활동</Chip>
            <div className="flex items-center justify-between gap-2 text-sm font-bold">
              <p className="line-clamp-1">전시 보러 가실 분</p>
              <p className="text-secondary">D-2</p>
            </div>
            <p className="text-tino-gray line-clamp-1 text-xs">
              안녕하세요 현대 디자이너로 직무중인 프리랜서입니다
            </p>
            <div className="aspect-3/1">
              <div className="bg-tino-gray h-full w-full rounded-[8px]" />
            </div>
            <div className="text-2xs flex items-center gap-1.5">
              <div className="text-tino-gray flex items-center">
                <Person className="size-4" />
                <p>xlsh1103</p>
              </div>
              <p>|</p>
              <p className="text-tino-gray">{getTimeDisplay("2025-11-26 00:00:00")}</p>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

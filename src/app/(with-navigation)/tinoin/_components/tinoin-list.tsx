"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Check from "@/assets/check.svg";
import Comment from "@/assets/message.svg";
import ThumbsUp from "@/assets/thumbs-up.svg";
import Chip from "@/components/ui/chip";
import { cn, getTimeDisplay } from "@/utils";

import { ArrowDownUp } from "lucide-react";

const filterOptions = [
  {
    label: "전체",
    value: "all",
  },
  {
    label: "해결",
    value: "solved",
  },
  {
    label: "미해결",
    value: "unsolved",
  },
];

interface TinoinListProps {
  filter?: string;
}

export default function TinoinList({ filter }: TinoinListProps) {
  const currentFilter = filter ?? "all";

  const router = useRouter();

  const onSelectFilter = (value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("filter", value);
    router.replace(`?${searchParams.toString()}`);
  };

  return (
    <section className="p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-1.5">
          {filterOptions.map((option) => (
            <button
              key={`${option.label}-${option.value}`}
              onClick={() => onSelectFilter(option.value)}
              className={cn(
                "text-tino-light-gray border-b-[1.5px] border-transparent px-2 py-1 text-sm font-bold",
                currentFilter === option.value && "text-tino-black border-tino-black"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 text-xs">
          <p>최신순</p>
          <ArrowDownUp className="size-4" />
        </button>
      </div>
      <div className="space-y-3 py-3">
        <Link href="/tinoin/1" className="shadow-list block space-y-4 rounded-2xl p-5">
          <div className="flex gap-1">
            <Chip>수업</Chip>
            <Chip className="flex items-center gap-1" variant="green">
              <Check />
              <span>해결됨</span>
            </Chip>
          </div>
          <div className="space-y-2">
            <p className="font-bold">선행인터랙션 내일 휴강인가요?</p>
            <p className="text-tino-gray text-xs">
              단톡방에서 휴강이라는 얘기가 나왔는데 공지가 없어서요. 혹시 아시는 분 계신가요?
            </p>
          </div>
          <div className="text-2xs flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="text-tino-gray flex items-center">
                <ThumbsUp className="size-4" />
                <p>1</p>
              </div>
              <p>|</p>
              <div className="flex items-center">
                <Comment className="size-4" />
                <p className="text-secondary">1</p>
              </div>
            </div>
            <p className="text-tino-gray">{getTimeDisplay("2025-11-26 00:00:00")}</p>
          </div>
        </Link>
      </div>
    </section>
  );
}

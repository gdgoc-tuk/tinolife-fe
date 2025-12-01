"use client";

import { useRouter } from "next/navigation";

import { Checkbox, Label, SelectTag } from "@/components";

import SelectCategory from "./select-category";
import SelectSort from "./select-sort";
import type { TinostorySearchParams } from "../page";

const TAGS = [
  {
    id: 1,
    name: "과제",
    value: "assignment",
  },
  {
    id: 2,
    name: "공모전",
    value: "competition",
  },
  {
    id: 3,
    name: "기타",
    value: "etc",
  },
];

export default function FilterButtons(props: TinostorySearchParams) {
  const router = useRouter();

  const { tags, category, status, sort } = props;

  const isRecruitingOnly = status === "recruiting";
  const selectedTags = tags ? tags.split(",") : [];

  const onUpdateFilter = (key: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    router.replace(`?${searchParams.toString()}`);
  };

  return (
    <section className="space-y-3 px-4">
      <div className="flex items-center justify-between">
        <SelectCategory category={category} />
        <SelectSort sort={sort} />
      </div>
      <div className="flex items-center gap-1.5">
        <Checkbox
          id="recruiting-only"
          checked={isRecruitingOnly}
          onCheckedChange={(checked) => onUpdateFilter("status", checked ? "recruiting" : "all")}
        />
        <Label htmlFor="recruiting-only" className="text-tino-gray text-xs">
          마감 전 게시물만
        </Label>
      </div>
      <ul className="flex gap-3 overflow-x-auto">
        {TAGS.map((tag) => (
          <li key={tag.id}>
            <SelectTag {...tag} selected={selectedTags.includes(tag.value)} />
          </li>
        ))}
      </ul>
    </section>
  );
}

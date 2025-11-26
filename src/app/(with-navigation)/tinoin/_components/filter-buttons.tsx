"use client";

import { useRouter } from "next/navigation";

import Reset from "@/assets/reset.svg";
import { Button } from "@/components";

import SelectGrade from "./select-grade";
import SelectMajor from "./select-major";
import SelectTag from "./select-tag";
import type { TinoinSearchParams } from "../page";

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

export default function FilterButtons(props: TinoinSearchParams) {
  const router = useRouter();

  const { major, tags, grade } = props;
  const selectedTags = tags ? tags.split(",") : [];

  const onReset = () => {
    router.replace("?");
  };

  return (
    <section className="space-y-6 px-4">
      <div className="flex gap-2">
        <Button
          variant="ghost"
          className="rounded-full border border-[#666] px-3 py-1.5"
          onClick={onReset}
        >
          <Reset />
          <p className="text-xs">초기화</p>
        </Button>
        <SelectMajor major={major} />
        <SelectGrade grade={grade} />
      </div>
      <ul className="flex gap-3 p-2">
        {TAGS.map((tag) => (
          <li key={tag.id}>
            <SelectTag {...tag} selected={selectedTags.includes(tag.value)} />
          </li>
        ))}
      </ul>
    </section>
  );
}

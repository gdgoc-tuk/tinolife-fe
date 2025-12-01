import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components";
import { useOutsideClick } from "@/hooks";
import { cn } from "@/utils";

import { ChevronDown } from "lucide-react";

interface SelectCategoryProps {
  category?: string;
}

const CATEGORIES = [
  {
    name: "동아리",
    value: "club",
  },
  {
    name: "스터디",
    value: "study",
  },
  {
    name: "플젝",
    value: "project",
  },
  {
    name: "대외활동",
    value: "external_activity",
  },
  {
    name: "기타",
    value: "etc",
  },
];

export default function SelectCategory({ category }: SelectCategoryProps) {
  const currentCategory = (CATEGORIES.find((c) => c.value === category) || CATEGORIES[0]).name;

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [optionContainerRef] = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const onSelect = (categoryValue: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("category", categoryValue);
    router.replace(`?${searchParams.toString()}`);
  };

  return (
    <div className="relative" ref={optionContainerRef}>
      <Button
        variant="ghost"
        className="p-0 text-sm font-bold"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p>{currentCategory}</p>
        <ChevronDown className={cn("transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
      </Button>
      <ul
        className={cn(
          "border-tino-border absolute top-full mt-2 max-h-40 w-fit overflow-y-auto rounded-xl border-2 bg-white text-xs text-nowrap shadow",
          !isOpen && "invisible"
        )}
      >
        {CATEGORIES.map((category) => (
          <li className="p-2" key={category.value}>
            <button
              className={cn(
                "text-tino-gray w-full text-left",
                currentCategory === category.name
                  ? "text-foreground font-bold"
                  : "hover:text-foreground"
              )}
              onClick={() => onSelect(category.value)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

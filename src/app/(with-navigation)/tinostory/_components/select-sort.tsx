import { useState } from "react";
import { useRouter } from "next/navigation";

import { useOutsideClick } from "@/hooks";
import { cn } from "@/utils";

import { ArrowDownUp } from "lucide-react";

interface SelectSortProps {
  sort?: string;
}

const SORT_OPTIONS = [
  {
    name: "최신순",
    value: "recent",
  },
  {
    name: "마감순",
    value: "deadline",
  },
  {
    name: "인기순",
    value: "popular",
  },
];

export default function SelectSort({ sort }: SelectSortProps) {
  const currentSort = (SORT_OPTIONS.find((s) => s.value === sort) || SORT_OPTIONS[0]).name;

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [optionContainerRef] = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const onSelect = (sortValue: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("sort", sortValue);
    router.replace(`?${searchParams.toString()}`);
  };

  return (
    <div className="relative" ref={optionContainerRef}>
      <button
        className="flex items-center gap-2 text-xs"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p>{currentSort}</p>
        <ArrowDownUp className="size-4" />
      </button>
      <ul
        className={cn(
          "border-tino-border absolute top-full mt-2 max-h-40 w-full overflow-y-auto rounded-xl border-2 bg-white text-xs shadow",
          !isOpen && "invisible"
        )}
      >
        {SORT_OPTIONS.map((sort) => (
          <li className="p-2" key={sort.value}>
            <button
              className={cn(
                "text-tino-gray w-full text-left",
                currentSort === sort.name ? "text-foreground font-bold" : "hover:text-foreground"
              )}
              onClick={() => onSelect(sort.value)}
            >
              {sort.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

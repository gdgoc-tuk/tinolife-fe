import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components";
import { useOutsideClick } from "@/hooks";
import { cn } from "@/utils";

import { ChevronDown, Loader2 } from "lucide-react";

interface SelectGradeProps {
  grade?: string;
}

export default function SelectGrade({ grade }: SelectGradeProps) {
  const currentGrade = grade ? +grade : undefined;

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [optionContainerRef] = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const onSelect = (gradeValue: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("grade", gradeValue.toString());
    router.replace(`?${searchParams.toString()}`);
  };

  return (
    <div className="relative" ref={optionContainerRef}>
      <Button
        variant="ghost"
        className="rounded-full bg-[#F2F4F8] px-3 py-1.5"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p className={cn("text-xs", grade ? "font-bold" : "text-tino-gray")}>
          {grade ? `${grade}학년` : "학년 선택"}
        </p>
        <ChevronDown className={cn("transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
      </Button>
      <ul
        className={cn(
          "border-tino-border absolute top-full mt-2 max-h-40 w-full overflow-y-auto rounded-xl border-2 bg-white text-xs shadow",
          !isOpen && "invisible"
        )}
      >
        {Array.from({ length: 4 }, (_, index) => (
          <li className="p-2" key={index}>
            <button
              className={cn(
                "text-tino-gray w-full text-left",
                currentGrade === index + 1 ? "text-foreground font-bold" : "hover:text-foreground"
              )}
              onClick={() => onSelect(index + 1)}
            >
              {index + 1}학년
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

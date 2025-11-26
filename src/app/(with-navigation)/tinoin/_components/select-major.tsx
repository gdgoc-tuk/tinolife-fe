import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button, CustomErrorBoundary } from "@/components";
import { useOutsideClick } from "@/hooks";
import { useGetMajors } from "@/hooks";
import { cn } from "@/utils";

import { ChevronDown, Loader2 } from "lucide-react";

interface SelectMajorProps {
  major?: string;
}

export default function SelectMajor({ major }: SelectMajorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [optionContainerRef] = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div className="relative max-w-44 flex-1" ref={optionContainerRef}>
      <Button
        variant="ghost"
        className="w-full justify-between rounded-full bg-[#444] px-3 py-1.5 text-[#F8F8F8]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p className={cn("text-xs", major ? "font-bold" : "text-tino-light-gray")}>
          {major || "전공 선택"}
        </p>
        <ChevronDown className={cn("transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
      </Button>
      <CustomErrorBoundary
        withSuspense
        suspenseFallback={
          <div
            className={cn(
              "border-tino-border absolute top-full mt-2 w-full rounded-xl border-2 bg-white p-4 shadow",
              !isOpen && "invisible"
            )}
          >
            <Loader2 className="text-secondary mx-auto animate-spin" />
          </div>
        }
        errorFallback={({ resetErrorBoundary }) => (
          <div
            className={cn(
              "border-tino-border absolute top-full mt-2 flex w-full flex-col gap-2 rounded-xl border-2 bg-white p-4 shadow",
              !isOpen && "invisible"
            )}
          >
            <p className="text-destructive text-center">전공 정보를 불러오는데 실패했어요.</p>
            <Button onClick={resetErrorBoundary} className="text-sm">
              다시 시도하기
            </Button>
          </div>
        )}
      >
        <SelectOptions major={major} isOpen={isOpen} />
      </CustomErrorBoundary>
    </div>
  );
}

interface SelectOptionsProps extends SelectMajorProps {
  isOpen: boolean;
}

function SelectOptions({ major: selectedMajor, isOpen }: SelectOptionsProps) {
  const router = useRouter();

  const { data: majors } = useGetMajors();

  const onSelect = (majorName: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("major", majorName);
    router.replace(`?${searchParams.toString()}`);
  };

  return (
    <ul
      className={cn(
        "border-tino-border absolute top-full mt-2 max-h-40 w-full overflow-y-auto rounded-xl border-2 bg-white text-xs shadow",
        !isOpen && "invisible"
      )}
    >
      {majors.map((major) => (
        <li className="p-2" key={major.id}>
          <button
            className={cn(
              "text-tino-gray w-full text-left",
              selectedMajor === major.name ? "text-foreground font-bold" : "hover:text-foreground"
            )}
            onClick={() => onSelect(major.name)}
          >
            {major.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

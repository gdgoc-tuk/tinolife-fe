"use client";

import { useState } from "react";

import { Button, CustomErrorBoundary } from "@/components";
import { useOutsideClick } from "@/hooks";
import { useGetMajors } from "@/hooks";
import { cn } from "@/utils";

import { ChevronDown, Loader2 } from "lucide-react";

interface SelectProps {
  major: string;
  value: number;
  onSelect: (id: number, name: string) => void;
}

export default function Select({ major, value, onSelect }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [optionContainerRef] = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const onSelectOption = (majorId: number, name: string) => {
    onSelect(majorId, name);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={optionContainerRef}>
      <button
        className="border-tino-border text-tino-black flex w-full items-center justify-between rounded-xl border-2 p-4"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p className={cn(!value && "text-tino-light-gray")}>{major || "전공을 선택해주세요."}</p>
        <ChevronDown className={cn("transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
      </button>
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
        <SelectOptions value={value} onSelect={onSelectOption} isOpen={isOpen} />
      </CustomErrorBoundary>
    </div>
  );
}

interface SelectOptionsProps extends Omit<SelectProps, "major"> {
  isOpen: boolean;
}

function SelectOptions({ value, onSelect, isOpen }: SelectOptionsProps) {
  const { data: majors } = useGetMajors();

  return (
    <ul
      className={cn(
        "border-tino-border absolute top-full mt-2 max-h-52 w-full overflow-y-auto rounded-xl border-2 bg-white shadow",
        !isOpen && "invisible"
      )}
    >
      {majors.map((major) => (
        <li className="p-4" key={major.id}>
          <button
            className={cn(
              "text-tino-gray w-full text-left",
              value === major.id ? "text-secondary" : "hover:text-foreground"
            )}
            onClick={() => onSelect(major.id, major.name)}
          >
            {major.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

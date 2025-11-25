import { useState } from "react";

import { useOutsideClick } from "@/hooks";
import { cn } from "@/utils";

import { ChevronDown } from "lucide-react";

interface SelectProps {
  options: string[];
  value: string;
  onSelect: (value: string) => void;
}

export default function Select({ options, value, onSelect }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [optionContainerRef] = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const onSelectOption = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={optionContainerRef}>
      <button
        className="border-tino-border text-tino-black flex w-full items-center justify-between rounded-xl border-2 p-4"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p className={cn(!value && "text-tino-light-gray")}>{value || "전공을 선택해주세요."}</p>
        <ChevronDown className={cn("transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
      </button>
      {isOpen && (
        <ul className="border-tino-border absolute top-full mt-2 max-h-52 w-full overflow-y-auto rounded-xl border-2 bg-white shadow">
          {options.map((option) => (
            <li className="p-4" key={option}>
              <button
                className={cn(
                  "text-tino-gray w-full text-left",
                  value === option ? "text-secondary" : "hover:text-foreground"
                )}
                onClick={() => onSelectOption(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

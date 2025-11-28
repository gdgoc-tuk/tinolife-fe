import { useState } from "react";

import { useOutsideClick } from "@/hooks";

import { Ellipsis } from "lucide-react";

interface ReportButtonProps {
  id: string;
}

export default function ReportButton({ id }: ReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [menuDropdownRef] = useOutsideClick<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  return (
    <div className="relative" ref={menuDropdownRef}>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <Ellipsis className="text-tino-gray size-4" />
      </button>
      {isOpen && (
        <div className="shadow-profile absolute top-full right-0 w-max rounded-xl border-2 bg-white px-4 py-2 text-xs text-nowrap">
          <button>🚨 신고하기</button>
        </div>
      )}
    </div>
  );
}

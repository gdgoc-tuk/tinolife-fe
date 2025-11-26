import { useRouter } from "next/navigation";

import { Button } from "@/components";
import { cn } from "@/utils";

interface SelectTagProps {
  name: string;
  value: string;
  selected: boolean;
}

export default function SelectTag({ name, value, selected }: SelectTagProps) {
  const router = useRouter();

  const onSelect = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const allTags = searchParams.get("tags")?.split(",") || [];

    if (!selected) {
      searchParams.set("tags", [...allTags, value].join(","));
      router.replace(`?${searchParams.toString()}`);
      return;
    }

    const newTags = allTags.filter((tag) => tag !== value);
    if (newTags.length === 0) {
      searchParams.delete("tags");
    } else {
      searchParams.set("tags", newTags.join(","));
    }
    router.replace(`?${searchParams.toString()}`);
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        "text-2xs hover:text-tino-black p-0 text-[#777]",
        selected && "text-tino-black font-bold"
      )}
      onClick={onSelect}
    >
      <p># {name}</p>
    </Button>
  );
}

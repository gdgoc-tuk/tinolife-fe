import { Button } from "@/components";
import { cn } from "@/utils";

import { ChevronDown, Loader2 } from "lucide-react";

import { useGetInterests } from "../../_hooks/use-get-interests";

interface InterestOptionsProps {
  selectedInterestIds: number[];
  onSelectInterestId: (interestId: number) => void;
}

export default function InterestOptions({
  selectedInterestIds,
  onSelectInterestId,
}: InterestOptionsProps) {
  const {
    data: interests,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetInterests();

  const onShowMoreInterests = () => {
    if (hasNextPage) {
      fetchNextPage();
      return;
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2.5">
        {interests.map((option) => (
          <Button
            key={option.id}
            className={cn(
              "bg-tino-border hover:bg-tino-border/80 rounded-full border-none px-5 py-3",
              !selectedInterestIds.includes(option.id)
                ? "text-tino-black"
                : "bg-tino-black hover:bg-tino-black/80"
            )}
            onClick={() => onSelectInterestId(option.id)}
          >
            {option.name}
          </Button>
        ))}
      </div>
      {isFetchingNextPage || isLoading ? (
        <Loader2 className="text-secondary mx-auto animate-spin" />
      ) : hasNextPage ? (
        <button className="mx-auto flex items-center gap-2" onClick={onShowMoreInterests}>
          <p>더보기</p>
          <ChevronDown />
        </button>
      ) : null}
    </>
  );
}

import { Button } from "@/components";
import { cn } from "@/utils";

import type { UseFormReturn } from "react-hook-form";

import { type SignupForm } from "../../_schema/signup";

interface InterestStepProps {
  form: UseFormReturn<SignupForm>;
}

const INTEREST_OPTIONS = ["관심사1", "관심사2", "관심사3", "관심사4", "관심사5", "관심사6"];

export default function InterestStep({ form }: InterestStepProps) {
  const interests = form.watch("interests");

  const isCompleteDisabled = interests.length === 0;

  const onSelectInterest = (interest: string) => {
    if (interests.includes(interest)) {
      form.setValue(
        "interests",
        interests.filter((i) => i !== interest)
      );
      return;
    }
    form.setValue("interests", [...interests, interest]);
  };

  const onComplete = form.handleSubmit((data) => {
    console.log(data);
    // 데이터 요청 성공 시 router로 홈으로 이동
  });

  return (
    <section className="flex h-full flex-col justify-between">
      <div className="space-y-[52px]">
        <div>
          <h1 className="text-2xl font-bold">관심사를 알려주세요.</h1>
          <h2 className="text-tino-gray text-sm">더 정확한 추천을 위해 태그가 활용됩니다.</h2>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {INTEREST_OPTIONS.map((option) => (
            <Button
              key={option}
              className={cn(
                "bg-tino-border hover:bg-tino-border/80 rounded-full border-none px-5 py-3",
                !interests.includes(option)
                  ? "text-tino-black"
                  : "bg-tino-black hover:bg-tino-black/80"
              )}
              onClick={() => onSelectInterest(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
      <Button
        onClick={onComplete}
        disabled={isCompleteDisabled}
        variant="secondary"
        className="w-full"
      >
        완료
      </Button>
    </section>
  );
}

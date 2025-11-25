import { Button, CustomErrorBoundary } from "@/components";

import { Loader2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import InterestOptions from "./interest-options";
import { useSignup } from "../../_hooks/use-signup";
import { type SignupForm } from "../../_schema/signup";

interface InterestStepProps {
  form: UseFormReturn<SignupForm>;
}

export default function InterestStep({ form }: InterestStepProps) {
  const { mutate: signup, isPending } = useSignup();

  const interestIds = form.watch("interest_ids");

  const isCompleteDisabled = interestIds.length === 0 || isPending;

  const onSelectInterestId = (interestId: number) => {
    if (interestIds.includes(interestId)) {
      form.setValue(
        "interest_ids",
        interestIds.filter((i) => i !== interestId)
      );
      return;
    }
    form.setValue("interest_ids", [...interestIds, interestId]);
  };

  const onComplete = form.handleSubmit((data) => {
    const body = {
      ...data,
      privacy_policy_agreed: true,
    };
    signup(body);
    // 데이터 요청 성공 시 router로 홈으로 이동
  });

  return (
    <section className="flex h-full flex-col justify-between">
      <div className="space-y-[52px]">
        <div>
          <h1 className="text-2xl font-bold">관심사를 알려주세요.</h1>
          <h2 className="text-tino-gray text-sm">더 정확한 추천을 위해 태그가 활용됩니다.</h2>
        </div>
        <CustomErrorBoundary
          withSuspense
          suspenseFallback={<Loader2 className="text-secondary mx-auto animate-spin" />}
          errorFallback={({ resetErrorBoundary }) => (
            <div className="text-tino-black flex flex-col gap-2">
              <p className="text-destructive text-center">관심사 정보를 불러오는데 실패했어요.</p>
              <Button onClick={resetErrorBoundary} className="text-sm">
                다시 시도하기
              </Button>
            </div>
          )}
        >
          <InterestOptions
            selectedInterestIds={interestIds}
            onSelectInterestId={onSelectInterestId}
          />
        </CustomErrorBoundary>
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

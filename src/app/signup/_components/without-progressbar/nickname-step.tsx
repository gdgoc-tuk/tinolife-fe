import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Input } from "@/components";
import { errorToast, infoToast, successToast } from "@/utils";

import type { UseFormReturn } from "react-hook-form";

import { useCheckNickname } from "../../_hooks/use-check-nickname";
import { type SignupForm } from "../../_schema/signup";

interface NicknameStepProps {
  form: UseFormReturn<SignupForm>;
}

export default function NicknameStep({ form }: NicknameStepProps) {
  const router = useRouter();

  const [isNicknameVerified, setIsNicknameVerified] = useState(false);

  const { mutate: checkNickname, isPending: isCheckNicknamePending } = useCheckNickname({
    onSuccess: (data) => {
      if (data.available) {
        successToast("사용 가능한 닉네임입니다.");
        setIsNicknameVerified(true);
        return;
      }
      infoToast("이미 사용 중인 닉네임입니다.");
      setIsNicknameVerified(false);
    },
    onError: (error) => {
      console.error(error);
      errorToast("닉네임 중복확인에 실패했습니다.");
    },
  });

  const { errors } = form.formState;
  const nickname = form.watch("nickname");

  const isNicknameInputDisabled = isNicknameVerified;
  const isCheckNicknameButtonDisabled =
    !!errors.nickname || !nickname || isNicknameVerified || isCheckNicknamePending;
  const isNextDisabled = !isNicknameVerified || !!errors.nickname || isCheckNicknamePending;

  const onCheckNickname = () => {
    const nicknameValue = form.getValues("nickname");
    if (!nicknameValue || errors.nickname) {
      return errorToast("닉네임을 입력해주세요.");
    }

    checkNickname({ nickname: nicknameValue });
  };

  const onNextStep = () => {
    router.push("/signup?step=2");
  };

  return (
    <section className="flex h-full flex-col justify-between">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">
            반갑습니다!
            <br />
            이름이 어떻게 되시나요?
          </h1>
          <h2 className="text-tino-gray text-sm">앞으로 이 닉네임으로 다름 사람들에게 보여져요.</h2>
        </div>
        <div className="space-y-2.5">
          <div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="닉네임을 입력해주세요."
                aria-invalid={!!errors.nickname}
                disabled={isNicknameInputDisabled}
                maxLength={12}
                {...form.register("nickname")}
              />
              <Button
                type="button"
                disabled={isCheckNicknameButtonDisabled}
                className="bg-tino-black hover:bg-tino-black/80"
                onClick={onCheckNickname}
              >
                중복확인
              </Button>
            </div>
            <p className="text-tino-gray mt-1.5 text-right text-xs">{nickname.length}/12</p>
          </div>
          {errors.nickname && <p className="text-destructive text-xs">{errors.nickname.message}</p>}
        </div>
      </div>
      <Button onClick={onNextStep} disabled={isNextDisabled} variant="secondary" className="w-full">
        다음
      </Button>
    </section>
  );
}

import { useState } from "react";

import { Button, Input, Label } from "@/components";
import { useTimer } from "@/hooks";
import { errorToast } from "@/utils";

import type { UseFormReturn } from "react-hook-form";

import { useSendVerificationCode } from "../../_hooks/use-send-verification-code";
import { useVerifyCode } from "../../_hooks/use-verify-code";
import { type SignupForm } from "../../_schema/signup";

interface VerifyEmailProps {
  form: UseFormReturn<SignupForm>;
  isEmailVerified: boolean;
  setIsEmailVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

// 시간 포맷팅 (MM:SS)
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export default function VerifyEmail({
  form,
  isEmailVerified,
  setIsEmailVerified,
}: VerifyEmailProps) {
  const [emailCode, setEmailCode] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [resendCount, setResendCount] = useState(-1);
  const [maxResendCount, setMaxResendCount] = useState(0);

  const { timeLeft, startTimer, stopTimer } = useTimer();

  const { mutate: sendVerificationCode, isPending: isSendVerificationCodePending } =
    useSendVerificationCode({
      onSuccess: (data) => {
        console.log("data", data);
        setIsEmailSent(true);
        setResendCount(data.resend_count);
        setEmailCode(""); // 재전송 시 인증번호 초기화
        startTimer(); // 타이머 시작

        setMaxResendCount(data.max_resend_count);
      },
      onError: (error) => {
        console.error(error);
        errorToast("이메일 전송 요청에 실패했습니다.");
      },
    });

  const { mutate: verifyCode, isPending: isVerifyCodePending } = useVerifyCode({
    onSuccess: (data) => {
      if (data.verified) {
        setIsEmailVerified(true);
        stopTimer();
        return;
      }
      errorToast("올바르지 않은 인증 코드입니다.");
    },
    onError: (error) => {
      console.error(error);
      errorToast("인증번호 검증 요청에 실패했습니다.");
    },
  });

  const { errors } = form.formState;

  const isEmailCodeExpired = !isEmailSent || timeLeft === 0; // 인증번호 유효시간 만료
  const isEmailCodeInputDisabled = isEmailCodeExpired || isEmailVerified; // 인증번호 입력 필드 비활성화
  const isSendEmailButtonDisabled =
    !!errors.email ||
    resendCount >= maxResendCount ||
    isEmailVerified ||
    isSendVerificationCodePending ||
    isVerifyCodePending; // 이메일 전송 버튼 비활성화
  const isVerifyCodeButtonDisabled = isEmailCodeInputDisabled || !emailCode || isVerifyCodePending; // 인증번호 검증 버튼 비활성화

  const onSendEmail = () => {
    const email = form.getValues("email");
    if (!email || errors.email) {
      return errorToast("이메일을 입력해주세요.");
    }

    sendVerificationCode({ email });
  };

  const onVerifyCode = () => {
    const email = form.getValues("email");
    if (!email || errors.email) {
      return errorToast("이메일을 입력해주세요.");
    }

    verifyCode({ email, code: emailCode });
  };

  return (
    <>
      <div className="space-y-2.5">
        <Label htmlFor="email" className="block text-sm font-bold">
          이메일 주소
        </Label>
        <div className="flex gap-2">
          <Input
            id="email"
            type="email"
            placeholder="tinolife@tukorea.ac.kr"
            aria-invalid={!!errors.email}
            disabled={isEmailVerified}
            {...form.register("email")}
          />
          <Button
            type="button"
            variant="secondary"
            disabled={isSendEmailButtonDisabled}
            onClick={onSendEmail}
          >
            {resendCount === -1 ? "전송" : "재전송"}
          </Button>
        </div>
        {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
      </div>
      <div className="space-y-2.5">
        <Label htmlFor="emailCode" className="block text-sm font-bold">
          인증번호
        </Label>
        <div className="flex gap-2">
          <Input
            id="emailCode"
            placeholder="인증번호를 입력해주세요."
            value={emailCode}
            onChange={(e) => setEmailCode(e.target.value)}
            disabled={isEmailCodeInputDisabled}
          />
          <Button
            type="button"
            variant="secondary"
            disabled={isVerifyCodeButtonDisabled}
            onClick={onVerifyCode}
          >
            인증
          </Button>
        </div>
        {isEmailSent && timeLeft > 0 && (
          <p className="text-tino-gray text-xs">
            인증번호 유효시간: <span className="font-semibold">{formatTime(timeLeft)}</span>
          </p>
        )}
        {isEmailSent && !isEmailVerified && timeLeft === 0 && (
          <p className="text-destructive text-xs">
            {resendCount === 1
              ? "인증번호 유효시간이 만료되었습니다. 재전송해주세요."
              : "새로고침 후 다시 시도해주세요."}
          </p>
        )}
      </div>
    </>
  );
}

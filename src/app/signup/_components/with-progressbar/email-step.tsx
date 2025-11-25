import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Button,
  Checkbox,
  Header,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
  Input,
  Label,
} from "@/components";

import { ChevronLeft } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import VerifyEmail from "./verify-email";
import { type SignupForm } from "../../_schema/signup";

interface EmailStepProps {
  form: UseFormReturn<SignupForm>;
}

export default function EmailStep({ form }: EmailStepProps) {
  const router = useRouter();

  const [isAgreed, setIsAgreed] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const { errors } = form.formState;

  const isSubmitDisabled = !isAgreed || !isEmailVerified; // 계속하기 버튼 비활성화

  const onChangeIsAgreed = (checked: boolean) => {
    setIsAgreed(checked);
  };

  const onNextStep = () => {
    router.push("?step=1");
  };

  return (
    <>
      <Header>
        <HeaderLeft className="flex-1">
          <button onClick={() => router.back()} className="">
            <ChevronLeft className="text-secondary" />
          </button>
        </HeaderLeft>
        <HeaderCenter className="flex-1 font-semibold">회원가입</HeaderCenter>
        <HeaderRight className="flex-1" />
      </Header>
      <div className="flex h-[calc(100%-var(--spacing-header))] flex-col justify-between p-6">
        <section className="flex flex-col space-y-6">
          <div>
            <h1 className="text-2xl font-bold">이메일로 가입하기</h1>
            <h2 className="text-tino-gray text-sm">학교 이메일로 간단하게 가입할 수 있어요.</h2>
          </div>
          <VerifyEmail
            form={form}
            isEmailVerified={isEmailVerified}
            setIsEmailVerified={setIsEmailVerified}
          />
          <div className="space-y-2.5">
            <Label htmlFor="password" className="block text-sm font-bold">
              비밀번호
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="영문, 숫자, 특수문자를 사용한 8~20자"
              aria-invalid={!!errors.password}
              {...form.register("password")}
            />
            {errors.password && (
              <p className="text-destructive text-xs">{errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="passwordConfirm" className="block text-sm font-bold">
              비밀번호 확인
            </Label>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="위의 비밀번호를 다시 입력해주세요."
              aria-invalid={!!errors.passwordConfirm}
              {...form.register("passwordConfirm")}
            />
            {errors.passwordConfirm && (
              <p className="text-destructive text-xs">{errors.passwordConfirm.message}</p>
            )}
          </div>
        </section>
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="isAgree"
              checked={isAgreed}
              onCheckedChange={onChangeIsAgreed}
              aria-checked={isAgreed}
            />
            <Label htmlFor="isAgree" className="text-tino-gray block text-xs">
              <span className="text-secondary">개인 정보 보호 정책</span> 및
              <span className="text-secondary">서비스 약관</span>을 읽었으며 이에 동의합니다.
            </Label>
          </div>
          <Button
            onClick={onNextStep}
            disabled={isSubmitDisabled}
            variant="secondary"
            className="w-full"
          >
            다음
          </Button>
        </section>
      </div>
    </>
  );
}

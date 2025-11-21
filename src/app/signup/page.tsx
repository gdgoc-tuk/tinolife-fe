"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Checkbox, Header, HeaderLeft, Input, Label } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";

import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";

import VerifyEmail from "./_components/verify-email";
import { type SignupForm, signupFormSchema } from "./_schema/signup";

const DEFAULT_VALUES = {
  email: "",
  password: "",
  passwordConfirm: "",
};

export default function SignupPage() {
  const router = useRouter();

  const [isAgreed, setIsAgreed] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const { isValid, errors } = form.formState;

  const isSubmitDisabled = !isValid || !isAgreed || !isEmailVerified; // 계속하기 버튼 비활성화

  const onChangeIsAgreed = (checked: boolean) => {
    setIsAgreed(checked);
  };

  const onSubmit = form.handleSubmit((data: SignupForm) => {
    console.log("Signup Request", data);
  });

  return (
    <>
      <Header>
        <HeaderLeft>
          <button onClick={() => router.back()}>
            <ChevronLeft className="text-secondary" />
          </button>
        </HeaderLeft>
      </Header>
      <main>
        <form className="flex h-full flex-col justify-between px-6" onSubmit={onSubmit}>
          <section className="flex flex-col space-y-6 pt-[calc(var(--spacing-header)+24px)]">
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
          <section className="space-y-4 pb-4">
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
            <Button disabled={isSubmitDisabled} variant="secondary" className="w-full">
              계속하기
            </Button>
          </section>
        </form>
      </main>
    </>
  );
}

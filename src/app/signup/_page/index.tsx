"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import EmailStep from "../_components/with-progressbar/email-step";
import WithoutProgressBar from "../_components/without-progressbar";
import { type SignupForm, signupFormSchema } from "../_schema/signup";

const DEFAULT_VALUES = {
  email: "",
  grade: 0,
  password: "",
  passwordConfirm: "",
  nickname: "",
  major_id: 0,
  studentId: "",
  interest_ids: [],
};

interface SignupPageProps {
  step?: string;
}

export default function SignupPage({ step }: SignupPageProps) {
  const currentStep = step || "0";

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const getStepComponent = () => {
    switch (currentStep) {
      case "0":
        return <EmailStep form={form} />;
      case "1":
      case "2":
      case "3":
        return <WithoutProgressBar form={form} step={Number(currentStep)} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (
      (+currentStep > 0 && !form.getValues("email")) ||
      (+currentStep > 1 && !form.getValues("nickname")) ||
      (+currentStep > 2 && !form.getValues("grade"))
    ) {
      throw new Error("잘못된 접근입니다.");
    }
  }, [currentStep]);

  return <main>{getStepComponent()}</main>;
}

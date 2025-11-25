import { useRouter } from "next/navigation";

import { Header, HeaderCenter, HeaderLeft, HeaderRight } from "@/components";

import { ChevronLeft } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import MajorStep from "./major-step";
import NicknameStep from "./nickname-step";
import Progressbar from "./progressbar";
import { type SignupForm } from "../../_schema/signup";

interface WithoutProgressBarProps {
  form: UseFormReturn<SignupForm>;
  step: number;
}

export default function WithoutProgressBar({ form, step }: WithoutProgressBarProps) {
  const router = useRouter();

  const getStepComponent = () => {
    switch (step) {
      case 1:
        return <NicknameStep form={form} />;
      case 2:
        return <MajorStep form={form} />;
      case 3:
        return <NicknameStep form={form} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header>
        <HeaderLeft className="flex-1">
          <button onClick={() => router.back()} className="">
            <ChevronLeft className="text-secondary" />
          </button>
        </HeaderLeft>
        <HeaderCenter className="flex-1 font-semibold">프로필 정보 입력</HeaderCenter>
        <HeaderRight className="flex-1" />
      </Header>
      <Progressbar step={step} />
      <div className="flex h-[calc(100%-var(--spacing-header))] flex-col justify-between p-6">
        {getStepComponent()}
      </div>
    </>
  );
}

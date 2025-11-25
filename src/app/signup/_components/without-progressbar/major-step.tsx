import { useRouter } from "next/navigation";

import { Button, Input, Label } from "@/components";
import { cn } from "@/utils";

import type { UseFormReturn } from "react-hook-form";

import Select from "./select";
import { type SignupForm } from "../../_schema/signup";

interface MajorStepProps {
  form: UseFormReturn<SignupForm>;
}

export default function MajorStep({ form }: MajorStepProps) {
  const router = useRouter();

  const grade = form.watch("grade");
  const major_id = form.watch("major_id");
  const studentId = form.watch("student_id");

  const { errors } = form.formState;

  const isNextDisabled = !grade || !major_id || !!errors.student_id || !studentId;

  const onNextStep = () => {
    router.push("/signup?step=3");
  };

  return (
    <section className="flex h-full flex-col justify-between">
      <div className="space-y-[52px]">
        <div>
          <h1 className="text-2xl font-bold">전공과 학년을 알려주세요.</h1>
          <h2 className="text-tino-gray text-sm">내 전공과 관련된 소식을 위주로 알려드릴게요.</h2>
        </div>
        <div className="space-y-8">
          <div className="space-y-2.5">
            <Label className="block text-sm font-bold">학년</Label>
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }, (_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={cn(
                    "hover:text-accent-foreground border-tino-border border-2 py-3 hover:bg-white hover:opacity-80",
                    grade === index + 1 && "text-secondary border-secondary hover:text-secondary"
                  )}
                  onClick={() => form.setValue("grade", index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2.5">
            <Label className="block text-sm font-bold">전공</Label>
            <Select
              value={major_id}
              onSelect={(value: number) => form.setValue("major_id", value)}
            />
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="studentId" className="block text-sm font-bold">
              학번
            </Label>
            <Input
              id="studentId"
              type="text"
              maxLength={10}
              placeholder="학번을 입력해주세요."
              aria-invalid={!!errors.student_id}
              {...form.register("student_id")}
            />
            {errors.student_id && (
              <p className="text-destructive text-xs">{errors.student_id.message}</p>
            )}
          </div>
        </div>
      </div>
      <Button onClick={onNextStep} disabled={isNextDisabled} variant="secondary" className="w-full">
        다음
      </Button>
    </section>
  );
}

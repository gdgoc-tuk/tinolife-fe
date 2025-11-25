"use client";

import { Button } from "@/components";

import { AlertCircle } from "lucide-react";

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  const onReset = () => {
    window.location.replace("/");
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-6 px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="bg-destructive/10 flex size-16 items-center justify-center rounded-full">
          <AlertCircle className="text-destructive size-8" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">문제가 발생했어요</h1>
          <p className="text-tino-gray text-sm">{error.message}</p>
        </div>
      </div>
      <Button onClick={onReset} variant="secondary" className="w-full max-w-xs">
        다시 시도하기
      </Button>
    </main>
  );
}

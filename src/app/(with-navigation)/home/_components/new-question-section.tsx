"use client";

import Link from "next/link";

import Check from "@/assets/check.svg";
import Comment from "@/assets/message.svg";
import { Button, CustomErrorBoundary, Spinner } from "@/components";
import { getTimeDisplay } from "@/utils";

import { AlertCircle, ChevronRight } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

import type { RecentQuestionProps } from "../_hooks/use-get-recent-questions";
import { useGetRecentQuestions } from "../_hooks/use-get-recent-questions";

export default function NewQuestionSection() {
  return (
    <section className="my-8 space-y-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <p>❓</p>
          <h2>새롭게 올라온 질문</h2>
        </div>
        <Link href="/tinoin" className="text-2xs text-tino-gray flex items-center">
          <p>전체보기</p>
          <ChevronRight className="size-3" />
        </Link>
      </div>
      <div className="shadow-list space-y-4 rounded-2xl p-4">
        <CustomErrorBoundary
          withSuspense
          suspenseFallback={<Spinner className="mx-auto" />}
          errorFallback={({ resetErrorBoundary }) => (
            <div className="flex flex-col items-center gap-2">
              <div className="bg-destructive/10 flex size-8 items-center justify-center rounded-full">
                <AlertCircle className="text-destructive size-4" aria-hidden="true" />
              </div>
              <p className="text-tino-gray text-center text-xs">질문을 불러오는데 실패했어요</p>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                aria-label="다시 시도하기"
                onClick={resetErrorBoundary}
              >
                다시 시도하기
              </Button>
            </div>
          )}
        >
          <NewQuestionList />
        </CustomErrorBoundary>
      </div>
    </section>
  );
}

function NewQuestionList() {
  const { data } = useGetRecentQuestions(2);

  if (data.questions.length === 0) {
    return <div className="text-tino-gray text-center text-xs">올라온 질문이 없어요.</div>;
  }

  return data.questions.map((question, idx) => (
    <Fragment key={question.id}>
      <NewQuestionItem {...question} />
      {idx !== data.questions.length - 1 && <div className="bg-tino-border h-px w-full" />}
    </Fragment>
  ));
}

function NewQuestionItem({
  title,
  content_preview,
  answer_count,
  created_at,
  is_accepted,
}: RecentQuestionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1 text-xs">
        <p className="line-clamp-1 font-medium">{title}</p>
        <p className="line-clamp-2">{content_preview}</p>
      </div>
      <div className="text-2xs flex items-center gap-1.5">
        <div className="flex items-center gap-1.5">
          {answer_count > 0 && (
            <div className="flex items-center">
              <Comment className="size-4" />
              <p className="text-secondary">{answer_count}</p>
            </div>
          )}
          {is_accepted && <Check />}
        </div>
        {(answer_count > 0 || is_accepted) && <p>|</p>}
        <p className="text-tino-gray">{getTimeDisplay(created_at)}</p>
      </div>
    </div>
  );
}

import Link from "next/link";

import { ChevronRight } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

import HomeHeader from "./_components/home-header";
import HotPosts from "./_components/hot-posts";
import HotQuestion from "./_components/hot-question";
import NewQuestionSection from "./_components/new-question-section";
import RecommendStoryCards from "./_components/recommend-story-cards";

const hotQuestions = [
  {
    id: 1,
    rank: 1,
    title: "밤샘 과제 루틴 공유좀 ㅋㅋ 진짜 사람 사는 건가요...",
    content:
      "요즘 과제가 너무 많아서 거의 매일 새벽 3~4시까지 붙잡고 있어요ㅠ밤새면 멍하고 다음날 수업 때는 좀비 그 자체라 어떻게 사나요 ㅠㅠ",
    commentCount: 10,
  },
  {
    id: 2,
    rank: 2,
    title: "밤샘 과제 루틴 공유좀 ㅋㅋ 진짜 사람 사는 건가요...",
    content:
      "요즘 과제가 너무 많아서 거의 매일 새벽 3~4시까지 붙잡고 있어요ㅠ밤새면 멍하고 다음날 수업 때는 좀비 그 자체라 어떻게 사나요 ㅠㅠ",
    commentCount: 10,
  },
];

export default function Home() {
  return (
    <main className="pb-navigation h-full">
      <HomeHeader />
      <HotPosts />
      <NewQuestionSection />
      <section className="space-y-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <p>🔥</p>
            <h2>인기 질문 리스트</h2>
          </div>
          <Link href="/tinoin" className="text-2xs text-tino-gray flex items-center">
            <p>전체보기</p>
            <ChevronRight className="size-3" />
          </Link>
        </div>
        <div className="shadow-list space-y-4 rounded-2xl p-4">
          {hotQuestions.map((question, idx) => (
            <Fragment key={question.id}>
              <HotQuestion {...question} />
              {idx !== hotQuestions.length - 1 && <div className="bg-tino-border h-px w-full" />}
            </Fragment>
          ))}
        </div>
      </section>
      <section className="my-8 space-y-3">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-1">
            <p>✨</p>
            <h2>추천 스토리 카드</h2>
          </div>
          <Link href="/tinostory" className="text-2xs text-tino-gray flex items-center">
            <p>전체보기</p>
            <ChevronRight className="size-3" />
          </Link>
        </div>
        <RecommendStoryCards />
      </section>
    </main>
  );
}

import Link from "next/link";

import { ChevronRight } from "lucide-react";

import HomeHeader from "./_components/home-header";
import HotPosts from "./_components/hot-posts";

export default function Home() {
  return (
    <main>
      <HomeHeader />
      <HotPosts />
      <section className="px-4">
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
      </section>
    </main>
  );
}

import Person from "@/assets/mypage.svg";
import Chip from "@/components/ui/chip";

import FilterButtons from "../_components/filter-buttons";
import TinostoryHeader from "../_components/tinostory-header";
import type { TinostorySearchParams } from "../page";

export default function TinostoryPage(props: TinostorySearchParams) {
  return (
    <main className="pb-navigation h-full">
      <TinostoryHeader />
      <FilterButtons {...props} />
      <section className="space-y-3 p-4">
        <div className="shadow-list space-y-3 rounded-2xl p-4">
          <Chip variant="orange">대학생활</Chip>
          <p className="text-sm font-bold">20대의 모든 순간을 위한 연합 동아리 ‘About’</p>
          <div className="flex items-center justify-between">
            <div className="text-tino-gray text-2xs flex items-center gap-1.5">
              <div className="flex items-center gap-1">
                <Person className="size-4" />
                <p>xlsh1103</p>
              </div>
              <p>|</p>
              <p>25.11.06</p>
            </div>
            <p className="text-secondary text-sm font-bold">D-2</p>
          </div>
          <div className="bg-tino-gray aspect-3/1 rounded-2xl" />
          <p className="line-clamp-3 text-xs">
            📢20대의 모든 순간을 위한, 연합 동아리 &apos;About&apos; 공부와 취미, 친목을 한번에!
            너가 찾던 모든 모임, 여기서 바로 시작해요. 동아리를 소개합니다. 1. 5000명 이상의
            대학생이 함께하는 대학생활 동아리
          </p>
        </div>
      </section>
    </main>
  );
}

import TinostoryPage from "./_page";

interface SearchParams {
  category: string; // 동아리, 스터디, 플젝, 대외활동, 기타
  sort: string;
  status: string; // 마감 전 게시물인지
  tags: string; // 태그1,태그2,태그3 형식
}

export type TinostorySearchParams = Partial<SearchParams>;

interface TinostoryProps {
  searchParams: Promise<TinostorySearchParams>;
}

export default async function Tinostory({ searchParams }: TinostoryProps) {
  const promisedSearchParams = await searchParams;

  return <TinostoryPage {...promisedSearchParams} />;
}

import TinoinPage from "./_page";

interface SearchParams {
  major: string;
  tags: string;
  grade: string;
  filter: string;
}

export type TinoinSearchParams = Partial<SearchParams>;

interface TinoinProps {
  searchParams: Promise<TinoinSearchParams>;
}

export default async function Tinoin({ searchParams }: TinoinProps) {
  const promisedSearchParams = await searchParams;

  return <TinoinPage {...promisedSearchParams} />;
}

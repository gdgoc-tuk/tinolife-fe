import TinoinDetailPage from "./_page";
interface TinoinDetailProps {
  params: Promise<{ id: string }>;
}

export default async function TinoinDetail({ params }: TinoinDetailProps) {
  const promisedParams = await params;

  return <TinoinDetailPage {...promisedParams} />;
}

import SignupPage from "./_page";

interface SignupProps {
  searchParams: Promise<{
    step?: string;
  }>;
}

export default async function Signup({ searchParams }: SignupProps) {
  const { step } = await searchParams;

  return <SignupPage step={step} />;
}

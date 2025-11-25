import Navigation from "./_components/navigation";

interface WithNavigationLayoutProps {
  children: React.ReactNode;
}

export default function WithNavigationLayout({ children }: WithNavigationLayoutProps) {
  return (
    <>
      {children}
      <Navigation />
    </>
  );
}

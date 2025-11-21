"use client";

import { createContext, type ReactNode, useContext } from "react";

import { cn } from "@/utils";

const HeaderContext = createContext<boolean | undefined>(undefined);

const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("Header 컴포넌트 내부에서만 사용할 수 있어요.");
  }
  return context;
};

interface HeaderProps {
  children: ReactNode;
  sticky?: boolean;
  className?: string;
}

function Header({ children, sticky = false, className }: HeaderProps) {
  return (
    <HeaderContext.Provider value={true}>
      <header
        className={cn(
          "z-50 flex h-15 items-center justify-between bg-white p-4",
          sticky && "sticky top-0",
          className
        )}
      >
        {children}
      </header>
    </HeaderContext.Provider>
  );
}

interface HeaderSectionProps {
  children?: ReactNode;
  className?: string;
}

function HeaderLeft({ children, className }: HeaderSectionProps) {
  useHeader();
  return <div className={cn("flex items-center", className)}>{children}</div>;
}

function HeaderCenter({ children, className }: HeaderSectionProps) {
  useHeader();
  return <div className={cn("flex flex-1 items-center justify-center", className)}>{children}</div>;
}

function HeaderRight({ children, className }: HeaderSectionProps) {
  useHeader();
  return <div className={cn("flex items-center", className)}>{children}</div>;
}

export { Header, HeaderLeft, HeaderCenter, HeaderRight };

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
  className?: string;
}

function Header({ children, className }: HeaderProps) {
  return (
    <HeaderContext.Provider value={true}>
      <header
        className={cn(
          "max-w-mobile fixed top-0 right-0 left-0 z-50 mx-auto flex h-15 items-center justify-between bg-white p-4",
          className
        )}
      >
        {children}
      </header>
    </HeaderContext.Provider>
  );
}

interface HeaderSectionProps {
  children: ReactNode;
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

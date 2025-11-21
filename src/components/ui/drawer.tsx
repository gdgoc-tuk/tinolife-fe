"use client";

import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

import { useOutsideClick } from "@/hooks";
import { cn } from "@/utils";

import { createPortal } from "react-dom";

interface DrawerContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("Drawer 컴포넌트 내부에서만 사용할 수 있어요.");
  }
  return context;
};

interface DrawerProps {
  children: ReactNode;
}

function Drawer({ children }: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <DrawerContext.Provider value={{ isOpen, open, close }}>{children}</DrawerContext.Provider>
  );
}

function DrawerTrigger({ children, className, ...props }: React.ComponentProps<"button">) {
  const { open } = useDrawer();
  return (
    <button className={className} onClick={open} type="button" {...props}>
      {children}
    </button>
  );
}

interface ContentProps {
  children: ReactNode;
  className?: string;
}

function DrawerContent({ children, className }: ContentProps) {
  const { isOpen, close } = useDrawer();

  const [drawerRef] = useOutsideClick<HTMLDivElement>(() => {
    if (isOpen) {
      close();
    }
  });

  const onClickBackground = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    close();
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-99999 bg-black/50" onClick={onClickBackground}>
      <div
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "max-w-mobile fixed right-0 bottom-0 left-0 z-99999 mx-auto rounded-t-xl bg-white p-4 pb-[calc(var(--spacing-ios-bottom)+16px)]",
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export { Drawer, DrawerTrigger, DrawerContent };

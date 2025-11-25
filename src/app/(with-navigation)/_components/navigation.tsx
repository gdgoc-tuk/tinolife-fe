"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Home from "@/assets/home.svg";
import Mypage from "@/assets/mypage.svg";
import Tinoin from "@/assets/tinoin.svg";
import Tinostory from "@/assets/tinostory.svg";
import { cn } from "@/utils";

const navigationItems = [
  {
    label: "홈",
    href: "/home",
    icon: Home,
  },
  {
    label: "티노인",
    href: "/tinoin",
    icon: Tinoin,
  },
  {
    label: "티노스토리",
    href: "/tinostory",
    icon: Tinostory,
  },
  {
    label: "마이페이지",
    href: "/mypage",
    icon: Mypage,
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <footer className="max-w-mobile fixed right-0 bottom-0 left-0 mx-auto flex bg-white py-2">
      {navigationItems.map((item) => (
        <Link key={item.href} href={item.href} className="flex-1">
          <div className="flex flex-col items-center justify-center">
            <item.icon
              className={cn(item.href.startsWith(pathname) ? "text-black" : "text-[#979C9E]")}
            />
            <p className="text-[8px]">{item.label}</p>
          </div>
        </Link>
      ))}
    </footer>
  );
}

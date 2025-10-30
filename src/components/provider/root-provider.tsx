"use client";

import { queryClient } from "@/lib/tanstack";
import { QueryClientProvider } from "@tanstack/react-query";

interface RootProvider {
  children: React.ReactNode;
}

export default function RootProvider({ children }: RootProvider) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

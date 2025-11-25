import { Suspense } from "react";

import { QueryErrorResetBoundary } from "@tanstack/react-query";

import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

interface CustomErrorBoundaryProps {
  children: React.ReactNode;
  withSuspense?: boolean;
  suspenseFallback?: React.ReactNode;
  errorFallback: (error: FallbackProps) => React.ReactNode;
}

export default function CustomErrorBoundary({
  children,
  withSuspense = false,
  suspenseFallback,
  errorFallback,
}: CustomErrorBoundaryProps) {
  if (withSuspense && !suspenseFallback) {
    throw new Error("Suspense fallback is required.");
  }

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallbackRender={errorFallback} onReset={reset}>
          {withSuspense ? <Suspense fallback={suspenseFallback}>{children}</Suspense> : children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

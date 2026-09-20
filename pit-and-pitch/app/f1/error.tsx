"use client";

import { ErrorState } from "@/components/f1/states";

export default function Error({ reset }: { reset: () => void }) {
  return <ErrorState onRetry={reset} />;
}

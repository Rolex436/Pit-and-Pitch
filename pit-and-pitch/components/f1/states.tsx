import { Inbox, TriangleAlert } from "lucide-react";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-foreground/10 motion-reduce:animate-none ${className}`}
    />
  );
}

export function ListSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="space-y-2" aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}

export function ErrorState({
  message = "We couldn't load F1 data right now.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-lg border border-foreground/10 p-8 text-center"
    >
      <TriangleAlert className="size-6" aria-hidden />
      <p>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded border border-foreground/20 px-4 py-2 text-sm hover:bg-foreground/5"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-foreground/20 p-8 text-center">
      <Inbox className="size-6 opacity-60" aria-hidden />
      <p className="font-heading text-lg">{title}</p>
      {description && <p className="text-sm opacity-70">{description}</p>}
    </div>
  );
}

export function ErrorState({
  message = "We couldn't load F1 data right now.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-lg border border-foreground/10 p-8 text-center"
    >
      <TriangleAlert className="size-6" aria-hidden />
      <p>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded border border-foreground/20 px-4 py-2 text-sm hover:bg-foreground/5"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-foreground/20 p-8 text-center">
      <Inbox className="size-6 opacity-60" aria-hidden />
      <p className="font-heading text-lg">{title}</p>
      {description && <p className="text-sm opacity-70">{description}</p>}
    </div>
  );
}

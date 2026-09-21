"use client";

import { Star } from "lucide-react";
import { useF1Favorites } from "@/hooks/useF1Favorites";

export function FavoriteButton({
  kind,
  id,
}: {
  kind: "driver" | "constructor";
  id: string;
}) {
  const { favorites, ready, toggleDriver, toggleConstructor } = useF1Favorites();
  const isFavorite =
    ready && (kind === "driver" ? favorites.driverId === id : favorites.constructorId === id);
  const toggle = kind === "driver" ? toggleDriver : toggleConstructor;

  return (
    <button
      onClick={() => toggle(id)}
      disabled={!ready}
      aria-pressed={isFavorite}
      className="inline-flex items-center gap-2 rounded border border-foreground/20 px-4 py-2 text-sm hover:bg-foreground/5 disabled:opacity-50"
    >
      <Star className={`size-4 ${isFavorite ? "fill-current" : ""}`} aria-hidden />
      {isFavorite ? "Favorite" : "Set as favorite"}
    </button>
  );
}


"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { F1Favorites } from "@/lib/f1/types";

const STORAGE_KEY = "pit-and-pitch:f1-favorites";
const EMPTY: F1Favorites = { driverId: null, constructorId: null };
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot() {
  return undefined;
}

function parse(raw: string | null | undefined): F1Favorites {
  if (!raw) return EMPTY;
  try {
    const saved = JSON.parse(raw);
    return {
      driverId: typeof saved.driverId === "string" ? saved.driverId : null,
      constructorId: typeof saved.constructorId === "string" ? saved.constructorId : null,
    };
  } catch {
    return EMPTY;
  }
}

function save(next: F1Favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
catch {
  }
  listeners.forEach((listener) => listener());
}

export function useF1Favorites() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const favorites = useMemo(() => parse(raw), [raw]);

  return {
    favorites,
    ready: raw !== undefined,
    toggleDriver: (driverId: string) =>
      save({ ...favorites, driverId: favorites.driverId === driverId ? null : driverId }),
    toggleConstructor: (constructorId: string) =>
      save({
        ...favorites,
        constructorId: favorites.constructorId === constructorId ? null : constructorId,
      }),
  };
}

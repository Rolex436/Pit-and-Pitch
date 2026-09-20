"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { useF1Favorites } from "@/hooks/useF1Favorites";
import type { ConstructorStanding, DriverStanding } from "@/lib/f1/types";

function FavoriteStar() {
  return (
    <Star
      className="ml-2 inline size-3.5 fill-current"
      aria-label="Favorite"
    />
  );
}

const headRow =
  "border-b border-foreground/10 text-left text-xs uppercase tracking-wide opacity-60";

export function DriverStandingsTable({
  standings,
  limit,
}: {
  standings: DriverStanding[];
  limit?: number;
}) {
  const { favorites, ready } = useF1Favorites();
  const rows = limit ? standings.slice(0, limit) : standings;

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className={headRow}>
          <th className="w-10 px-3 py-2 font-normal">Pos</th>
          <th className="px-3 py-2 font-normal">Driver</th>
          <th className="hidden px-3 py-2 font-normal sm:table-cell">
            Wins
          </th>
          <th className="px-3 py-2 text-right font-normal">Pts</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => {
          const isFavorite =
            ready && favorites.driverId === row.Driver.driverId;

          return (
            <tr
              key={row.Driver.driverId}
              className={`border-b border-foreground/5 ${
                isFavorite ? "bg-foreground/5" : ""
              }`}
            >
              <td className="px-3 py-3 tabular-nums">{row.position}</td>

              <td className="px-3 py-3">
                <Link
                  href={`/f1/drivers/${row.Driver.driverId}`}
                  className="hover:underline"
                >
                  {row.Driver.givenName} {row.Driver.familyName}
                </Link>

                {isFavorite && <FavoriteStar />}

                <div className="text-xs opacity-60">
                  {row.Constructors.map((c) => c.name).join(" / ")}
                </div>
              </td>

              <td className="hidden px-3 py-3 tabular-nums sm:table-cell">
                {row.wins}
              </td>

              <td className="px-3 py-3 text-right tabular-nums">
                {row.points}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function ConstructorStandingsTable({
  standings,
  limit,
}: {
  standings: ConstructorStanding[];
  limit?: number;
}) {
  const { favorites, ready } = useF1Favorites();
  const rows = limit ? standings.slice(0, limit) : standings;

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className={headRow}>
          <th className="w-10 px-3 py-2 font-normal">Pos</th>
          <th className="px-3 py-2 font-normal">Team</th>
          <th className="hidden px-3 py-2 font-normal sm:table-cell">
            Wins
          </th>
          <th className="px-3 py-2 text-right font-normal">Pts</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => {
          const isFavorite =
            ready &&
            favorites.constructorId === row.Constructor.constructorId;

          return (
            <tr
              key={row.Constructor.constructorId}
              className={`border-b border-foreground/5 ${
                isFavorite ? "bg-foreground/5" : ""
              }`}
            >
              <td className="px-3 py-3 tabular-nums">{row.position}</td>

              <td className="px-3 py-3">
                <Link
                  href={`/f1/constructors/${row.Constructor.constructorId}`}
                  className="hover:underline"
                >
                  {row.Constructor.name}
                </Link>

                {isFavorite && <FavoriteStar />}

                <div className="text-xs opacity-60">
                  {row.Constructor.nationality}
                </div>
              </td>

              <td className="hidden px-3 py-3 tabular-nums sm:table-cell">
                {row.wins}
              </td>

              <td className="px-3 py-3 text-right tabular-nums">
                {row.points}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getDriverSeasonResults,
  getDriverStandings,
} from "@/lib/f1/api";
import { FavoriteButton } from "@/components/f1/favorite-button";
import { EmptyState } from "@/components/f1/states";

export default async function DriverPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [races, standings] = await Promise.all([
    getDriverSeasonResults(id),
    getDriverStandings(),
  ]);

  const entry = standings?.standings.find(
    (s) => s.Driver.driverId === id
  );

  const driver = entry?.Driver ?? races[0]?.Results[0]?.Driver;

  if (!driver) {
    notFound();
  }

  const team =
    entry?.Constructors.map((c) => c.name).join(" / ") ??
    races.at(-1)?.Results[0]?.Constructor.name;

  const podiums = races.filter(
    (r) => Number(r.Results[0]?.position) <= 3
  ).length;

  const stats = [
    { label: "Position", value: entry?.position ?? "-" },
    { label: "Points", value: entry?.points ?? "0" },
    { label: "Wins", value: entry?.wins ?? "0" },
    { label: "Podiums", value: String(podiums) },
    { label: "Races", value: String(races.length) },
  ];

  return (
    <div className="space-y-8">
      <Link
        href="/f1/standings"
        className="text-sm hover:underline"
      >
        ← Standings
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl">
            {driver.givenName} {driver.familyName}
          </h1>

          <p className="text-sm opacity-70">
            {[
              driver.permanentNumber &&
                `#${driver.permanentNumber}`,
              driver.nationality,
              team,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>

        <FavoriteButton kind="driver" id={id} />
      </div>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-foreground/10 p-4"
          >
            <dt className="text-xs uppercase tracking-wide opacity-60">
              {stat.label}
            </dt>

            <dd className="font-heading text-2xl tabular-nums">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <section>
        <h2 className="mb-3 font-heading text-xl">
          Season results
        </h2>

        {races.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-foreground/10 text-left text-xs uppercase tracking-wide opacity-60">
                  <th className="w-10 px-3 py-2 font-normal">
                    Rnd
                  </th>
                  <th className="px-3 py-2 font-normal">
                    Race
                  </th>
                  <th className="hidden px-3 py-2 font-normal sm:table-cell">
                    Grid
                  </th>
                  <th className="px-3 py-2 font-normal">
                    Finish
                  </th>
                  <th className="px-3 py-2 text-right font-normal">
                    Pts
                  </th>
                </tr>
              </thead>

              <tbody>
                {races.map((race) => {
                  const result = race.Results[0];

                  return (
                    <tr
                      key={race.round}
                      className="border-b border-foreground/5"
                    >
                      <td className="px-3 py-3 tabular-nums">
                        {race.round}
                      </td>

                      <td className="px-3 py-3">
                        {race.raceName}
                      </td>

                      <td className="hidden px-3 py-3 tabular-nums sm:table-cell">
                        {result.grid}
                      </td>

                      <td className="px-3 py-3 tabular-nums">
                        {result.positionText}
                      </td>

                      <td className="px-3 py-3 text-right tabular-nums">
                        {result.points}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No results yet"
            description="This driver hasn't raced this season."
          />
        )}
      </section>
    </div>
  );
}
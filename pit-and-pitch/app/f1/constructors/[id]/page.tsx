import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getConstructorSeasonResults,
  getConstructorStandings,
  getDriverStandings,
} from "@/lib/f1/api";
import { FavoriteButton } from "@/components/f1/favorite-button";
import { EmptyState } from "@/components/f1/states";

export default async function ConstructorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [races, constructors, drivers] = await Promise.all([
    getConstructorSeasonResults(id),
    getConstructorStandings(),
    getDriverStandings(),
  ]);

  const entry = constructors?.standings.find(
    (s) => s.Constructor.constructorId === id
  );

  const team =
    entry?.Constructor ?? races[0]?.Results[0]?.Constructor;

  if (!team) {
    notFound();
  }

  const teamDrivers =
    drivers?.standings.filter((d) =>
      d.Constructors.some((c) => c.constructorId === id)
    ) ?? [];

  const podiums = races
    .flatMap((r) => r.Results)
    .filter((r) => Number(r.position) <= 3).length;

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
            {team.name}
          </h1>

          <p className="text-sm opacity-70">
            {team.nationality}
          </p>
        </div>

        <FavoriteButton kind="constructor" id={id} />
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

      {teamDrivers.length > 0 && (
        <section>
          <h2 className="mb-3 font-heading text-xl">
            Drivers
          </h2>

          <ul className="divide-y divide-foreground/5 rounded-lg border border-foreground/10">
            {teamDrivers.map((d) => (
              <li
                key={d.Driver.driverId}
                className="flex justify-between px-4 py-3 text-sm"
              >
                <Link
                  href={`/f1/drivers/${d.Driver.driverId}`}
                  className="hover:underline"
                >
                  {d.Driver.givenName} {d.Driver.familyName}
                </Link>

                <span className="tabular-nums opacity-70">
                  {d.points} pts
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

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
                    Finishes
                  </th>
                  <th className="px-3 py-2 text-right font-normal">
                    Pts
                  </th>
                </tr>
              </thead>

              <tbody>
                {races.map((race) => (
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

                    <td className="hidden px-3 py-3 sm:table-cell">
                      {race.Results
                        .map(
                          (r) =>
                            `${r.Driver.code ?? r.Driver.familyName} ${r.positionText}`
                        )
                        .join(" · ")}
                    </td>

                    <td className="px-3 py-3 text-right tabular-nums">
                      {race.Results.reduce(
                        (sum, r) => sum + Number(r.points),
                        0
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No results yet"
            description="This team hasn't raced this season."
          />
        )}
      </section>
    </div>
  );
}
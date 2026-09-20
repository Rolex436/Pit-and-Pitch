import Link from "next/link";
import {
  getConstructorStandings,
  getDriverStandings,
  getLastRaceResult,
  getNextRace,
} from "@/lib/f1/api";
import { RaceCard } from "@/components/f1/race-card";
import { EmptyState } from "@/components/f1/states";
import {
  ConstructorStandingsTable,
  DriverStandingsTable,
} from "@/components/f1/standings";

export const metadata = { title: "F1 | Pit & Pitch" };

function SectionHeader({
  title,
  href,
  linkText,
}: {
  title: string;
  href: string;
  linkText: string;
}) {
  return (
    <div className="mb-3 flex items-baseline justify-between">
      <h2 className="font-heading text-xl">{title}</h2>
      <Link href={href} className="text-sm hover:underline">
        {linkText}
      </Link>
    </div>
  );
}

export default async function F1Page() {
  const [nextRace, lastRace, drivers, constructors] = await Promise.all([
    getNextRace(),
    getLastRaceResult(),
    getDriverStandings(),
    getConstructorStandings(),
  ]);

  return (
    <div className="space-y-10">
      <h1 className="font-heading text-3xl">Formula 1</h1>

      <section>
        <SectionHeader
          title="Next race"
          href="/f1/calendar"
          linkText="Full calendar"
        />

        {nextRace ? (
          <RaceCard race={nextRace} isPast={false} />
        ) : (
          <EmptyState
            title="No upcoming races"
            description="The season is over or the next calendar isn't published yet."
          />
        )}
      </section>

      <section>
        <SectionHeader
          title="Latest result"
          href="/f1/calendar"
          linkText="Calendar"
        />

        {lastRace ? (
          <div>
            <p className="mb-2 text-sm opacity-70">
              {lastRace.raceName} · Round {lastRace.round}
            </p>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-foreground/10 text-left text-xs uppercase tracking-wide opacity-60">
                  <th className="w-10 px-3 py-2 font-normal">Pos</th>
                  <th className="px-3 py-2 font-normal">Driver</th>
                  <th className="hidden px-3 py-2 font-normal sm:table-cell">
                    Time / Status
                  </th>
                  <th className="px-3 py-2 text-right font-normal">
                    Pts
                  </th>
                </tr>
              </thead>

              <tbody>
                {lastRace.Results.slice(0, 10).map((result) => (
                  <tr
                    key={result.Driver.driverId}
                    className="border-b border-foreground/5"
                  >
                    <td className="px-3 py-3 tabular-nums">
                      {result.position}
                    </td>

                    <td className="px-3 py-3">
                      <Link
                        href={`/f1/drivers/${result.Driver.driverId}`}
                        className="hover:underline"
                      >
                        {result.Driver.givenName}{" "}
                        {result.Driver.familyName}
                      </Link>

                      <div className="text-xs opacity-60">
                        {result.Constructor.name}
                      </div>
                    </td>

                    <td className="hidden px-3 py-3 tabular-nums sm:table-cell">
                      {result.Time?.time ?? result.status}
                    </td>

                    <td className="px-3 py-3 text-right tabular-nums">
                      {result.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No results yet"
            description="Results appear here after the first race of the season."
          />
        )}
      </section>

      <div className="grid gap-10 lg:grid-cols-2">
        <section>
          <SectionHeader
            title="Drivers"
            href="/f1/standings"
            linkText="Full standings"
          />

          {drivers ? (
            <DriverStandingsTable
              standings={drivers.standings}
              limit={5}
            />
          ) : (
            <EmptyState title="No standings yet" />
          )}
        </section>

        <section>
          <SectionHeader
            title="Constructors"
            href="/f1/standings"
            linkText="Full standings"
          />

          {constructors ? (
            <ConstructorStandingsTable
              standings={constructors.standings}
              limit={5}
            />
          ) : (
            <EmptyState title="No standings yet" />
          )}
        </section>
      </div>
    </div>
  );
}
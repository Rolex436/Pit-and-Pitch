import {
  getConstructorStandings,
  getDriverStandings,
} from "@/lib/f1/api";
import { EmptyState } from "@/components/f1/states";
import {
  ConstructorStandingsTable,
  DriverStandingsTable,
} from "@/components/f1/standings";

export const metadata = { title: "F1 Standings | Pit & Pitch" };

export default async function StandingsPage() {
  const [drivers, constructors] = await Promise.all([
    getDriverStandings(),
    getConstructorStandings(),
  ]);

  const latest = drivers ?? constructors;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl">
          Championship standings
        </h1>

        {latest && (
          <p className="text-sm opacity-70">
            {latest.season} season, after round {latest.round}
          </p>
        )}
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 font-heading text-xl">Drivers</h2>

          {drivers ? (
            <DriverStandingsTable standings={drivers.standings} />
          ) : (
            <EmptyState
              title="No standings yet"
              description="Standings appear after the first race of the season."
            />
          )}
        </section>

        <section>
          <h2 className="mb-3 font-heading text-xl">Constructors</h2>

          {constructors ? (
            <ConstructorStandingsTable
              standings={constructors.standings}
            />
          ) : (
            <EmptyState
              title="No standings yet"
              description="Standings appear after the first race of the season."
            />
          )}
        </section>
      </div>
    </div>
  );
}

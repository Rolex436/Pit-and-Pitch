import { getRaceStart, getSchedule } from "@/lib/f1/api";
import { RaceCard } from "@/components/f1/race-card";
import { EmptyState } from "@/components/f1/states";

export const metadata = { title: "F1 Calendar | Pit & Pitch" };

export default async function CalendarPage() {
  const races = await getSchedule();

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl">
        {races[0] ? `${races[0].season} calendar` : "Calendar"}
      </h1>

      {races.length ? (
        <div className="space-y-3">
          {races.map((race) => (
            <RaceCard
              key={race.round}
              race={race}
              isPast={getRaceStart(race).getTime() < Date.now()}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No calendar available"
          description="The schedule for this season hasn't been published yet."
        />
      )}
    </div>
  );
}
import { getRaceStart } from "@/lib/f1/api";
import type { Race } from "@/lib/f1/types";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

export function RaceCard({ race }: { race: Race }) {
  const start = getRaceStart(race);
  const isPast = start.getTime() < Date.now();
  const time = race.time
    ? `${start.toISOString().slice(11, 16)} UTC`
    : null;

  return (
    <article
      className={`flex items-center justify-between gap-4 rounded-lg border border-foreground/10 p-4 ${
        isPast ? "opacity-60" : ""
      }`}
    >
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide opacity-60">
          Round {race.round}
        </p>

        <h3 className="font-heading text-lg leading-tight">
          {race.raceName}
        </h3>

        <p className="text-sm opacity-70">
          {race.Circuit.circuitName} ·{" "}
          {race.Circuit.Location.locality},{" "}
          {race.Circuit.Location.country}
        </p>

        {race.Sprint && (
          <p className="mt-1 text-xs opacity-60">
            Sprint weekend
          </p>
        )}
      </div>

      <div className="shrink-0 text-right">
        <p className="font-heading text-xl">
          {dateFormat.format(start)}
        </p>

        {time && (
          <p className="text-sm opacity-70">
            {time}
          </p>
        )}
      </div>
    </article>
  );
}
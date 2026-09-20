import type {
  ConstructorStandingsResponse,
  DriverStandingResponse,
  Race,
  RaceResponse,
  ResultResponse,
} from "./types";

const BASE_URL = "https://api.jolpi.ca/ergast/f1";
const MINUTE = 60;
const HOUR = 60 * MINUTE;

async function get<T>(path: string, revalidate: number): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    next: { revalidate },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    throw new Error(`F1 API returned ${res.status} for ${path}`);
  }
  return res.json();
}

export function getRaceStart(race: Race): Date {
  return new Date(`${race.date}T${race.time ?? "00:00:00Z"}`);
}

export async function getSchedule(): Promise<Race[]> {
  const data = await get<ResultResponse>("/current/races/", 6 * HOUR);
  return data.MRData.RaceTable.Races;
}

export async function getNextRace(): Promise<Race | null> {
  const races = await getSchedule();
  const now = Date.now();
  return races.find((race) => getRaceStart(race).getTime() > now) ?? null;
}

export async function getLastRaceResult() {
  const data = await get<ResultResponse>("/current/last/results/", 15 * MINUTE);
  return data.MRData.RaceTable.Races[0] ?? null;
}

export async function getDriverStandings() {
  const data = await get<DriverStandingResponse>(
    "/current/driverstandings/",
    15 * MINUTE,
  );
  const list = data.MRData.standingstable.standinglists[0];
  if (!list) return null;
  return { season: list.season, round: list.round, standings: list.DriverStandings };
}

export async function getConstructorStandings() {
  const data = await get<ConstructorStandingsResponse>(
    "/current/constructorstandings/",
    15 * MINUTE,
  );
  const list = data.MRData.StandingsTable.StandingsLists[0];
  if (!list) return null;
  return { season: list.season, round: list.round, standings: list.ConstructorStandings };
}

export async function getDriverSeasonResults(driverId: string) {
  const data = await get<ResultResponse>(
    `/current/drivers/${encodeURIComponent(driverId)}/results/?limit=100`,
    15 * MINUTE,
  );
  return data.MRData.RaceTable.Races;
}

export async function getConstructorSeasonResults(constructorId: string) {
  const data = await get<ResultResponse>(
    `/current/constructors/${encodeURIComponent(constructorId)}/results/?limit=100`,
    15 * MINUTE,
  );
  return data.MRData.RaceTable.Races;
}
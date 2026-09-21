# Pit & Pitch

A personalized sports dashboard for Formula 1 fans. Pick a favorite driver and team, and follow the season calendar, the latest race results, and the championship standings in one place.

## Features

- **Overview:** the next race, the latest race top 10, and the top 5 drivers and constructors
- **Race calendar:** every race of the current season, with circuit, location, date, start time (UTC), and sprint weekend markers. Finished races are dimmed.
- **Championship standings:** full driver and constructor tables with wins and points
- **Driver pages:** position, points, wins, podiums, races entered, and a race-by-race results table
- **Constructor pages:** the same stats for a team, its drivers, and both cars' finishes per race
- **Favorites:** set one favorite driver and one favorite team. They are highlighted in the standings and saved in your browser, so they stay after a refresh or restart.
- **Loading, error, and empty states** on every page, for slow connections, API failures, and the off-season
- **Responsive layout** for phones and desktops


Fonts: Melodrama Light for headings and Estrella Early for body text, both loaded locally with `next/font/local`.

## Data source

All F1 data comes from the free [Jolpica F1 API](https://github.com/jolpica/jolpica-f1), an open-source, Ergast-compatible API. It needs no API key.

Requests are made on the server, never from the browser, and are cached with Next.js `revalidate`:

| Data | Cache time |
|------|------------|
| Race schedule | 6 hours |
| Results and standings | 15 minutes |

This keeps the site well within the API's rate limits, however many people visit.

### Known limitations

- The API has no driver photos or team logos, so the site shows driver numbers, nationalities, and team names instead.
- There is no live timing. Data updates after each session as the API is updated.
- Race times are shown in UTC, not the viewer's local time.
- Before the first race of a season, standings and results are empty, and the site shows an empty state.


## Project structure

```
app/
  page.tsx                      redirects to /f1
  layout.tsx                    fonts and base layout
  f1/
    page.tsx                    overview
    calendar/page.tsx           season calendar
    standings/page.tsx          full standings
    drivers/[id]/page.tsx       driver detail
    constructors/[id]/page.tsx  constructor detail
    loading.tsx, error.tsx      loading and error states for all F1 routes
components/f1/
  standings.tsx                 driver and constructor tables
  race-card.tsx                 race summary card
  favorite-button.tsx           favorite toggle
  states.tsx                    skeleton, error, and empty components
lib/f1/
  api.ts                        server-side Jolpica requests
  types.ts                      TypeScript types for API data
hooks/
  useF1Favorites.ts             localStorage favorites
```



## Credits and disclaimer

- Data: [Jolpica F1 API](https://github.com/jolpica/jolpica-f1)
- Built by me.
- This is an unofficial fan project. It is not affiliated with or endorsed by Formula 1, the FIA, or any team. F1 and related marks belong to their respective owners.

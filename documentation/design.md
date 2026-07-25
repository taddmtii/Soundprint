Problem:

- Users cannot easily see active stats and trends within Spotify's own UI, especially not live in a dashboard like interface.

Solution/Concept:

- Web app that is a "Wrapped"-style summary of your Spotify listening. Recalculates live from recent activity (like last month, last 6 months, all-time).
- Updates automatically.
- User friendly.

Tech Stack:

- React
- Tailwind
- Recharts
- Next.js
  - API Routes
- Component library - Shadcn
- Database: Postgres via Prisma, DEV - Docker container, PROD - Supabase

Ideas:

- Card based UI
- Animated number count-ups
- Auto-refresh indicator (updated 2 min ago... or live pulse when a new track starts)
- Currently-playing hero section that updates in real time.

Overall Flow:

1. User signs in using Spotify OAuth.
2. Call several Spotify API endpoints for initial fetch
3. Display initial fetch data.
4. User can click through differnet pages (Today, This Week, This Month, This Year, etc...), conditionally making API calls.

References:

https://nextjs.org/docs/app/getting-started/fetching-data
https://developer.spotify.com/documentation/web-api
https://developer.spotify.com/documentation/web-api/concepts/api-calls
https://developer.spotify.com/documentation/web-playback-sdk
https://developer.spotify.com/documentation/web-api/concepts/redirect_uri
https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn#authentication

RedirectUri: http://127.0.0.1:3000/api/auth/callback

Next.js:

page.tsx: UI route (renders a React component)
layout.tsx: shared UI wrapper for nested routes
route.ts: an API endpoint / Route Handler (No UI, Request/Response logic)

**Authentication**

- User needs to be authenticated with Spotify Account before accessing anything.
- Spotify uses Opaque tokens: random string with n meaning. Data is stored server side and looked up by the string. Meaningless outside spotifys systems.
- Authrorization Code with PKCE Flow is:
  - Code Challenge generation from a Code Verifier
  - Request authorization from the user and retreive auth code
  - Request an access token from the auth code
  - Use access token for API calls.
- **Code Verifier**: Cryptographic random string.

- Insights:
  - Listening time for given time period
  - Top 5 tracks of selected time period
  - Top 5 artists of selcted time period
  - Listening activity over time.
  - Unique Artists
  - Discovery Rate
  - Top 5 Genres

BASE_URL: https://api.spotify.com/v1

- Endpoints:
  - GET /me : get user information
  - GET /me/top/tracks : get top tracks ( 5 with query params )
  - GET /me/top/artists : get top artists ( 5 with query params )

Prisma:

- Object Relational Mapper. Layer that sits betweeen TS and SQL DB.
- schema.prisma - describe database (create models and define relationships)
- prisma migrate - migrates changes to actual DB
- prisma client - what you use in your code to reference database stuff

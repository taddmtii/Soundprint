# Soundprint

> A live insight dashboard for your Spotify listening stats.

**Soundprint** is a personal web app that turns your Spotify listening history into a clean, real-time dashboard. The idea is that it is always available and updated from your recent activity.

This is an **unofficial, non-commercial personal project** and is **not affiliated with, endorsed by, or sponsored by Spotify**.

---

<img width="1512" height="884" alt="Screenshot 2026-08-24 at 12 16 25 PM" src="https://github.com/user-attachments/assets/ca042005-fce8-4c5a-af9f-41b30e902ab0" />

<img width="1512" height="884" alt="Screenshot 2026-08-24 at 12 16 50 PM" src="https://github.com/user-attachments/assets/714c4809-0cfc-44c1-a41d-1dac07724827" />


## Features

- **Spotify OAuth login** (Authorization Code + PKCE flow)
- **Now Playing** view with live updates
- Time-period insights:
  - Last 4 weeks
  - Last 6 months
  - Last 12 months
- Top tracks & top artists
- Card-based UI with smooth animations
- Automatic token refresh & session handling

---

## Tech Stack

| Layer                   | Technology                          |
| ----------------------- | ----------------------------------- |
| Framework               | Next.js                             |
| UI                      | React 19, Tailwind CSS 4, shadcn/ui |
| Icons                   | Lucide                              |
| Data fetching / Caching | TanStack Query                      |
| Auth                    | Spotify Web API (PKCE)              |
| Animations              | React Spring                        |
| Runtime                 | Bun / Node                          |

---

## Getting Started

### Prerequisites

- Node.js 20+ or Bun
- A Spotify Developer account
- PostgreSQL database (local Docker or Supabase)

### 1. Clone the repository

```bash
git clone https://github.com/taddmtii/Soundprint.git
cd Soundprint
```

### 2. Install dependencies

bun install | npm install

### 3. Setup env variables

Create a .env file in the root:

SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/api/auth/callback

Note: you must also register the app in the Spotify Developer Dashbaord and add the redirect URI above.

### 4. Run the development server

bun dev | npm run dev

Note: If you would like access to this app as a test user without creating your own spotify app, please reach out to me through my email which can be found through my personal portfolio website. (taddtrumbull.com)

# Frontend One

A full-stack developer portfolio and publishing workspace built with the Next.js
App Router. The public experience combines curated case studies and articles
with responsive motion, accessible navigation, and persistent light, dark, and
system themes. An optional Express backend adds authentication, community posts,
author-owned content management, and Cloudinary image uploads.

## Highlights

- Responsive portfolio with six data-driven case studies
- Curated articles alongside live community posts from `Backend-1`
- Searchable and sortable portfolio and article archives
- Persistent light, dark, and system themes
- Email/password authentication with access-token refresh
- Protected dashboard for drafting, publishing, editing, and deleting posts
- Cloudinary uploads for AVIF, GIF, JPEG, PNG, and WebP images up to 5 MB
- Keyboard-friendly navigation and reduced-motion support

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16.3 App Router |
| UI | React 19.2, Tailwind CSS 4, CSS Modules |
| Quality | ESLint 9 with `eslint-config-next` |
| Backend integration | Next.js Route Handlers and server-only fetch helpers |
| Backend-1 | Express 5, MongoDB/Mongoose, JWT, Multer, Cloudinary |

## Architecture

The browser only communicates with this Next.js application. Same-origin Route
Handlers under `/api` forward requests to the server-only `BACKEND_API_URL`, so
the backend URL and authentication tokens are never exposed to client code.

```text
Browser
  |-- App Router pages and client components
  `-- /api/* Route Handlers
        |-- HttpOnly access and refresh cookies
        `-- Backend-1 Express API
              |-- MongoDB (users and posts)
              `-- Cloudinary (gallery images)
```

Access and refresh tokens are stored in `HttpOnly`, `SameSite=Lax` cookies.
Protected requests automatically attempt one refresh-token rotation after an
expired access token. In production, the cookies are also marked `Secure`.

## Getting started

### Requirements

- Node.js 20.9 or newer
- npm
- The sibling `Backend-1` project, MongoDB, and Cloudinary credentials only if
  you want to use the connected features

### Run the frontend

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The curated portfolio,
articles, about page, and contact page work without `Backend-1`. When the backend
is offline, the live community feed reports that it is unavailable and connected
account features cannot be used.

### Run the full stack

The expected local layout is:

```text
Backend-projects/
  |-- Backend-1/
  `-- frontend-1/
```

Configure `Backend-1/.env` with its MongoDB, JWT, and Cloudinary values, then
start the API in a separate terminal:

```bash
cd ../Backend-1
npm install
npm run dev
```

By default, the frontend connects to `http://localhost:8080`. Change
`BACKEND_API_URL` in `.env.local` if the API is hosted elsewhere:

```dotenv
BACKEND_API_URL=http://localhost:8080
```

`BACKEND_API_URL` is server-only; do not prefix it with `NEXT_PUBLIC_`.

## Application routes

| Route | Description |
| --- | --- |
| `/` | Interactive landing page and selected work |
| `/about` | Profile, capabilities, principles, and current focus |
| `/portfolio` | Searchable portfolio archive |
| `/portfolio/[slug]` | Data-driven project case study |
| `/blogs` | Curated article archive and live community feed |
| `/blogs/[slug]` | Curated article detail |
| `/blogs/community/[id]` | Published post loaded from `Backend-1` |
| `/contact` | Presentation-only contact page |
| `/login` | Account sign-in |
| `/register` | Account registration |
| `/dashboard` | Authenticated post and media workspace |

## API bridge

| Frontend endpoint | Backend-1 endpoint | Access |
| --- | --- | --- |
| `POST /api/auth/register` | `POST /api/v1/test1/register` | Public |
| `POST /api/auth/login` | `POST /api/v1/test1/login` | Public |
| `GET /api/auth/session` | `GET /api/v1/test1/token` | Authenticated |
| `POST /api/auth/logout` | Clears frontend cookies | Authenticated |
| `GET /api/blogposts` | `GET /api/v1/blogposts` | Public |
| `GET /api/blogposts/[id]` | `GET /api/v1/blogposts/:id` | Public |
| `GET /api/blogposts?mine=true` | `GET /api/v1/blogposts/mine` | Authenticated |
| `POST /api/blogposts` | `POST /api/v1/blogposts` | Authenticated |
| `PATCH /api/blogposts/[id]` | `PATCH /api/v1/blogposts/:id` | Authenticated |
| `DELETE /api/blogposts/[id]` | `DELETE /api/v1/blogposts/:id` | Authenticated |
| `POST /api/gallery/upload` | `POST /api/v1/gallery/upload` | Authenticated |

Signing out clears the frontend cookies. `Backend-1` does not currently expose
a logout or revocation endpoint, so its refresh token remains valid until it is
rotated, replaced by another login, or expires.

## Project structure

```text
src/
  app/          App Router pages, layouts, and Route Handlers
  components/   Feature and shared presentation components
  data/         Curated portfolio, article, and profile content
  lib/          Server-only backend, authentication, and response helpers
public/         Static assets
```

The public content is centralized in:

- `src/data/projects.js` for portfolio projects
- `src/data/blogPosts.js` for curated articles
- `src/data/siteSeed.js` for profile, services, and focus content

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server with Turbopack |
| `npm run lint` | Run ESLint |
| `npm run build -- --webpack` | Create the production build with webpack |
| `npm run start` | Serve an existing production build |

Before submitting changes, run:

```bash
npm run lint
npm run build -- --webpack
git diff --check
```

# Frontend-1

Frontend-1 is a Next.js App Router site integrated with the sibling `Backend-1`
Express API. It includes a portfolio and article experience plus real
authentication, author-owned blog management, and Cloudinary gallery uploads.

## Stack

- Next.js 16.3 and React 19.2
- Tailwind CSS 4
- Backend-1: Express, MongoDB/Mongoose, JWT, Multer, and Cloudinary

## How the integration works

The browser calls same-origin Route Handlers under `/api`. Those handlers call
Backend-1 using the server-only `BACKEND_API_URL` value. Access and refresh JWTs
are stored in `HttpOnly`, `SameSite=Lax` cookies, and expired access tokens are
rotated through Backend-1 before a protected request is retried.

This arrangement means Backend-1 does not need browser-facing CORS configuration
for this frontend, and JWTs are not exposed to client JavaScript or local storage.

## Local setup

Requirements:

- Node.js 20.9 or newer
- MongoDB configuration and JWT secrets in `../Backend-1/.env`
- Cloudinary credentials in `../Backend-1/.env` to use uploads

Install dependencies in both projects:

```bash
cd ../Backend-1
npm install

cd ../frontend-1
npm install
```

Copy the frontend environment example and change the URL if Backend-1 uses a
different host or port:

```bash
cp .env.example .env.local
```

Run Backend-1 in one terminal:

```bash
cd ../Backend-1
npm run dev
```

Run Frontend-1 in another terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Connected features

| Frontend surface | Backend-1 endpoint |
| --- | --- |
| Register | `POST /api/v1/test1/register` |
| Sign in | `POST /api/v1/test1/login` |
| Session check | `GET /api/v1/test1/token` |
| Automatic token rotation | `POST /api/v1/test1/refresh` |
| Public live posts | `GET /api/v1/blogposts` and `GET /api/v1/blogposts/:id` |
| Dashboard post management | `GET /mine`, `POST`, `PATCH`, and `DELETE` under `/api/v1/blogposts` |
| Gallery upload | `POST /api/v1/gallery/upload` |

Signing out clears the frontend token cookies. Backend-1 does not currently
provide a logout/revocation endpoint, so the refresh token remains valid on the
server until it is rotated, replaced by another login, or expires.

## Main routes

| URL | Purpose |
| --- | --- |
| `/` | Landing page |
| `/about` | About page |
| `/portfolio` | Portfolio index and case studies |
| `/blogs` | Curated articles and live Backend-1 published posts |
| `/blogs/community/:id` | One live Backend-1 article |
| `/contact` | Contact page |
| `/login` | Sign in |
| `/register` | Create an account |
| `/dashboard` | Authenticated blog and gallery workspace |

## Commands

```bash
npm run dev
npm run lint
npm run build -- --webpack
npm run start
```

# Frontend-1

Frontend-1 is a frontend-only Next.js learning project. It currently uses the App Router, JavaScript, and Tailwind CSS. The initial pages and navigation are in place; backend integration, authentication logic, and real data have not been added yet.

## Tech stack

- Next.js 16.3
- React 19.2
- JavaScript
- Tailwind CSS 4
- ESLint 9
- npm

## Requirements

- Node.js 20.9 or newer
- npm

## Getting started

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Current routes

Next.js creates routes from folders inside `src/app`. Each public route contains a `page.js` file.

| File | URL | Current page |
| --- | --- | --- |
| `src/app/page.js` | `/` | Landing page and navigation |
| `src/app/about/page.js` | `/about` | About page |
| `src/app/contact/page.js` | `/contact` | Contact page |
| `src/app/blogs/page.js` | `/blogs` | Blog page |
| `src/app/login/page.js` | `/login` | Login page placeholder |

## Project structure

```text
Frontend-1/
├── public/                 # Static assets
├── src/
│   └── app/
│       ├── about/
│       │   └── page.js
│       ├── blogs/
│       │   └── page.js
│       ├── contact/
│       │   └── page.js
│       ├── login/
│       │   └── page.js
│       ├── globals.css     # Global styles and Tailwind import
│       ├── layout.js       # Root layout shared by every page
│       └── page.js         # Landing page
├── next.config.mjs
└── package.json
```

## Adding a route

Create a folder inside `src/app` and add a `page.js` file. For example, `src/app/services/page.js` creates the `/services` route:

```jsx
export default function ServicesPage() {
  return <h1 className="text-4xl font-bold">Services</h1>;
}
```

Use Next.js `Link` to navigate without reloading the whole page:

```jsx
import Link from "next/link";

<Link href="/services">Services</Link>;
```

## Available commands

```bash
npm run dev      # Start the development server
npm run lint     # Check the code with ESLint
npm run build    # Create a production build
npm run start    # Run the production build
```

## Current status

- App Router configured
- Landing, About, Contact, Blogs, and Login routes created
- Navigation links added to the landing page
- Tailwind CSS available for styling
- Frontend only; no backend connection yet

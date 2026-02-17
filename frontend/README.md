# CCIS Open Data Portal — Frontend

## What is this

This folder contains the frontend application for the CCIS Open Data Portal. It's a React + Vite single-page application that talks to a CKAN backend to list and explore datasets, organizations, and groups.

## Key features

- Browse and search datasets
- Organization and group listings
- Dataset detail views with resource previews
- Responsive UI with a small design system (CSS variables)

## Developer quickstart

Prerequisites:

- Node.js 16+ (recommended)
- npm or yarn
- Optional: Docker (to run the CKAN backend locally)

Clone and install:

```bash
git clone <repo-url>
cd ccis-open-data-portal/frontend
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app in your browser at the address printed by Vite (typically http://localhost:5173).

## Backend notes

This frontend expects a CKAN backend. The repository includes a `backend/ckan` folder with docker-compose manifests to run CKAN, Postgres, and Nginx. See `backend/ckan/README.md` for instructions to bring the backend up locally.

## Configuration

- API client settings are in `src/api/ckan.js`.
- Adjust the CKAN base URL or Vite proxy if your backend runs on a different origin.

## Important files & structure

- `src/main.jsx` — app entry and router
- `src/App.jsx` — layout and route registration
- `src/pages/` — page-level route components (Home, Search, DatasetDetail, Orgs, Groups)
- `src/components/` — reusable components (cards, loading, error, analytics)
- `src/api/ckan.js` — CKAN API wrappers
- `src/styles/` — design tokens and layout utilities

## Development notes

- Uses `@tanstack/react-query` for fetching and caching API data. Use query invalidation after mutations to refresh UI.
- Placeholders and small SVG assets live in `src/assets/`.
- Centralize design changes in `src/styles/base.css` (colors, spacing, typography).

## Build & test

- Build for production: `npm run build`
- Run tests (if available): `npm test`

## Contributing

- Follow the formatting and lint rules in `package.json` scripts.
- For UI changes prefer updating design tokens first.

## Next steps I can take

- Add `./.env.example` and Vite proxy example
- Add a CONTRIBUTING.md with a recommended workflow
- Add a short guide to run the backend locally using Docker

## License

See the repository root for license details.

If you'd like, I can also add a short troubleshooting section or expand the developer guide with exact backend docker commands.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

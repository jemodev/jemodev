# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Astro, TailwindCSS, and TypeScript. The site is designed as a single-page application displaying professional experience, projects, and personal information. Content is dynamically fetched from a WordPress backend running at `http://localhost:10003`.

## Development Commands

All commands use `pnpm` as the package manager:

- **Install dependencies**: `pnpm install`
- **Start dev server**: `pnpm dev` (starts at `localhost:4321`)
- **Build for production**: `pnpm build` (outputs to `./dist/`)
- **Preview production build**: `pnpm preview`
- **Run Astro CLI commands**: `pnpm astro ...` (e.g., `pnpm astro add`, `pnpm astro check`)

## Architecture

### Content Management System Integration

The site fetches content from a local WordPress instance at `http://localhost:10003` via REST API:
- **About page**: `/wp-json/wp/v2/pages?slug=about`
- **Experience items**: `/wp-json/wp/v2/experiences`
- **Project items**: `/wp-json/wp/v2/projects`

All data fetching happens at build time using Astro's server-side rendering. The WordPress backend must be running during development and build.

### Data Validation

The codebase uses Zod schemas (via `astro:content`) for runtime type validation of all API responses. Key schemas are defined in `src/types/index.ts`:
- `BaseWPSchema`: Base WordPress entity with id, title, content, and optional featured images
- `ExperienceItemSchema`: Extends base schema with ACF fields (rol, working_time, url) and technologies array
- `ProjectItemSchema`: Extends base schema with ACF url field, featured images, and technologies array

### Component Structure

Components are organized by feature:
- `src/components/ui/`: Reusable UI components (Header, Footer, Logo, Navigation)
- `src/components/experience/`: Experience-related components (Experiences container, ExperienceItem)
- `src/components/project/`: Project-related components (Projects container, ProjectItem)

### Layout System

The site uses a single layout (`src/layouts/Layout.astro`) with:
- Responsive two-column design (sidebar header on large screens, stacked on mobile)
- Custom spotlight effect following mouse movement (desktop only)
- Intersection Observer-based navigation active state management
- Smooth scroll behavior between sections

### Path Aliases

TypeScript path aliases are configured in `tsconfig.json`:
- `@/*` maps to `src/*` for clean imports (e.g., `import Layout from "@/layouts/Layout.astro"`)

### Styling

The project uses TailwindCSS v4 integrated via Vite plugin. Global styles are in `src/styles/global.css`. The design follows a dark theme with:
- Primary background: `slate-900`
- Text: `slate-400`
- Accent color: `teal` for highlights and selections

### Icons

Icons are managed through the `astro-icon` integration with support for:
- Octicons (`octicon:*`)
- Simple Icons (`simple-icons:*`)

Icon configuration is in `astro.config.mjs`.

## Key Files

- `src/pages/index.astro`: Main page that composes all sections
- `src/types/index.ts`: All Zod schemas for API response validation
- `src/layouts/Layout.astro`: Site layout with spotlight effect and navigation logic
- `astro.config.mjs`: Astro configuration with TailwindCSS and icon integrations

## Dependencies

External fonts loaded from Google Fonts:
- Outfit (weights 100-900)
- PT Sans (400, 700)

Lucide icons loaded from CDN in the layout.

## Important Notes

- The WordPress backend at `http://localhost:10003` must be running for the site to build successfully
- All content validation is strict - API responses must match Zod schemas or builds will fail
- The site uses Astro's strict TypeScript configuration (`astro/tsconfigs/strict`)
- Section IDs (`about`, `experience`, `projects`) are used for scroll navigation and must match nav link hrefs

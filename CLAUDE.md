# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog built with Astro, TailwindCSS, and WordPress as a headless CMS. The project fetches content from WordPress REST API and renders it as a static/SSR site deployed to Netlify.

## Development Commands

Package manager: **pnpm**

```bash
# Install dependencies
pnpm install

# Start development server at localhost:4321
pnpm dev

# Build for production (outputs to ./dist/)
pnpm build

# Preview production build locally
pnpm preview

# Run Astro CLI commands
pnpm astro ...
```

## Architecture Overview

### WordPress Headless CMS Integration

The entire content system is powered by WordPress REST API (`/wp-json/wp/v2`):

- **Posts**: Blog articles with categories and featured images
- **Projects**: Portfolio projects with ACF (Advanced Custom Fields) for URLs
- **Experience**: Work experience entries with ACF for role, working time, and URL

All WordPress data is validated using Zod schemas defined in `src/types/index.ts`. Each schema extends `BaseWPSchema` which includes common WordPress fields (id, slug, title, content, featured_images).

Key schemas:
- `PostItemSchema` - Blog posts with date and post_categories
- `ProjectItemSchema` - Projects with ACF URL and technologies array
- `ExperienceItemSchema` - Work experience with ACF (rol, working_time, url) and technologies

### Content Fetching Pattern

Content is fetched from WordPress API using the `API_URL` environment variable:

```typescript
const url = `${import.meta.env.API_URL}/posts`;
const response = await fetch(url);
const json = await response.json();
const data = PostsSchema.safeParse(json);
```

Always use `.safeParse()` to validate API responses and redirect to 404 on validation failure.

### Code Highlighting

Blog posts use **Shiki** for syntax highlighting. The implementation is in `src/pages/blog/[slug].astro`:

1. Create highlighter with supported languages and theme
2. Process HTML content from WordPress to find `<pre><code class="language-xxx">` blocks
3. Decode HTML entities and highlight with Shiki
4. Fallback to 'text' language if the specified language is unsupported

Supported languages: javascript, typescript, jsx, tsx, cpp, c, php, html, css, scss, json, bash, shell, sql, markdown, yaml, xml.

### Layout System

Two main layouts:
- `Layout.astro` - Main layout with spotlight effect, navigation intersection observer, and two-column desktop layout (header sidebar + main content)
- `PostLayout.astro` - Extends Layout for blog post pages

The layout uses a sticky header on desktop (`lg:sticky lg:top-0`) and implements:
- Mouse-following spotlight effect (desktop only)
- Intersection observer for active navigation state
- Custom scrollbar styling

### Rendering Mode

Blog post pages use `export const prerender = false` for SSR because they need to fetch dynamic content from WordPress at request time.

### Image Handling

Remote images from WordPress are allowed via `image.domains` in `astro.config.mjs`:
- `localhost:10003` (development)
- `linen-antelope-447525.hostingersite.com` (production)

Use Astro's `Picture` component with formats `["avif", "webp"]` for optimized images.

### Styling Approach

- TailwindCSS v4 via Vite plugin (not PostCSS)
- Global styles in `src/styles/global.css`
- Inline styles for WordPress content (`.post-content` classes in `[slug].astro`)
- Spanish locale for dates (`formatDate` helper uses "es-ES")

### Path Aliases

Import paths use `@/*` alias mapped to `src/*`:

```typescript
import PostLayout from "@/layouts/PostLayout.astro";
import { type Post } from "@/types";
```

## Environment Configuration

Two environment files:

**`.env.development`**
```env
API_URL=http://localhost:10003/wp-json/wp/v2
```

**`.env.production`**
```env
API_URL=https://linen-antelope-447525.hostingersite.com/wp-json/wp/v2
```

The API_URL changes between local WordPress development and production Hostinger WordPress instance.

## Deployment

### Platform: Netlify

The project uses **Netlify** with the `@astrojs/netlify` adapter for SSR support.

### Deployment Process

Git-driven deployment - pushing to the main branch automatically triggers a build:

1. Push commits to main branch
2. Netlify webhook triggers build process
3. Runs: `pnpm run build`
4. Astro builds with SSR support via Netlify adapter
5. Output published from `./dist/` directory
6. Site live at production URL

### Build Configuration

Netlify configuration (`.netlify/netlify.toml`):

- **Build Command**: `pnpm run build`
- **Publish Directory**: `dist/`
- **Functions Directory**: `netlify/functions/` (currently unused)
- **Cache Strategy**: Astro assets (`/_astro/*`) cached for 1 year with immutable flag

### Environment Variables for Production

Required environment variables must be set in Netlify dashboard:

- `API_URL` - WordPress REST API endpoint (production: `https://linen-antelope-447525.hostingersite.com/wp-json/wp/v2`)
- `HOME_URL` - Production homepage URL (optional, defined in `.env.production`)

**Note**: `.env.production` is gitignored. Netlify reads environment variables from its dashboard, not from the file.

### Image Optimization

Remote images are whitelisted in `astro.config.mjs`:
- Development: `localhost:10003`
- Production: `linen-antelope-447525.hostingersite.com`

Netlify configuration also defines these as `remote_images` patterns for optimization.

### SSR Rendering

Pages with `export const prerender = false` (like `blog/[slug].astro`) are rendered server-side at request time via Netlify Functions, allowing dynamic content fetching from WordPress.

## Key Technical Decisions

1. **SSR Support**: Uses `@astrojs/netlify` adapter for server-side rendering on Netlify
2. **Icon System**: Uses `astro-icon` with Octicon and Simple Icons collections
3. **Type Safety**: Strict TypeScript config extending `astro/tsconfigs/strict`
4. **Content Validation**: All external data validated with Zod before use
5. **Spanish Locale**: Site language is Spanish ("es-ES" for dates, lang="es" in HTML)

## Component Organization

```
src/components/
├── blog/        # Post listing, categories, meta info
├── experience/  # Work experience timeline
├── project/     # Portfolio projects showcase
└── ui/          # Header, footer, navigation, logo
```

Components follow Astro's convention: data fetching in frontmatter, rendering in template.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start Commands

- **Dev server**: `npm run dev` - Start Next.js dev server with Turbopack
- **Build**: `npm run build` - Production build with Turbopack
- **Start**: `npm start` - Run production server
- **Lint**: `npm run lint` - Run ESLint
- **Format**: `npm run format` - Format all files with Prettier
- **Format check**: `npm run format:check` - Check if files are formatted
- **Test**: `npm run test` - Run Vitest tests
- **Test single file**: `npm run test -- path/to/file.test.tsx`
- **Pre-commit hooks**: `npm run pre-commit` - Runs lint-staged

## Project Architecture

### Stack
- **Framework**: Next.js 16 (App Router, Server Components enabled)
- **Styling**: Tailwind CSS v4 with PostCSS
- **CMS**: Sanity for blog content management
- **Testing**: Vitest with jsdom for component testing
- **Linting**: ESLint with Next.js config + Prettier for formatting
- **CI/CD**: Husky for git hooks (pre-commit, pre-push)

### Directory Structure

```
src/app/
├── _components/        # Reusable React components (Header, Hero, Card, etc.)
├── _hooks/             # Custom React hooks
├── _skeletons/         # Loading skeleton components
├── _models/            # TypeScript types/interfaces (Post, Footer, etc.)
├── _utils/             # Utilities (Sanity client, constants)
├── layout.tsx          # Root layout with Header and Footer
├── page.tsx            # Home page
├── [slug]/page.tsx     # Dynamic post pages (for blog articles)
├── not-found.tsx       # 404 page
└── globals.css         # Global Tailwind styles
```

### Key Patterns

**Component Organization**: Each component in `_components/` follows this structure:
- `ComponentName/ComponentName.tsx` - Main component file
- `ComponentName/index.ts` - Barrel export for clean imports
- All components are re-exported in `_components/index.ts` for cleaner imports (`@components`)

**TypeScript Path Aliases** (in tsconfig.json):
- `@/*` → `src/*` (root alias)
- `@components` → `src/app/_components/index`
- `@hooks` → `src/app/_hooks/index`
- `@utils/sanityClient` → `src/app/_utils/sanity`
- `@skeletons` → `src/app/_skeletons/index`
- `@models` → `src/app/_models/index`

**Async/Server Components**: Most page components and data-fetching components are async (e.g., `MainBlogList` fetches from Sanity). Use `Suspense` with skeleton loaders for proper UX.

### Sanity Integration

- **Client setup**: `src/app/_utils/sanity.ts` exports `sanityClient` and `builder` (for image URLs)
- **Environment variables**: 
  - `NEXT_PUBLIC_SANITY_PROJECT_ID` (public)
  - `NEXT_PUBLIC_SANITY_DATASET` (defaults to 'development', public)
- **Image handling**: Use Sanity's image URL builder to optimize images. Images from Sanity CDN are whitelisted in `next.config.ts`

### Styling

- **Tailwind CSS v4**: All styling is utility-based
- **Global styles**: `src/app/globals.css` 
- **Font**: Roboto from Google Fonts (400, 700 weights) via Next.js font optimization
- **Icons**: Font Awesome v7 with React integration (pre-configured to prevent CSS duplication in layout.tsx)

### Testing

- **Test environment**: jsdom (configured in vitest.config.mts)
- **Test discovery**: Files named `*.test.tsx` or `*.test.ts`
- **React Testing Library**: Available for component testing (`@testing-library/react`)
- **Test co-location**: Place test files next to the component they test (e.g., `Card.tsx` + `Card.test.tsx`)
- **Example**: `src/app/_components/Card/Card.test.tsx`

### Custom Hooks

- **Location**: `src/app/_hooks/`
- **Pattern**: Each custom hook gets its own file
- **Export**: Re-export all hooks from `_hooks/index.ts` for clean imports via `@hooks`
- **Import**: `import { useCustomHook } from '@hooks'`

## Git Workflow

**Pre-commit hook** (Husky + lint-staged):
- Auto-formats changed files with Prettier

**Pre-push hook**:
- Runs `npm run lint` - ensures no linting errors
- Runs `npm run format:check` - ensures code is formatted

## Code Style & Standards

- **ESLint rules**:
  - Strict TypeScript mode enabled
  - Unused variables are errors (`@typescript-eslint/no-unused-vars`)
  - Next.js core web vitals
  - Prettier integration (no conflicting rules)
- **Import style**: Use path aliases when available; prefer named exports from component indices
- **TypeScript**: Strict mode enabled; all types should be properly typed

## Environment Setup

The project requires `.env` file with Sanity credentials:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset name (optional, defaults to 'development')

Note: These are public environment variables (prefixed with `NEXT_PUBLIC_`), so they can be committed to version control.

## Notes for Future Development

- The app uses Next.js Server Components by default. Client components are opt-in with `'use client'`
- The `[slug]/page.tsx` handles dynamic routing for blog posts
- The app is built with Turbopack for faster builds and development
- Consider using Suspense + skeleton components for better perceived performance when fetching from Sanity

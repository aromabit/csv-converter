# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production (static export)
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm typecheck` - Type check with TypeScript

## Architecture

This is a Next.js 15 application with React 19 that builds a static export for CSV conversion functionality. The app uses App Router and is configured for static site generation.

### Key Configuration
- **Static Export**: Configured with `output: "export"` for static hosting
- **Base Path**: Uses `/csv-converter` base path in production
- **Package Manager**: Uses pnpm (version 10.18.2)

### Structure
- `app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with header and main container
  - `page.tsx` - Main page with CSV upload form
- `components/` - Reusable UI components
  - `form.tsx` - Contains Button component with inline styles

### Styling Approach
Uses inline styles throughout the application instead of CSS modules or external stylesheets. All components include style objects for consistent theming.

### TypeScript Configuration
- Strict mode disabled (`"strict": false`)
- Target ES2017 with DOM libraries
- Configured for Next.js with appropriate plugins
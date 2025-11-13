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

This is a Next.js 15 application with React 19 specialized for CSV conversion of CMOS Image sensor data. The app builds to a static export and uses App Router.

### Application Purpose
The application converts CSV files containing CMOS Image sensor data by:
1. Parsing raw CSV data and extracting sensor readings (excluding timestamps)
2. Allowing users to define custom formats for data selection
3. Converting data based on selected format configurations
4. Exporting converted data as downloadable CSV files
5. Displaying sensor data as visual grid representations

### Key Configuration
- **Static Export**: Configured with `output: "export"` for static hosting
- **Base Path**: Uses `/csv-converter` base path in production
- **Package Manager**: Uses pnpm (version 10.19.0)
- **TypeScript**: Strict mode disabled, targets ES2017

### Core Data Flow
1. **File Upload**: Users upload CSV files containing sensor data
2. **Data Processing**: `utilities/csv.ts` extracts raw data rows (skipping first 2 header rows)
3. **Format Management**: Users create/select formats stored in localStorage via `utilities/storage.ts`
4. **Data Conversion**: Selected sensor indexes are mapped to new CSV structure
5. **Export**: Converted data downloads as UTF-8 BOM CSV file

### Component Architecture
- `app/page.tsx` - Main page combining ImageViewer and Converter
- `components/converter.tsx` - Core conversion logic and file handling
- `components/image-viewer.tsx` - Visual grid display of sensor data
- `components/features/` - Format management (form, list)
- `components/modules/` - Reusable UI modules (dialogs, buttons)
- `utilities/` - Pure functions for CSV processing, storage, math operations

### Data Types
- `Format` - Configuration for data conversion with selectedIndexes array
- CSV data structure includes timestamps (column 0) and sensor readings (columns 1+)
- Supports square grid detection for visualization (√n x √n sensor arrays)

### Styling Approach
Uses inline styles throughout instead of CSS modules. All components include style objects for consistent theming with a light gray color scheme.
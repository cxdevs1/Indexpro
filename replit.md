# INDEXPRO Dashboard

## Overview
A React-based high-fidelity dashboard for tracking stock index potential vacancies (S&P 400), replacement candidates, and market analytics.

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives, shadcn/ui components
- **Charts**: Recharts

## Project Structure
```
├── src/
│   ├── components/
│   │   ├── figma/          # Figma-related components
│   │   ├── ui/             # Reusable UI components (shadcn/ui)
│   │   ├── BenchLeaderboard.tsx
│   │   ├── ExecutionDeck.tsx
│   │   ├── TopNavigation.tsx
│   │   └── VacancyMonitor.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css
├── index.html
├── package.json
└── vite.config.ts
```

## Development
- **Run locally**: `npm run dev`
- **Build for production**: `npm run build`
- **Dev server port**: 5000

## Deployment
This is a static frontend application. The build output is in the `build/` directory.

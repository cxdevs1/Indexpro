# INDEXPRO Dashboard

## Overview
A React-based high-fidelity dashboard for tracking stock index potential vacancies (S&P 400), replacement candidates, and market analytics with a Flask API backend.

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives, shadcn/ui components
- **Charts**: Recharts
- **Backend**: Flask with Flask-CORS
- **Data Processing**: pandas

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
├── main.py                 # Flask API backend
├── index.html
├── package.json
└── vite.config.ts
```

## API Endpoints

### GET /api/vacancy
Returns a list of potential vacancy risk cards.
```json
[{"ticker": "SNV", "price": 45.20, "riskTag": "M&A TARGET", "riskType": "ma", "probability": 92}]
```

### GET /api/bench
Returns ranked replacement candidates with fit scores.
```json
[{"rank": 1, "ticker": "PATH", "name": "UiPath Inc", "fitScore": 100, "gaapProfitable": true, "marketCap": true, "liquidity": true, "upside": 12.5}]
```

### GET /api/execution/<ticker>
Returns live-simulated volume data for a specific stock.
```json
{"projectedVolume": 39400000, "currentVolume": 26800000, "avgDailyVolume": 4200000}
```

## Fit Score Calculation
- Profitability (GAAP): +40 points
- Market Cap Valid: +30 points
- Liquidity Valid: +20 points
- Sector Match: +10 points
- Maximum Score: 100 points

## Development
- **Frontend**: `npm run dev` (port 5000)
- **Backend**: `python main.py` (port 8000)
- **Build for production**: `npm run build`

### Vite Proxy Configuration
The frontend uses a Vite proxy to route `/api/*` requests to the backend at `localhost:8000`, avoiding CORS issues during development.

## Recent Changes
- **2024-12-24**: Connected React frontend to Flask backend
  - BenchLeaderboard.tsx fetches from `/api/bench`
  - VacancyMonitor.tsx fetches from `/api/vacancy`
  - ExecutionDeck.tsx fetches from `/api/execution/<ticker>`
  - Added loading states with "Scanning Market Data..." message

## Deployment
Frontend is deployed as a static site. Build output is in the `build/` directory.

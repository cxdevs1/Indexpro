import { Filter } from 'lucide-react';

interface RiskCard {
  ticker: string;
  price: number;
  riskTag: string;
  riskType: 'ma' | 'marketcap';
  probability: number;
}

const riskCards: RiskCard[] = [
  { ticker: 'SNV', price: 45.20, riskTag: 'M&A TARGET', riskType: 'ma', probability: 92 },
  { ticker: 'ZION', price: 38.75, riskTag: 'MARKET CAP < $5B', riskType: 'marketcap', probability: 78 },
  { ticker: 'CBSH', price: 52.10, riskTag: 'M&A TARGET', riskType: 'ma', probability: 85 },
  { ticker: 'FNB', price: 13.45, riskTag: 'MARKET CAP < $5B', riskType: 'marketcap', probability: 71 },
  { ticker: 'UMBF', price: 89.30, riskTag: 'M&A TARGET', riskType: 'ma', probability: 68 },
  { ticker: 'WTFC', price: 75.85, riskTag: 'MARKET CAP < $5B', riskType: 'marketcap', probability: 82 },
];

export function VacancyMonitor() {
  return (
    <div className="h-full bg-slate rounded-[var(--radius-tight)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-hover">
        <h3 className="text-off-white">Potential Vacancies (S&P 400)</h3>
        <button className="p-1 hover:bg-slate-hover rounded-[var(--radius-tight)] transition-colors">
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Risk Cards List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {riskCards.map((card) => (
          <div
            key={card.ticker}
            className="bg-charcoal p-3 rounded-[var(--radius-tight)] border border-slate-hover hover:bg-slate-hover transition-colors cursor-pointer"
          >
            {/* Row 1: Ticker + Price */}
            <div className="flex items-center justify-between mb-2">
              <span className="mono text-off-white">{card.ticker}</span>
              <span className="mono text-sm text-off-white">${card.price.toFixed(2)}</span>
            </div>

            {/* Row 2: Risk Tag */}
            <div className="mb-2">
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs mono ${
                  card.riskType === 'ma'
                    ? 'bg-alarming-red/20 text-alarming-red border border-alarming-red/30'
                    : 'bg-orange/20 text-orange border border-orange/30'
                }`}
              >
                {card.riskTag}
              </span>
            </div>

            {/* Row 3: Probability */}
            <div className="text-sm text-text-secondary">
              Probability: <span className="text-off-white mono">{card.probability}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

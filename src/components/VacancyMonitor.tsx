import { Filter } from 'lucide-react';
import { useState, useEffect } from 'react';

interface RiskCard {
  ticker: string;
  price: number;
  riskTag: string;
  riskType: string;
  probability: number;
}

export function VacancyMonitor() {
  const [riskCards, setRiskCards] = useState<RiskCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/vacancy');
        const data = await response.json();
        setRiskCards(data);
      } catch (error) {
        console.error('Error fetching vacancy data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, []);

  if (loading) {
    return (
      <div className="h-full bg-slate rounded-[var(--radius-tight)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-muted-blue text-sm mono animate-pulse">Scanning Market Data...</div>
        </div>
      </div>
    );
  }

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

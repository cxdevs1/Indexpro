import { Check } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Candidate {
  rank: number;
  ticker: string;
  name: string;
  fitScore: number;
  gaapProfitable: boolean;
  marketCap: boolean;
  liquidity: boolean;
  upside: number;
}

interface BenchLeaderboardProps {
  selectedTicker: string | null;
  onSelectTicker: (ticker: string) => void;
}

export function BenchLeaderboard({ selectedTicker, onSelectTicker }: BenchLeaderboardProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Tech', 'Healthcare', 'Industrial'];

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/bench');
        const data = await response.json();
        setCandidates(data);
      } catch (error) {
        console.error('Error fetching bench data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) {
    return (
      <div className="h-full bg-slate rounded-[var(--radius-tight)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-muted-blue text-lg mono animate-pulse">Scanning Market Data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate rounded-[var(--radius-tight)] flex flex-col overflow-hidden">
      {/* Header with Tabs */}
      <div className="border-b border-slate-hover">
        <div className="px-4 py-3">
          <h3 className="text-off-white mb-3">Replacement Candidates (Ranked)</h3>
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-[var(--radius-tight)] text-sm transition-colors ${
                  activeTab === tab
                    ? 'bg-muted-blue text-off-white'
                    : 'bg-charcoal text-text-secondary hover:bg-slate-hover'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-slate border-b border-slate-hover">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-text-secondary uppercase tracking-wider">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-xs text-text-secondary uppercase tracking-wider">
                Ticker
              </th>
              <th className="px-4 py-3 text-left text-xs text-text-secondary uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-center text-xs text-text-secondary uppercase tracking-wider">
                S&P Fit Score
              </th>
              <th className="px-4 py-3 text-center text-xs text-text-secondary uppercase tracking-wider">
                Eligibility Rules
              </th>
              <th className="px-4 py-3 text-right text-xs text-text-secondary uppercase tracking-wider">
                Upside
              </th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => {
              const isSelected = selectedTicker === candidate.ticker;
              const isTopRank = candidate.rank === 1;

              return (
                <tr
                  key={candidate.ticker}
                  onClick={() => onSelectTicker(candidate.ticker)}
                  className={`border-b border-slate-hover cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-hover'
                      : 'hover:bg-charcoal'
                  } ${
                    isTopRank && !isSelected
                      ? 'ring-1 ring-electric-green/30 shadow-[0_0_15px_rgba(0,230,118,0.15)]'
                      : ''
                  }`}
                >
                  {/* Rank */}
                  <td className="px-4 py-4">
                    <span className={`text-2xl mono ${isTopRank ? 'text-electric-green' : 'text-off-white'}`}>
                      #{candidate.rank}
                    </span>
                  </td>

                  {/* Ticker */}
                  <td className="px-4 py-4">
                    <span className="mono text-off-white">{candidate.ticker}</span>
                  </td>

                  {/* Name */}
                  <td className="px-4 py-4">
                    <span className="text-text-secondary">{candidate.name}</span>
                  </td>

                  {/* S&P Fit Score */}
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center">
                      <div className="relative w-12 h-12">
                        {/* Progress Ring */}
                        <svg className="w-12 h-12 transform -rotate-90">
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            className="text-slate-hover"
                          />
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray={`${(candidate.fitScore / 100) * 125.6} 125.6`}
                            className="text-electric-green"
                          />
                        </svg>
                        {/* Score Text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs mono text-off-white">{candidate.fitScore}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Eligibility Rules */}
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          candidate.gaapProfitable ? 'bg-electric-green' : 'bg-alarming-red'
                        }`}>
                          <Check className="w-3 h-3 text-charcoal" strokeWidth={3} />
                        </div>
                        <span className="text-[10px] text-text-secondary mt-1">GAAP</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          candidate.marketCap ? 'bg-electric-green' : 'bg-alarming-red'
                        }`}>
                          <Check className="w-3 h-3 text-charcoal" strokeWidth={3} />
                        </div>
                        <span className="text-[10px] text-text-secondary mt-1">Cap</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          candidate.liquidity ? 'bg-electric-green' : 'bg-alarming-red'
                        }`}>
                          <Check className="w-3 h-3 text-charcoal" strokeWidth={3} />
                        </div>
                        <span className="text-[10px] text-text-secondary mt-1">Liq</span>
                      </div>
                    </div>
                  </td>

                  {/* Upside */}
                  <td className="px-4 py-4 text-right">
                    <span className="mono text-electric-green">+{candidate.upside}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

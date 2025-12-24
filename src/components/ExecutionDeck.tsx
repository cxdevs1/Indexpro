import { useState, useEffect } from 'react';

interface ExecutionDeckProps {
  ticker: string;
  currentPrice: number;
}

interface VolumeData {
  projectedVolume: number;
  currentVolume: number;
  avgDailyVolume: number;
}

export function ExecutionDeck({ ticker, currentPrice }: ExecutionDeckProps) {
  const [shares, setShares] = useState('1000');
  const [exitTarget, setExitTarget] = useState('22.50');
  const [simulatedProfit, setSimulatedProfit] = useState<number | null>(null);
  const [volumeData, setVolumeData] = useState<VolumeData | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchVolumeData = async (isInitial: boolean = false) => {
      try {
        if (isInitial) setInitialLoading(true);
        const response = await fetch(`/api/execution/${ticker}`);
        const data = await response.json();
        setVolumeData(data);
      } catch (error) {
        console.error('Error fetching execution data:', error);
      } finally {
        if (isInitial) setInitialLoading(false);
      }
    };

    fetchVolumeData(true);

    const intervalId = setInterval(() => {
      fetchVolumeData(false);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [ticker]);

  const handleSimulate = () => {
    const sharesNum = parseFloat(shares) || 0;
    const exitNum = parseFloat(exitTarget) || 0;
    const profit = (exitNum - currentPrice) * sharesNum;
    setSimulatedProfit(profit);
  };

  const hours = 4;
  const minutes = 12;
  const seconds = 35;

  const formatVolume = (vol: number) => {
    if (vol >= 1000000) {
      return `${(vol / 1000000).toFixed(1)}M`;
    }
    return vol.toLocaleString();
  };

  const projectedVol = volumeData?.projectedVolume || 39400000;
  const currentVol = volumeData?.currentVolume || 26800000;
  const progressPercent = (currentVol / projectedVol) * 100;

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Widget 1: Liquidity Gap */}
      <div className="bg-slate rounded-[var(--radius-tight)] p-4 border border-slate-hover">
        <h4 className="text-text-secondary mb-3">Projected Buying Pressure</h4>
        
        {initialLoading ? (
          <div className="text-muted-blue text-sm mono animate-pulse">Loading...</div>
        ) : (
          <>
            {/* Big Metric */}
            <div className="mb-2">
              <div className="mono text-off-white" style={{ fontSize: '32px', lineHeight: '1.2' }}>
                {formatVolume(projectedVol)}
              </div>
              <div className="text-sm text-text-secondary">Shares</div>
            </div>

            <div className="text-sm text-text-secondary mb-3">Required Passive Inflow</div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-text-secondary mono">
                <span>Current Vol</span>
                <span>Required Vol</span>
              </div>
              <div className="h-2 bg-charcoal rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-muted-blue to-electric-green" 
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mono">
                <span className="text-muted-blue">{formatVolume(currentVol)}</span>
                <span className="text-electric-green">{formatVolume(projectedVol)}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Widget 2: Countdown */}
      <div className="bg-slate rounded-[var(--radius-tight)] p-4 border border-slate-hover">
        <h4 className="text-text-secondary mb-3">Time to Market On Close (MOC)</h4>
        
        {/* Digital Clock */}
        <div className="flex items-center justify-center gap-1 mono" style={{ fontSize: '36px', lineHeight: '1' }}>
          <span className="text-off-white">{String(hours).padStart(2, '0')}</span>
          <span className="text-text-secondary">:</span>
          <span className="text-off-white">{String(minutes).padStart(2, '0')}</span>
          <span className="text-text-secondary">:</span>
          <span className="text-off-white">{String(seconds).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Widget 3: Scenario Calculator */}
      <div className="bg-slate rounded-[var(--radius-tight)] p-4 border border-slate-hover flex-1">
        <h4 className="text-text-secondary mb-3">Scenario Calculator</h4>
        
        {/* Current Position */}
        <div className="mb-4 p-3 bg-charcoal rounded-[var(--radius-tight)] border border-slate-hover">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-text-secondary">Ticker</span>
            <span className="mono text-off-white">{ticker}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-text-secondary">Current Price</span>
            <span className="mono text-off-white">${currentPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-sm text-text-secondary mb-1">My Shares</label>
            <input
              type="text"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              className="w-full bg-charcoal border border-slate-hover rounded-[var(--radius-tight)] px-3 py-2 text-off-white mono focus:outline-none focus:border-muted-blue"
              placeholder="1000"
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-1">Exit Target ($)</label>
            <input
              type="text"
              value={exitTarget}
              onChange={(e) => setExitTarget(e.target.value)}
              className="w-full bg-charcoal border border-slate-hover rounded-[var(--radius-tight)] px-3 py-2 text-off-white mono focus:outline-none focus:border-muted-blue"
              placeholder="22.50"
            />
          </div>
        </div>

        {/* Simulate Button */}
        <button
          onClick={handleSimulate}
          className="w-full bg-muted-blue hover:bg-muted-blue/80 text-off-white py-2.5 rounded-[var(--radius-tight)] transition-colors mb-3"
        >
          Simulate Profit
        </button>

        {/* Result */}
        {simulatedProfit !== null && (
          <div className="p-3 bg-charcoal rounded-[var(--radius-tight)] border border-electric-green/30">
            <div className="text-sm text-text-secondary mb-1">Projected Profit/Loss</div>
            <div className={`mono text-2xl ${simulatedProfit >= 0 ? 'text-electric-green' : 'text-alarming-red'}`}>
              {simulatedProfit >= 0 ? '+' : ''}${simulatedProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

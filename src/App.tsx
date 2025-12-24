import { useState } from 'react';
import { TopNavigation } from './components/TopNavigation';
import { VacancyMonitor } from './components/VacancyMonitor';
import { BenchLeaderboard } from './components/BenchLeaderboard';
import { ExecutionDeck } from './components/ExecutionDeck';

interface TickerData {
  ticker: string;
  price: number;
}

const tickerPrices: Record<string, number> = {
  'PATH': 17.50,
  'BILL': 58.30,
  'MNDY': 145.20,
  'PCTY': 168.75,
  'EEFT': 94.40,
  'WEX': 187.90,
};

export default function App() {
  const [selectedTicker, setSelectedTicker] = useState<string>('PATH');

  const currentTickerData: TickerData = {
    ticker: selectedTicker,
    price: tickerPrices[selectedTicker] || 0,
  };

  return (
    <div className="h-screen flex flex-col bg-charcoal">
      {/* Top Navigation */}
      <TopNavigation />

      {/* Main Workspace */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex gap-4 p-4">
          {/* Left Column: Vacancy Monitor (20%) */}
          <div className="w-[20%] flex-shrink-0">
            <VacancyMonitor />
          </div>

          {/* Center Column: Bench Leaderboard (55%) */}
          <div className="w-[55%] flex-shrink-0">
            <BenchLeaderboard
              selectedTicker={selectedTicker}
              onSelectTicker={setSelectedTicker}
            />
          </div>

          {/* Right Column: Execution Deck (25%) */}
          <div className="w-[25%] flex-shrink-0">
            <ExecutionDeck
              ticker={currentTickerData.ticker}
              currentPrice={currentTickerData.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

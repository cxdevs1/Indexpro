import { Bell, Search, User } from 'lucide-react';

export function TopNavigation() {
  return (
    <nav className="h-[60px] bg-slate border-b border-slate-hover flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex-shrink-0">
        <h1 className="tracking-[0.2em]">INDEXPRO</h1>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search Ticker or Index..."
            className="w-full bg-charcoal border border-slate-hover rounded-[var(--radius-tight)] pl-10 pr-4 py-2 text-off-white placeholder:text-text-secondary focus:outline-none focus:border-muted-blue"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Live Data Toggle */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-charcoal rounded-[var(--radius-tight)] border border-electric-green">
          <div className="w-2 h-2 rounded-full bg-electric-green animate-pulse"></div>
          <span className="text-sm text-electric-green mono">Live Data: ON</span>
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-slate-hover rounded-[var(--radius-tight)] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-alarming-red rounded-full"></span>
        </button>

        {/* User Profile */}
        <button className="p-2 hover:bg-slate-hover rounded-[var(--radius-tight)] transition-colors">
          <User className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}

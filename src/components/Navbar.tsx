import { History, RefreshCw, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenHistory: () => void;
  historyCount: number;
  onReset: () => void;
  isAnalyzing: boolean;
  activeTab?: 'detector' | 'methodology';
  onTabChange?: (tab: 'detector' | 'methodology') => void;
}

export function Navbar({
  onOpenHistory,
  historyCount,
  onReset,
  isAnalyzing,
  activeTab = 'detector',
  onTabChange,
}: NavbarProps) {
  return (
    <div className="w-full sticky top-0 z-40">
      {/* Top Superhuman Pill Announcement Banner */}
      <div 
        id="announcement-banner"
        className="w-full bg-[#421d24] text-white py-2.5 px-4 text-xs font-[460] flex items-center justify-center gap-2 text-center"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#d4c7ff]" />
        <span className="text-white/90">
          Superhuman Editorial Engine: Multi-source factual grounding & sentiment scoring
        </span>
        <button
          type="button"
          onClick={() => onTabChange && onTabChange('methodology')}
          className="ml-2 px-2.5 py-0.5 rounded-full border border-white/30 hover:border-white text-[11px] text-white font-[500] hover:bg-white/10 transition-all cursor-pointer inline-flex items-center gap-1"
        >
          <span>Methodology</span>
          <span>&rarr;</span>
        </button>
      </div>

      {/* Sticky Navigation Header with backdrop-blur */}
      <header 
        id="main-header" 
        className="w-full h-16 bg-[#f2f0eb]/85 backdrop-blur-md border-b border-[#e3e3e2] transition-colors"
      >
        <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
          {/* Brand Identity */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={onReset}
            id="brand-logo"
          >
            <div className="w-8 h-8 rounded-full bg-[#421d24] text-white flex items-center justify-center text-sm font-serif font-bold shadow-xs group-hover:bg-[#0c4243] transition-colors">
              V
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-[460] text-xl tracking-[-0.022em] text-[#292827]">
                Veritas
              </span>
              <span className="text-xs font-[460] text-[#666666] tracking-tight">
                Editorial
              </span>
            </div>
          </div>

          {/* Center Navigation Links at 16px / weight 460 */}
          <div className="hidden sm:flex items-center gap-8 h-full">
            <button
              type="button"
              onClick={() => {
                if (onTabChange) onTabChange('detector');
                onReset();
              }}
              className={`h-full flex items-center text-[15px] font-[460] transition-colors px-1 cursor-pointer ${
                activeTab === 'detector'
                  ? 'text-[#292827] border-b-2 border-[#421d24] font-[500]'
                  : 'text-[#666666] hover:text-[#292827]'
              }`}
            >
              Credibility Detector
            </button>

            <button
              type="button"
              onClick={() => onTabChange && onTabChange('methodology')}
              className={`h-full flex items-center text-[15px] font-[460] transition-colors px-1 cursor-pointer ${
                activeTab === 'methodology'
                  ? 'text-[#292827] border-b-2 border-[#421d24] font-[500]'
                  : 'text-[#666666] hover:text-[#292827]'
              }`}
            >
              Methodology
            </button>

            <button
              type="button"
              onClick={onOpenHistory}
              className="h-full flex items-center text-[15px] font-[460] text-[#666666] hover:text-[#292827] transition-colors px-1 cursor-pointer"
            >
              <span>Recent Scans</span>
              {historyCount > 0 && (
                <span className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-[#d4c7ff] text-[#292827]">
                  {historyCount}
                </span>
              )}
            </button>
          </div>

          {/* Right Action Controls: Ghost and Lilac Outlined */}
          <div className="flex items-center gap-3">
            <button
              id="btn-new-analysis"
              type="button"
              onClick={onReset}
              disabled={isAnalyzing}
              className="text-xs font-[460] text-[#292827] hover:text-[#714cb6] transition-colors px-2 py-1.5 cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
              title="Reset input"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin text-[#714cb6]' : ''}`} />
              <span className="hidden sm:inline">Reset</span>
            </button>

            {/* Lilac Mist outlined button */}
            <button
              id="btn-open-history"
              type="button"
              onClick={onOpenHistory}
              className="px-4 py-1.5 bg-[#d4c7ff] text-[#292827] border border-[#292827] rounded-lg text-xs font-[500] hover:bg-[#c7b6ff] transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <History className="w-3.5 h-3.5 text-[#292827]" />
              <span>Archive</span>
              {historyCount > 0 && (
                <span className="ml-1 w-4 h-4 rounded-full bg-[#421d24] text-white text-[10px] font-mono flex items-center justify-center">
                  {historyCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

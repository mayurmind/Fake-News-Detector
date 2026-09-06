import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ExternalLink, Calendar, ShieldCheck, AlertOctagon, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { AnalysisResult } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: AnalysisResult[];
  onSelectResult: (result: AnalysisResult) => void;
  onClearHistory: () => void;
  onDeleteHistoryItem: (id: string) => void;
}

export function HistoryDrawer({
  isOpen,
  onClose,
  history,
  onSelectResult,
  onClearHistory,
  onDeleteHistoryItem,
}: HistoryDrawerProps) {
  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'VERIFIED_TRUE':
      case 'LIKELY_AUTHENTIC':
        return <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />;
      case 'MIXED_OR_MISLEADING':
        return <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />;
      case 'QUESTIONABLE':
      case 'CONFIRMED_FALSE':
      default:
        return <AlertOctagon className="w-4 h-4 text-rose-700 shrink-0" />;
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 75) return 'bg-emerald-50 text-emerald-800 border border-emerald-200';
    if (score >= 50) return 'bg-amber-50 text-amber-800 border border-amber-200';
    return 'bg-rose-50 text-rose-800 border border-rose-200';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            id="history-backdrop"
            className="fixed inset-0 bg-[#292827]/40 backdrop-blur-xs" 
            onClick={onClose} 
          />

          {/* Drawer Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            id="history-drawer-panel"
            className="relative z-10 w-full max-w-md bg-white h-full border-l border-[#e3e3e2] flex flex-col"
          >
            {/* Drawer Header */}
            <div className="p-5 sm:p-6 border-b border-[#e3e3e2] flex items-center justify-between">
              <div>
                <div className="text-xs font-[500] uppercase tracking-wider text-[#714cb6] mb-0.5">Session Archive</div>
                <h3 className="text-lg font-[460] text-[#292827]">Analysis History</h3>
              </div>
              <div className="flex items-center gap-2">
                {history.length > 0 && (
                  <button
                    type="button"
                    id="btn-clear-all-history"
                    onClick={onClearHistory}
                    className="text-xs text-[#666666] hover:text-[#421d24] p-1.5 rounded hover:bg-[#f2f0eb] transition-colors"
                    title="Clear all saved history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  id="btn-close-history"
                  onClick={onClose}
                  className="text-[#666666] hover:text-[#292827] p-1.5 rounded hover:bg-[#f2f0eb] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {history.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center text-[#666666] p-4">
                  <ShieldCheck className="w-10 h-10 mb-2 stroke-1 text-[#666666]/40" />
                  <p className="text-sm font-[500] text-[#292827]">No verification history yet</p>
                  <p className="text-xs text-[#666666] mt-1 max-w-xs leading-relaxed font-[460]">
                    Inspect any news article or claim to review factual assertions and trusted citations here.
                  </p>
                </div>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    id={`history-item-${item.id}`}
                    className="group p-4 rounded-[12px] border border-[#e3e3e2] bg-[#f2f0eb]/50 hover:bg-white hover:border-[#714cb6]/40 transition-all relative"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {getVerdictIcon(item.verdict)}
                        <span className="font-[500] text-xs text-[#292827] truncate">
                          {item.articleTitle}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-[500] shrink-0 ${getScoreBadge(item.credibilityScore)}`}>
                        {item.credibilityScore}%
                      </span>
                    </div>

                    <p className="text-xs text-[#666666] line-clamp-2 mb-2 leading-relaxed font-[460]">
                      {item.verdictReasoning}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-[#666666] pt-2 border-t border-[#e3e3e2]">
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3 text-[#714cb6]" />
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectResult(item);
                            onClose();
                          }}
                          className="text-[#714cb6] hover:underline font-[500] text-xs inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Review</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteHistoryItem(item.id);
                          }}
                          className="text-[#666666] hover:text-rose-700 transition-colors p-1 cursor-pointer"
                          title="Delete entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

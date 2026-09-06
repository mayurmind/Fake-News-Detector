import { Flag, CheckSquare, Sparkles } from 'lucide-react';
import { LinguisticFlag } from '../types';

interface LinguisticFlagsCardProps {
  flags: LinguisticFlag[];
  recommendations: string[];
}

export function LinguisticFlagsCard({ flags, recommendations }: LinguisticFlagsCardProps) {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'medium':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'low':
      default:
        return 'bg-[#d4c7ff]/40 text-[#292827] border-[#d4c7ff]';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Linguistic Markers Card */}
      <div id="linguistic-flags-card" className="bg-white rounded-[16px] border border-[#e3e3e2] p-6 sm:p-7">
        <div className="pb-4 mb-5 border-b border-[#e3e3e2]">
          <div className="text-xs font-[500] uppercase tracking-wider text-[#714cb6] mb-1">
            Structural Anomaly Detection
          </div>
          <h3 className="text-xl font-[460] text-[#292827] tracking-[-0.022em] flex items-center gap-2">
            <Flag className="w-4 h-4 text-[#714cb6]" />
            <span>Linguistic & Rhetorical Signals</span>
          </h3>
        </div>

        {flags.length === 0 ? (
          <p className="text-xs text-[#666666] italic py-4 font-[460]">No suspicious linguistic flags detected.</p>
        ) : (
          <div className="space-y-3">
            {flags.map((flag, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[12px] bg-[#f2f0eb]/50 border border-[#e3e3e2] flex items-start justify-between gap-3 text-xs"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-[600] text-[#292827]">{flag.flag}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-[500] uppercase tracking-wider border ${getSeverityBadge(
                        flag.severity
                      )}`}
                    >
                      {flag.severity === 'high' ? 'High Concern' : flag.severity === 'medium' ? 'Moderate' : 'Low Impact'}
                    </span>
                  </div>
                  <p className="text-[#666666] leading-relaxed font-[460]">{flag.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reader Recommendations Checklist */}
      <div id="recommendations-card" className="bg-white rounded-[16px] border border-[#e3e3e2] p-6 sm:p-7">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#e3e3e2]">
          <div>
            <div className="text-xs font-[500] uppercase tracking-wider text-[#714cb6] mb-1">
              Due Diligence
            </div>
            <h3 className="text-xl font-[460] text-[#292827] tracking-[-0.022em] flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-[#714cb6]" />
              <span>Recommended Reader Verification</span>
            </h3>
          </div>
          <Sparkles className="w-4 h-4 text-[#714cb6]" />
        </div>

        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="p-3.5 rounded-[12px] bg-[#f2f0eb]/50 border border-[#e3e3e2] flex items-start gap-3 text-xs"
            >
              <div className="w-5 h-5 rounded-full bg-[#421d24] text-white flex items-center justify-center font-[600] font-mono text-[10px] shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-[#292827] leading-relaxed font-[460]">
                {rec}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { CheckCircle2, XCircle, AlertTriangle, HelpCircle, Target } from 'lucide-react';
import { FactClaim } from '../types';

interface ClaimsListProps {
  claims: FactClaim[];
}

export function ClaimsList({ claims }: ClaimsListProps) {
  const getClaimVerdictConfig = (verdict: string) => {
    switch (verdict) {
      case 'TRUE':
        return {
          label: 'Verified True',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
        };
      case 'FALSE':
        return {
          label: 'False / Debunked',
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          icon: <XCircle className="w-3.5 h-3.5 text-rose-700 shrink-0" />
        };
      case 'MISLEADING':
        return {
          label: 'Misleading Context',
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
        };
      case 'UNVERIFIED':
      default:
        return {
          label: 'Unsubstantiated',
          bg: 'bg-[#f2f0eb] text-[#292827] border-[#e3e3e2]',
          icon: <HelpCircle className="w-3.5 h-3.5 text-[#666666] shrink-0" />
        };
    }
  };

  return (
    <div id="claims-factcheck-container" className="bg-white rounded-[16px] border border-[#e3e3e2] p-6 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-[#e3e3e2]">
        <div>
          <div className="text-xs font-[500] uppercase tracking-wider text-[#714cb6] mb-1">
            Claim-by-Claim Breakdown
          </div>
          <h3 className="text-xl font-[460] text-[#292827] tracking-[-0.022em] flex items-center gap-2">
            <Target className="w-4 h-4 text-[#714cb6]" />
            <span>Extracted Assertions & Verification</span>
          </h3>
        </div>
        <span className="text-xs font-[500] uppercase tracking-wider px-3 py-1 rounded-full bg-[#f2f0eb] text-[#292827] border border-[#e3e3e2]">
          {claims.length} Core {claims.length === 1 ? 'Claim' : 'Claims'} Tested
        </span>
      </div>

      <div className="space-y-3.5">
        {claims.map((item, index) => {
          const config = getClaimVerdictConfig(item.verdict);
          return (
            <div
              key={item.id || index}
              id={`claim-card-${index}`}
              className="p-4 sm:p-5 rounded-[12px] border border-[#e3e3e2] bg-[#f2f0eb]/40 hover:bg-white hover:border-[#714cb6]/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-[500] text-[#666666] uppercase">
                  Assertion {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>

                <div className="flex items-center gap-2">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-[500] border ${config.bg}`}>
                    {config.icon}
                    <span>{config.label}</span>
                  </div>
                  {item.confidence && (
                    <span className="text-[11px] font-mono font-[500] text-[#666666] bg-white px-2 py-0.5 rounded-full border border-[#e3e3e2]">
                      {item.confidence}% Match
                    </span>
                  )}
                </div>
              </div>

              <blockquote className="text-sm font-[500] text-[#292827] mb-2.5 pl-3.5 border-l-2 border-[#714cb6] italic leading-relaxed">
                "{item.claim}"
              </blockquote>

              <p className="text-xs text-[#666666] leading-relaxed font-[460]">
                <span className="font-[600] text-[#292827]">Factual Assessment: </span>
                {item.explanation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

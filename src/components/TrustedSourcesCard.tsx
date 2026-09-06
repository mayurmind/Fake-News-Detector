import { ExternalLink, ShieldCheck, CheckCircle, XCircle, HelpCircle, Search } from 'lucide-react';
import { TrustedCitation } from '../types';

interface TrustedSourcesCardProps {
  citations: TrustedCitation[];
  searchQueries?: string[];
}

export function TrustedSourcesCard({ citations, searchQueries }: TrustedSourcesCardProps) {
  const getBadgeForStance = (stance: string) => {
    switch (stance) {
      case 'REFUTES':
        return {
          label: 'REFUTES',
          color: 'text-rose-800 bg-rose-50 border border-rose-200',
          icon: <XCircle className="w-3.5 h-3.5 text-rose-700 shrink-0" />
        };
      case 'SUPPORTS':
        return {
          label: 'CORROBORATES',
          color: 'text-emerald-800 bg-emerald-50 border border-emerald-200',
          icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
        };
      default:
        return {
          label: 'CONTEXT',
          color: 'text-[#292827] bg-[#d4c7ff]/40 border border-[#d4c7ff]',
          icon: <HelpCircle className="w-3.5 h-3.5 text-[#714cb6] shrink-0" />
        };
    }
  };

  const getReliabilityBadge = (rating: string) => {
    switch (rating) {
      case 'FACT_CHECKER':
        return 'IFCN Verified Fact Checker';
      case 'OFFICIAL_SOURCE':
        return 'Official Institution';
      case 'ACADEMIC':
        return 'Peer-Reviewed Literature';
      case 'ESTABLISHED_MEDIA':
      default:
        return 'Accredited News Wire';
    }
  };

  // Generate a clean 2-character monogram for publisher icon
  const getMonogram = (publisher: string) => {
    const parts = publisher.replace(/[^a-zA-Z0-9\s]/g, '').trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return publisher.slice(0, 2).toUpperCase();
  };

  return (
    <div id="trusted-sources-card" className="bg-white rounded-[16px] border border-[#e3e3e2] p-6 sm:p-7 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-[#e3e3e2]">
        <div>
          <div className="text-xs font-[500] uppercase tracking-wider text-[#714cb6] mb-1">
            Ground Truth Cross-Reference
          </div>
          <h3 className="text-xl font-[460] text-[#292827] tracking-[-0.022em] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#714cb6]" />
            <span>Accredited Supporting Sources</span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-[500] uppercase tracking-wider px-3 py-1 rounded-full bg-[#f2f0eb] text-[#292827] border border-[#e3e3e2]">
            {citations.length} {citations.length === 1 ? 'Source' : 'Sources'} Cited
          </span>
        </div>
      </div>

      {/* Grounding Search Queries (if available) */}
      {searchQueries && searchQueries.length > 0 && (
        <div className="mb-5 p-3.5 rounded-[12px] bg-[#f2f0eb]/70 border border-[#e3e3e2] text-xs">
          <div className="flex items-center gap-1.5 text-[#292827] font-[500] mb-2">
            <Search className="w-3.5 h-3.5 text-[#714cb6]" />
            <span className="text-xs font-[500] uppercase tracking-wider text-[#666666]">Live Search Grounding Queries Executed:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchQueries.map((query, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-white border border-[#e3e3e2] text-[#292827] font-mono text-[11px]"
              >
                "{query}"
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Citations List */}
      {citations.length === 0 ? (
        <div className="p-8 text-center text-[#666666] text-xs font-[460]">
          No external citations were linked for this specific claim.
        </div>
      ) : (
        <div className="space-y-3">
          {citations.map((citation, index) => {
            const stance = getBadgeForStance(citation.supportsOrRefutes);
            const reliability = getReliabilityBadge(citation.reliabilityRating);
            const monogram = getMonogram(citation.publisher);

            return (
              <div
                key={citation.id || index}
                id={`citation-item-${index}`}
                className="p-4 sm:p-5 border border-[#e3e3e2] rounded-[12px] bg-[#f2f0eb]/40 hover:bg-white hover:border-[#714cb6]/40 transition-all flex flex-col sm:flex-row items-start gap-4"
              >
                {/* Monogram Box in Superhuman style */}
                <div className="w-10 h-10 bg-[#d4c7ff]/50 rounded-[10px] shrink-0 flex items-center justify-center font-[600] text-[#421d24] font-mono text-xs border border-[#d4c7ff]">
                  {monogram}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h4 className="text-sm font-[600] text-[#292827] truncate">
                      {citation.publisher}
                    </h4>
                    <span className="text-[11px] font-[460] text-[#666666] bg-white border border-[#e3e3e2] px-2 py-0.5 rounded-full">
                      {reliability}
                    </span>
                  </div>

                  <p className="text-xs font-[500] text-[#292827] mb-1">
                    {citation.title}
                  </p>

                  <p className="text-xs text-[#666666] italic mb-2.5 leading-relaxed font-[460]">
                    "{citation.snippet}"
                  </p>

                  {citation.url && (
                    <a
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-[500] text-[#714cb6] hover:underline underline-offset-2 transition-colors cursor-pointer"
                    >
                      <span>Read verification archive</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Stance tag badge */}
                <div className={`px-2.5 py-1 rounded-full text-xs font-[500] uppercase tracking-wider shrink-0 self-start ${stance.color}`}>
                  {stance.label}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

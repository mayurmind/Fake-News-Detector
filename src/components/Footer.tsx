import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onSelectMethodology?: () => void;
  onOpenRecentScans?: () => void;
  onResetScan?: () => void;
}

export function Footer({ onSelectMethodology, onOpenRecentScans, onResetScan }: FooterProps) {
  return (
    <footer id="superhuman-footer" className="w-full bg-[#421d24] text-white py-16 px-4 sm:px-8 mt-24">
      <div className="max-w-[1200px] mx-auto">
        {/* Top Brand & Announcement Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 bg-[#d4c7ff] rounded-md flex items-center justify-center text-[#421d24] font-bold text-xs">
                V
              </div>
              <span className="text-xl tracking-tight font-[460] text-white">
                Veritas AI
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/80 font-mono">
                Editorial Verifier
              </span>
            </div>
            <p className="text-sm text-white/70 max-w-md leading-relaxed font-[460]">
              The golden hour editorial suite for misinformation analysis, factual verification, and sentiment deconstruction.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onResetScan}
              className="px-4 py-2.5 bg-[#d4c7ff] text-[#292827] rounded-lg text-xs font-[500] hover:bg-white transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Analyze New Article</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4-Column Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 py-12">
          {/* Column 1: Products */}
          <div>
            <h4 className="text-xs font-[700] uppercase tracking-wider text-white mb-4">
              Products
            </h4>
            <ul className="space-y-3 text-xs font-[460] text-white/70">
              <li>
                <button
                  type="button"
                  onClick={onResetScan}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Credibility Detector
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Sentiment Engine
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Live Grounding Index
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Linguistic Anomaly Filter
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Cross-Citation Archive
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Automated Fact Deconstruction
                </span>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h4 className="text-xs font-[700] uppercase tracking-wider text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-3 text-xs font-[460] text-white/70">
              <li>
                <button
                  type="button"
                  onClick={onSelectMethodology}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Verification Methodology
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  IFCN Fact-Check Standards
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Polarity & Emotion Taxonomy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Empirical Fact Ratios
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Search Grounding Integration
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Machine Learning Model Card
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Tools & History */}
          <div>
            <h4 className="text-xs font-[700] uppercase tracking-wider text-white mb-4">
              Session Tools
            </h4>
            <ul className="space-y-3 text-xs font-[460] text-white/70">
              <li>
                <button
                  type="button"
                  onClick={onOpenRecentScans}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Recent Scan Archive
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Export PDF Summary
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Preset Claim Test Library
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Batch URL Inspector
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Confidence Interval Diagnostics
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Source Reliability Matrix
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Standards */}
          <div>
            <h4 className="text-xs font-[700] uppercase tracking-wider text-white mb-4">
              Transparency
            </h4>
            <ul className="space-y-3 text-xs font-[460] text-white/70">
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Data Privacy Protocol
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Zero Retained Input Data
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Algorithmic Neutrality
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  Open Source Attribution
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-default">
                  AI Ethics Review Board
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & status row */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-[460]">
          <p>© {new Date().getFullYear()} Veritas Editorial Suite. Powered by Google Gemini.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-white/70">Grounding System Operational</span>
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="text-white/60">Superhuman Golden Hour Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { ArrowRight, ShieldCheck, Sparkles, Database } from 'lucide-react';

interface DeepLagoonBandProps {
  onStartAnalysis?: () => void;
  onExploreMethodology?: () => void;
}

export function DeepLagoonBand({ onStartAnalysis, onExploreMethodology }: DeepLagoonBandProps) {
  return (
    <section 
      id="deep-lagoon-feature-band"
      className="w-full bg-[#0c4243] text-white py-16 sm:py-20 px-4 sm:px-8 relative overflow-hidden my-12 rounded-2xl sm:rounded-3xl border border-[#0c4243]"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Half: Layered Translucent Geometric Art & Micro-Cards */}
        <div className="lg:col-span-6 relative flex items-center justify-center p-4">
          {/* Layered pastel/translucent cards overlaying */}
          <div className="relative w-full max-w-md h-72 sm:h-80">
            {/* Background glowing geometric layer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#714cb6]/20 via-[#d4c7ff]/15 to-transparent rounded-2xl transform -rotate-3 scale-95 border border-white/10" />

            {/* Lavender translucent block */}
            <div className="absolute top-4 left-4 right-8 p-5 bg-[#d4c7ff]/15 backdrop-blur-md rounded-2xl border border-white/20 transform rotate-1 shadow-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4c7ff]">
                  Semantic Grounding
                </span>
                <span className="w-2 h-2 rounded-full bg-[#d4c7ff] animate-ping" />
              </div>
              <p className="text-xs text-white/90 font-serif italic mb-2">
                "Cross-verifying journalistic provenance through real-time citation indexes..."
              </p>
              <div className="flex items-center gap-2 text-[10px] text-white/60 font-mono">
                <span>IFCN Compliant</span>
                <span>•</span>
                <span>Google Search Grounded</span>
              </div>
            </div>

            {/* Floating foreground paper card */}
            <div className="absolute bottom-4 right-4 left-8 p-5 bg-white text-[#292827] rounded-2xl shadow-xl border border-white/40 transform -rotate-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#421d24] text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-xs font-[700] text-[#292827]">
                    Multi-Dimensional Scoring
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#f2f0eb] text-[#421d24] font-[600]">
                  94% Match
                </span>
              </div>
              <p className="text-xs text-[#666666] leading-relaxed font-[460]">
                Deconstructs sensational bias, emotional triggers, and uncorroborated assertions with mathematical precision.
              </p>
            </div>
          </div>
        </div>

        {/* Right Half: Headline, body copy, and white-outlined button */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 text-xs font-[600] uppercase tracking-widest text-[#d4c7ff] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Research Standard</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-[460] text-white leading-tight tracking-[-0.027em] mb-4">
            Truth requires context, not just headlines.
          </h2>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-[460] mb-6 max-w-xl">
            Modern misinformation relies on subtle emotional framing and algorithmic distribution. Veritas applies multi-model linguistic decomposition and real-time news archive synthesis to restore clarity.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onStartAnalysis}
              className="px-5 py-3 bg-[#d4c7ff] text-[#292827] rounded-xl text-xs sm:text-sm font-[500] hover:bg-white transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Scan An Article Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onExploreMethodology}
              className="px-5 py-3 border border-white/30 text-white rounded-xl text-xs sm:text-sm font-[460] hover:bg-white/10 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Read Our Methodology</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

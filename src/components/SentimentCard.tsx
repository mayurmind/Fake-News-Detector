import { Activity, Gauge, Compass, MessageSquareQuote } from 'lucide-react';
import { motion } from 'motion/react';
import { SentimentAnalysis } from '../types';

interface SentimentCardProps {
  sentiment: SentimentAnalysis;
  factVsOpinion: {
    factsPercentage: number;
    opinionPercentage: number;
  };
}

export function SentimentCard({ sentiment, factVsOpinion }: SentimentCardProps) {
  // Safely parse sentiment score into an integer in range [-100, 100]
  const rawScore = Number(sentiment?.score ?? 0);
  let parsedScore = isNaN(rawScore) ? 0 : rawScore;
  // If model returned a normalized decimal in [-1, 1] like -0.6 or 0.8
  if (parsedScore > -1 && parsedScore < 1 && parsedScore !== 0) {
    parsedScore = Math.round(parsedScore * 100);
  }
  parsedScore = Math.max(-100, Math.min(100, Math.round(parsedScore)));

  // Convert -100..+100 score to 0..100% for the spectrum slider
  const normalizedSliderPosition = Math.max(0, Math.min(100, ((parsedScore + 100) / 200) * 100));

  // Determine sentiment label color & styling
  const getSentimentBadge = (label: string, score: number) => {
    if (score <= -25) {
      return {
        bg: 'bg-rose-50 border-rose-200 text-rose-800',
        dot: 'bg-rose-600',
        text: 'Hostile / Alarmist'
      };
    }
    if (score < -5) {
      return {
        bg: 'bg-amber-50 border-amber-200 text-amber-800',
        dot: 'bg-amber-600',
        text: 'Critical / Skeptical'
      };
    }
    if (score <= 10) {
      return {
        bg: 'bg-[#f2f0eb] border-[#e3e3e2] text-[#292827]',
        dot: 'bg-[#714cb6]',
        text: 'Dispassionate / Objective'
      };
    }
    if (score <= 35) {
      return {
        bg: 'bg-[#d4c7ff]/40 border-[#d4c7ff] text-[#292827]',
        dot: 'bg-[#714cb6]',
        text: 'Constructive / Positive'
      };
    }
    return {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      dot: 'bg-emerald-600',
      text: 'Strongly Promotional'
    };
  };

  const badge = getSentimentBadge(sentiment.label, parsedScore);

  return (
    <div id="sentiment-analysis-card" className="bg-white rounded-[16px] border border-[#e3e3e2] p-6 sm:p-7">
      {/* Section title in Superhuman quiet voice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-[#e3e3e2]">
        <div>
          <div className="text-xs font-[500] uppercase tracking-wider text-[#714cb6] mb-1">
            Linguistic Tone & Bias
          </div>
          <h3 className="text-xl font-[460] text-[#292827] tracking-[-0.022em] flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#714cb6]" />
            <span>Sentiment & Objectivity Evaluation</span>
          </h3>
        </div>

        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-[500] border ${badge.bg}`}>
          <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
          <span>{badge.text}</span>
        </div>
      </div>

      {/* Dual metric row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-[12px] bg-[#f2f0eb]/60 border border-[#e3e3e2]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-[500] text-[#292827]">Factual Objectivity</span>
            <span className="text-sm font-[500] text-[#714cb6] font-mono">
              {factVsOpinion.factsPercentage}%
            </span>
          </div>
          <div className="text-xs text-[#666666] font-[460] mb-3">
            {factVsOpinion.factsPercentage >= 70
              ? 'Predominantly verifiable empirical claims & direct citations.'
              : 'Contains notable editorial framing and subjective opinion.'}
          </div>
          <div className="h-1.5 w-full bg-[#e3e3e2] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#421d24] transition-all duration-700"
              style={{ width: `${factVsOpinion.factsPercentage}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-[12px] bg-[#f2f0eb]/60 border border-[#e3e3e2]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-[500] text-[#292827]">Sensationalism / Urgency</span>
            <span className={`text-sm font-[500] font-mono ${sentiment.sensationalismScore > 50 ? 'text-rose-700' : 'text-[#292827]'}`}>
              {sentiment.sensationalismScore}%
            </span>
          </div>
          <div className="text-xs text-[#666666] font-[460] mb-3">
            {sentiment.sensationalismScore > 50
              ? 'Elevated alarmist framing, superlative rhetoric, or clickbait patterns.'
              : 'Measured, sober delivery with minimal rhetorical distortion.'}
          </div>
          <div className="grid grid-cols-4 h-1.5 gap-1">
            <div className={`rounded-full ${sentiment.sensationalismScore > 10 ? (sentiment.sensationalismScore > 60 ? 'bg-rose-600' : 'bg-[#714cb6]') : 'bg-[#e3e3e2]'}`} />
            <div className={`rounded-full ${sentiment.sensationalismScore > 35 ? (sentiment.sensationalismScore > 60 ? 'bg-rose-600' : 'bg-[#714cb6]') : 'bg-[#e3e3e2]'}`} />
            <div className={`rounded-full ${sentiment.sensationalismScore > 60 ? 'bg-rose-600' : 'bg-[#e3e3e2]'}`} />
            <div className={`rounded-full ${sentiment.sensationalismScore > 80 ? 'bg-rose-600' : 'bg-[#e3e3e2]'}`} />
          </div>
        </div>
      </div>

      {/* Primary Sentiment Score Slider (Polarity Spectrum) */}
      <div id="sentiment-polarity-spectrum" className="mb-6 p-4 rounded-[12px] bg-[#f2f0eb]/60 border border-[#e3e3e2]">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-[500] uppercase tracking-wider text-[#666666]">
              Polarity Spectrum
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-[500] uppercase tracking-wider border ${badge.bg}`}>
              {badge.text}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-sm font-[600] text-[#292827]">
              {parsedScore > 0 ? `+${parsedScore}` : parsedScore}
            </span>
            <span className="text-[#666666] text-xs font-mono">/ 100</span>
          </div>
        </div>

        {/* Spectrum bar container */}
        <div className="relative py-2.5 select-none">
          {/* Track bar */}
          <div className="relative h-2.5 w-full rounded-full bg-gradient-to-r from-rose-500 via-[#d4c7ff] to-emerald-500 shadow-inner">
            {/* Center Zero tick indicator (Neutral Baseline) */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-4 bg-[#292827] rounded-full z-10 opacity-70" 
              title="0 (Neutral Baseline)"
            />

            {/* Calibrated pointer thumb */}
            <motion.div
              initial={false}
              animate={{ left: `${normalizedSliderPosition}%` }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20"
              style={{ left: `${normalizedSliderPosition}%` }}
            >
              <div 
                className="w-5 h-5 rounded-full bg-white border-2 border-[#421d24] shadow-md ring-2 ring-white/90 flex items-center justify-center cursor-default transition-transform hover:scale-115"
                title={`Sentiment score: ${parsedScore > 0 ? `+${parsedScore}` : parsedScore} (${badge.text})`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#421d24]" />
              </div>
            </motion.div>
          </div>

          {/* Calibrated bottom scale with mathematically centered Neutral point */}
          <div className="relative flex justify-between items-center text-[11px] text-[#666666] mt-3 font-[460]">
            <span className="text-rose-700 font-[500] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 inline-block" />
              -100 (Alarmist / Hostile)
            </span>
            <span className="absolute left-1/2 -translate-x-1/2 text-[#292827] font-[600] flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-[#e3e3e2] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#714cb6] inline-block" />
              0 (Neutral)
            </span>
            <span className="text-emerald-700 font-[500] flex items-center gap-1">
              +100 (Promotional)
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            </span>
          </div>
        </div>
      </div>

      {/* Sub-metrics: Subjectivity, Emotional Intensity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Subjectivity */}
        <div className="p-4 rounded-[12px] border border-[#e3e3e2] bg-white flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-[500] text-[#292827] mb-1">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#714cb6]" />
              Subjectivity Index
            </span>
            <span className="font-mono font-[500] text-[#292827]">{sentiment.subjectivityScore}%</span>
          </div>
          <p className="text-xs text-[#666666] font-[460] mb-3">
            {sentiment.subjectivityScore > 65
              ? 'Predominantly interpretive opinion & personal speculation'
              : sentiment.subjectivityScore > 35
              ? 'Balanced blend of reported facts and editorial interpretation'
              : 'Strict empirical data points with minimal commentary'}
          </p>
          <div className="w-full bg-[#f2f0eb] h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#714cb6] rounded-full transition-all duration-500"
              style={{ width: `${sentiment.subjectivityScore}%` }}
            />
          </div>
        </div>

        {/* Emotional Intensity */}
        <div className="p-4 rounded-[12px] border border-[#e3e3e2] bg-white flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-[500] text-[#292827] mb-1">
            <span className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-[#714cb6]" />
              Emotional Intensity
            </span>
            <span className="font-mono font-[500] text-[#292827]">{sentiment.emotionalIntensity}%</span>
          </div>
          <p className="text-xs text-[#666666] font-[460] mb-3">
            {sentiment.emotionalIntensity > 65
              ? 'High psychological appeal designed to invoke emotional reaction'
              : sentiment.emotionalIntensity > 35
              ? 'Moderate descriptive pacing with evocative adjectives'
              : 'Calm, measured, dispassionate journalistic prose'}
          </p>
          <div className="w-full bg-[#f2f0eb] h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                sentiment.emotionalIntensity > 65 ? 'bg-rose-600' : 'bg-[#421d24]'
              }`}
              style={{ width: `${sentiment.emotionalIntensity}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tone & Triggers row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#e3e3e2]">
        <div>
          <span className="text-xs font-[500] uppercase tracking-wider text-[#666666] flex items-center gap-1.5 mb-2">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#714cb6]" />
            <span>Dominant Tone</span>
          </span>
          <p className="text-sm font-[460] text-[#292827] bg-[#f2f0eb]/60 px-3.5 py-2.5 rounded-[8px] border border-[#e3e3e2]">
            {sentiment.dominantTone}
          </p>
        </div>

        <div>
          <span className="text-xs font-[500] uppercase tracking-wider text-[#666666] block mb-2">
            Identified Emotional Triggers
          </span>
          <div className="flex flex-wrap gap-2">
            {sentiment.emotionalTriggers && sentiment.emotionalTriggers.length > 0 ? (
              sentiment.emotionalTriggers.map((trigger, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-[460] bg-rose-50 text-rose-800 border border-rose-200"
                >
                  {trigger}
                </span>
              ))
            ) : (
              <span className="text-xs text-[#666666] italic font-[460]">No overt manipulative cues detected.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Link, FileText, Trash2, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { PRESET_ARTICLES } from '../data/presets';
import { PresetArticle } from '../types';

interface ArticleInputFormProps {
  onAnalyze: (payload: { title: string; text: string; url: string }) => void;
  isAnalyzing: boolean;
  selectedPresetId?: string;
}

const ANALYSIS_STAGES = [
  'Extracting assertions & rhetorical markers...',
  'Cross-examining live news wires (AP, Reuters, BBC)...',
  'Analyzing sentiment polarity & emotional triggers...',
  'Computing composite credibility score...'
];

export function ArticleInputForm({ onAnalyze, isAnalyzing }: ArticleInputFormProps) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  // Rotate analysis progress text
  useEffect(() => {
    if (!isAnalyzing) {
      setCurrentStageIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => (prev + 1) % ANALYSIS_STAGES.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleSelectPreset = (preset: PresetArticle) => {
    setActivePreset(preset.id);
    setTitle(preset.title);
    setText(preset.content);
    setUrl(preset.url || '');
  };

  const handleClear = () => {
    setTitle('');
    setText('');
    setUrl('');
    setActivePreset(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim() || text.trim().length < 20 || isAnalyzing) return;
    onAnalyze({ title: title.trim(), text: text.trim(), url: url.trim() });
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const isFormValid = text.trim().length >= 20;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      id="article-input-container" 
      className="bg-white rounded-[16px] border border-[#e3e3e2] p-6 sm:p-8"
    >
      {/* Header section with Presets */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
          <div>
            <div className="text-xs font-[500] uppercase tracking-wider text-[#714cb6] mb-1">
              Editorial Verification
            </div>
            <h2 className="text-2xl sm:text-3xl font-[460] text-[#292827] tracking-[-0.022em]">
              Inspect Story & Verify Claims
            </h2>
            <p className="text-sm text-[#666666] font-[460] mt-1">
              Paste an article, quote, or social excerpt. Our engine decomposes claims, queries accredited wires, and evaluates emotional bias.
            </p>
          </div>
          <span className="text-xs font-[500] uppercase tracking-wider text-[#666666] self-start sm:self-auto">
            Sample Cases
          </span>
        </div>

        {/* Preset Suite Tab Strip in Superhuman style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_ARTICLES.map((preset) => {
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                id={`preset-btn-${preset.id}`}
                onClick={() => handleSelectPreset(preset)}
                className={`text-left p-3.5 rounded-[12px] border transition-all text-xs flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#292827] bg-[#d4c7ff]/40 text-[#292827]'
                    : 'border-[#e3e3e2] bg-[#f2f0eb]/50 hover:bg-white text-[#292827]'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-2 w-full">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-[500] uppercase tracking-wider ${
                      preset.badgeColor === 'emerald'
                        ? 'bg-emerald-100/70 text-emerald-800'
                        : preset.badgeColor === 'rose'
                        ? 'bg-rose-100/70 text-rose-800'
                        : preset.badgeColor === 'amber'
                        ? 'bg-amber-100/70 text-amber-800'
                        : 'bg-[#d4c7ff] text-[#292827]'
                    }`}
                  >
                    {preset.badgeText}
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#421d24] shrink-0" />}
                </div>
                <p className="font-[500] text-[#292827] line-clamp-1 mb-1">{preset.title}</p>
                <p className="text-[11px] text-[#666666] line-clamp-2 leading-relaxed">{preset.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Optional Headline & URL row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="article-title-input" className="block text-xs font-[500] uppercase tracking-wider text-[#666666] mb-1.5">
              Headline or Source <span className="text-[#666666]/70 font-normal lowercase">(optional)</span>
            </label>
            <input
              id="article-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Breaking: Scientists announce fusion breakthrough..."
              disabled={isAnalyzing}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#e3e3e2] rounded-[10px] focus:outline-none focus:border-[#714cb6] transition-colors text-[#292827] placeholder:text-[#666666]/60 font-[460]"
            />
          </div>

          <div>
            <label htmlFor="article-url-input" className="block text-xs font-[500] uppercase tracking-wider text-[#666666] mb-1.5 flex items-center gap-1">
              <Link className="w-3.5 h-3.5 text-[#714cb6]" />
              <span>Article URL <span className="text-[#666666]/70 font-normal lowercase">(optional)</span></span>
            </label>
            <input
              id="article-url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/story..."
              disabled={isAnalyzing}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#e3e3e2] rounded-[10px] focus:outline-none focus:border-[#714cb6] transition-colors text-[#292827] placeholder:text-[#666666]/60 font-[460]"
            />
          </div>
        </div>

        {/* Text Area for Article Text */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="article-content-input" className="block text-xs font-[500] uppercase tracking-wider text-[#666666]">
              Article Text or Claim Passage <span className="text-[#714cb6]">*</span>
            </label>
            <div className="text-xs text-[#666666] flex items-center gap-3">
              <span className="font-mono">{wordCount} words</span>
              <span>•</span>
              <span className="font-mono">{charCount} chars</span>
              {text.length > 0 && (
                <button
                  type="button"
                  id="btn-clear-input"
                  onClick={handleClear}
                  disabled={isAnalyzing}
                  className="text-[#666666] hover:text-[#421d24] transition-colors ml-1 inline-flex items-center gap-1 cursor-pointer font-[460]"
                  title="Clear text"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <textarea
              id="article-content-input"
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isAnalyzing}
              placeholder="Paste article text, statement transcript, or social post here (minimum 20 characters)..."
              className="w-full p-4 text-sm bg-white border border-[#e3e3e2] rounded-[12px] focus:outline-none focus:border-[#714cb6] transition-colors text-[#292827] placeholder:text-[#666666]/60 leading-relaxed resize-y font-[460]"
            />
          </div>

          {text.length > 0 && text.trim().length < 20 && (
            <p className="text-xs text-amber-700 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Please provide at least 20 characters for meaningful factual deconstruction.
            </p>
          )}
        </div>

        {/* Action Controls & Superhuman Midnight Wine Primary Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#666666] font-[460] flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#714cb6] shrink-0" />
            <span>Cross-checks IFCN verified fact-checkers, wire archives, and academic repositories.</span>
          </div>

          <button
            type="submit"
            id="btn-analyze-submit"
            disabled={!isFormValid || isAnalyzing}
            className="w-full sm:w-auto h-12 px-7 bg-[#421d24] hover:bg-[#34161c] text-white font-[460] text-sm rounded-[16px] flex items-center justify-center gap-2.5 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xs hover:-translate-y-0.5"
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-[#d4c7ff]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Deconstructing Article...</span>
              </>
            ) : (
              <>
                <span>Analyze Credibility</span>
                <ArrowRight className="w-4 h-4 text-[#d4c7ff]" />
              </>
            )}
          </button>
        </div>

        {/* Dynamic Progress indicator during analysis */}
        {isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            id="analysis-progress-banner" 
            className="mt-3 p-3.5 rounded-[12px] bg-[#f2f0eb] border border-[#e3e3e2] text-[#292827] text-xs flex items-center gap-3"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#714cb6] animate-pulse shrink-0" />
            <span className="font-[500] uppercase tracking-wider text-[11px] text-[#714cb6]">
              Verification Pipeline:
            </span>
            <span className="font-[460] text-[#292827]">
              {ANALYSIS_STAGES[currentStageIndex]}
            </span>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}

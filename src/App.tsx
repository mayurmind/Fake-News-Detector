/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { ArticleInputForm } from './components/ArticleInputForm';
import { AnalysisResultView } from './components/AnalysisResultView';
import { HistoryDrawer } from './components/HistoryDrawer';
import { DeepLagoonBand } from './components/DeepLagoonBand';
import { Footer } from './components/Footer';
import { AnalysisResult } from './types';
import { TextEffect } from '@/components/core/text-effect';
import { ShieldCheck, Search, Cpu, BookOpen, AlertCircle, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'fake_news_detector_history_v1';

export default function App() {
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'detector' | 'methodology'>('detector');

  // Load history from localStorage on initial render
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Failed to load history from localStorage:', err);
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (result: AnalysisResult) => {
    try {
      const updated = [result, ...history.filter((h) => h.id !== result.id)].slice(0, 20);
      setHistory(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear history:', err);
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to update history:', err);
    }
  };

  const handleAnalyze = async (payload: { title: string; text: string; url: string }) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setCurrentResult(data);
      saveToHistory(data);

      // Smooth scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err?.message || 'Failed to complete analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setCurrentResult(null);
    setError(null);
    setActiveTab('detector');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f2f0eb] flex flex-col text-[#292827] font-sans selection:bg-[#d4c7ff] selection:text-[#292827]">
      {/* Top Superhuman Announcement & Sticky Header */}
      <Navbar
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
        onReset={handleReset}
        isAnalyzing={isAnalyzing}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'detector') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      <main id="main-content" className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-8">
        {/* Error notification banner */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              id="error-banner"
              className="p-4 rounded-[16px] bg-rose-50 border border-rose-200 text-rose-900 text-sm flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-[600]">Verification Error</p>
                <p className="text-xs text-rose-700 mt-0.5 font-[460]">{error}</p>
              </div>
              <button
                type="button"
                onClick={() => setError(null)}
                className="text-xs font-[500] text-rose-700 hover:text-rose-900 cursor-pointer"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab 1: Credibility Detector */}
        {activeTab === 'detector' && (
          <>
            {currentResult ? (
              <AnalysisResultView
                result={currentResult}
                onAnalyzeAnother={handleReset}
              />
            ) : (
              <div className="space-y-8">
                {/* Editorial Hero Header — weight 460 whisper voice */}
                <motion.div 
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  id="intro-headline" 
                  className="max-w-3xl pt-2 pb-2"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-[500] bg-white border border-[#e3e3e2] text-[#292827] mb-4">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#714cb6]" />
                    <span>Evidence-Based Information Architecture</span>
                  </div>

                  <TextEffect
                    per="word"
                    as="h1"
                    preset="slide"
                    className="text-3xl sm:text-5xl lg:text-[54px] font-[460] text-[#292827] leading-[1.08] tracking-[-0.027em] mb-4"
                  >
                    Deconstruct news claims with editorial precision.
                  </TextEffect>

                  <p className="text-base sm:text-lg text-[#666666] leading-relaxed font-[460] max-w-2xl">
                    Paste any news excerpt, statement, or article URL. Our system evaluates factual credibility against accredited wires, calculates emotional tone, and highlights uncorroborated rhetoric.
                  </p>
                </motion.div>

                {/* Input Form Floating Card */}
                <ArticleInputForm
                  onAnalyze={handleAnalyze}
                  isAnalyzing={isAnalyzing}
                />

                {/* Suite Product Cards Section — Superhuman Style */}
                <div className="pt-6">
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="text-xs font-[500] uppercase tracking-wider text-[#714cb6]">
                      The Veritas Inspection Suite
                    </h3>
                    <span className="text-xs text-[#666666] font-[460]">
                      Three interconnected verification layers
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Card 1: Machine Learning */}
                    <motion.div 
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 rounded-[16px] bg-white border border-[#e3e3e2] flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-9 h-9 rounded-[10px] bg-[#d4c7ff]/50 text-[#421d24] flex items-center justify-center mb-4 border border-[#d4c7ff]">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <h4 className="text-[19px] font-[700] text-[#292827] mb-2">
                          Assertion Extraction
                        </h4>
                        <p className="text-sm font-[460] text-[#292827] leading-relaxed mb-4">
                          Decomposes long-form narratives into isolated factual propositions, flagging logical fallacies and inflammatory wording.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('methodology')}
                        className="text-xs font-[460] text-[#714cb6] hover:underline text-left inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Learn more about claim decomposition</span>
                        <span>&rarr;</span>
                      </button>
                    </motion.div>

                    {/* Card 2: Trusted Grounding */}
                    <motion.div 
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 rounded-[16px] bg-white border border-[#e3e3e2] flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-9 h-9 rounded-[10px] bg-[#d4c7ff]/50 text-[#421d24] flex items-center justify-center mb-4 border border-[#d4c7ff]">
                          <Search className="w-4 h-4" />
                        </div>
                        <h4 className="text-[19px] font-[700] text-[#292827] mb-2">
                          Wire Cross-Reference
                        </h4>
                        <p className="text-sm font-[460] text-[#292827] leading-relaxed mb-4">
                          Queries accredited news wires (AP, Reuters, BBC) and IFCN fact-check archives to discover primary sources and consensus.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('methodology')}
                        className="text-xs font-[460] text-[#714cb6] hover:underline text-left inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Explore wire grounding standards</span>
                        <span>&rarr;</span>
                      </button>
                    </motion.div>

                    {/* Card 3: Sentiment Profiling */}
                    <motion.div 
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 rounded-[16px] bg-white border border-[#e3e3e2] flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-9 h-9 rounded-[10px] bg-[#d4c7ff]/50 text-[#421d24] flex items-center justify-center mb-4 border border-[#d4c7ff]">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <h4 className="text-[19px] font-[700] text-[#292827] mb-2">
                          Emotional Tone & Bias
                        </h4>
                        <p className="text-sm font-[460] text-[#292827] leading-relaxed mb-4">
                          Measures emotional intensity, subjective bias versus empirical fact ratios, and psychological urgency cues.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('methodology')}
                        className="text-xs font-[460] text-[#714cb6] hover:underline text-left inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>View sentiment calibration</span>
                        <span>&rarr;</span>
                      </button>
                    </motion.div>
                  </div>
                </div>

                {/* Dark Feature Band — Deep Lagoon Superhuman signature */}
                <DeepLagoonBand 
                  onStartAnalysis={() => {
                    window.scrollTo({ top: 180, behavior: 'smooth' });
                  }}
                  onExploreMethodology={() => {
                    setActiveTab('methodology');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}
          </>
        )}

        {/* Tab 2: Methodology View */}
        {activeTab === 'methodology' && (
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="max-w-3xl">
              <span className="text-xs font-[500] uppercase tracking-wider text-[#714cb6]">
                Scientific Integrity
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-[460] text-[#292827] tracking-[-0.024em] mt-2 mb-4">
                How Veritas Evaluates News Credibility
              </h2>
              <p className="text-base text-[#666666] leading-relaxed font-[460]">
                Misinformation detection is not a binary label. Veritas uses an empirical three-stage pipeline combining NLP sentiment analysis, claim decomposition, and real-time grounding against the world's most reputable wire services.
              </p>
            </div>

            {/* Detailed Framework Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-[16px] bg-white border border-[#e3e3e2]">
                <div className="text-xs font-mono text-[#714cb6] mb-2 uppercase">Protocol 01</div>
                <h3 className="text-xl font-[460] text-[#292827] mb-3">
                  Assertion Decomposition & Provenance
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed font-[460] mb-4">
                  Articles are parsed into atomic factual statements. We examine whether claims quote named sources, link to verifiable studies, or rely on anonymous hearsay and unverified third-party social media posts.
                </p>
                <div className="p-3.5 rounded-[12px] bg-[#f2f0eb] text-xs font-[460] text-[#292827] border border-[#e3e3e2]">
                  <strong>Key test:</strong> Does the claim survive removal of adjectives and rhetorical intensifiers?
                </div>
              </div>

              <div className="p-8 rounded-[16px] bg-white border border-[#e3e3e2]">
                <div className="text-xs font-mono text-[#714cb6] mb-2 uppercase">Protocol 02</div>
                <h3 className="text-xl font-[460] text-[#292827] mb-3">
                  Live Wire Grounding & IFCN Cross-Examination
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed font-[460] mb-4">
                  We formulate dynamic search queries targeting accredited news archives including Associated Press, Reuters, BBC, Agence France-Presse, and certified International Fact-Checking Network signatories.
                </p>
                <div className="p-3.5 rounded-[12px] bg-[#f2f0eb] text-xs font-[460] text-[#292827] border border-[#e3e3e2]">
                  <strong>Key test:</strong> Has an accredited investigative body already published a formal debunk or confirmation?
                </div>
              </div>

              <div className="p-8 rounded-[16px] bg-white border border-[#e3e3e2]">
                <div className="text-xs font-mono text-[#714cb6] mb-2 uppercase">Protocol 03</div>
                <h3 className="text-xl font-[460] text-[#292827] mb-3">
                  Sentiment, Subjectivity, & Psychological Arousal
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed font-[460] mb-4">
                  Sensationalism leverages cognitive shortcuts by provoking anger, moral outrage, or panic. We analyze lexical polarity, subjectivity percentage, and emotional urgency cues to differentiate news from propaganda.
                </p>
                <div className="p-3.5 rounded-[12px] bg-[#f2f0eb] text-xs font-[460] text-[#292827] border border-[#e3e3e2]">
                  <strong>Key test:</strong> Is the tone calculated to inform the intellect or provoke an impulsive emotional response?
                </div>
              </div>

              <div className="p-8 rounded-[16px] bg-white border border-[#e3e3e2]">
                <div className="text-xs font-mono text-[#714cb6] mb-2 uppercase">Protocol 04</div>
                <h3 className="text-xl font-[460] text-[#292827] mb-3">
                  Mathematical Scoring Calibration
                </h3>
                <p className="text-sm text-[#666666] leading-relaxed font-[460] mb-4">
                  Scores reflect a weighted synthesis of factual corroboration (50%), empirical citation ratio (25%), objectivity versus sensationalism (15%), and structural linguistic integrity (10%).
                </p>
                <div className="p-3.5 rounded-[12px] bg-[#f2f0eb] text-xs font-[460] text-[#292827] border border-[#e3e3e2]">
                  <strong>Key test:</strong> Transparent 0 to 100 scale with discrete risk classifications.
                </div>
              </div>
            </div>

            {/* Deep Lagoon Band within Methodology */}
            <DeepLagoonBand 
              onStartAnalysis={() => {
                setActiveTab('detector');
                window.scrollTo({ top: 160, behavior: 'smooth' });
              }}
              onExploreMethodology={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </motion.div>
        )}
      </main>

      {/* History Drawer with AnimatePresence */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectResult={(item) => {
          setCurrentResult(item);
          setActiveTab('detector');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onClearHistory={handleClearHistory}
        onDeleteHistoryItem={handleDeleteHistoryItem}
      />

      {/* Superhuman Midnight Wine Footer */}
      <Footer 
        onSelectMethodology={() => {
          setActiveTab('methodology');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenRecentScans={() => setIsHistoryOpen(true)}
        onResetScan={handleReset}
      />
    </div>
  );
}

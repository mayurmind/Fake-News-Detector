export type CredibilityVerdict =
  | 'VERIFIED_TRUE'
  | 'LIKELY_AUTHENTIC'
  | 'MIXED_OR_MISLEADING'
  | 'QUESTIONABLE'
  | 'CONFIRMED_FALSE';

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface SentimentAnalysis {
  score: number; // -100 to +100 (Negative to Positive)
  label: 'NEGATIVE' | 'SLIGHTLY_NEGATIVE' | 'NEUTRAL' | 'SLIGHTLY_POSITIVE' | 'POSITIVE';
  emotionalIntensity: number; // 0 to 100%
  sensationalismScore: number; // 0 to 100% (Clickbait & alarmism)
  subjectivityScore: number; // 0 to 100% (Subjective vs Objective)
  dominantTone: string;
  emotionalTriggers: string[];
}

export interface FactClaim {
  id: string;
  claim: string;
  verdict: 'TRUE' | 'FALSE' | 'MISLEADING' | 'UNVERIFIED';
  explanation: string;
  confidence: number;
}

export interface TrustedCitation {
  id: string;
  title: string;
  publisher: string;
  url: string;
  snippet: string;
  reliabilityRating: 'FACT_CHECKER' | 'ESTABLISHED_MEDIA' | 'OFFICIAL_SOURCE' | 'ACADEMIC';
  supportsOrRefutes: 'SUPPORTS' | 'REFUTES' | 'CONTEXT';
}

export interface LinguisticFlag {
  flag: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  articleTitle: string;
  articleSummary: string;
  credibilityScore: number; // 0 - 100
  verdict: CredibilityVerdict;
  verdictReasoning: string;
  riskLevel: RiskLevel;
  sentiment: SentimentAnalysis;
  claims: FactClaim[];
  trustedCitations: TrustedCitation[];
  linguisticFlags: LinguisticFlag[];
  factVsOpinionRatio: {
    factsPercentage: number;
    opinionPercentage: number;
  };
  recommendations: string[];
  searchGroundingQueriesUsed?: string[];
}

export interface PresetArticle {
  id: string;
  category: string;
  title: string;
  badgeText: string;
  badgeColor: 'emerald' | 'amber' | 'rose' | 'purple';
  content: string;
  url?: string;
  description: string;
}

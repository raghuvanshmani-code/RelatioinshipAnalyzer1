// FIX: Removed circular dependency where the file was importing a type from itself.
export enum Page {
  DASHBOARD = 'dashboard',
  HISTORY = 'history',
}

export interface SubtleTell {
  tell: string;
  explanation: string;
  citation: string;
}

export interface Flag {
  point: string;
  citation: string;
}

export interface LanguageBehavior {
  metric: string;
  user1: string;
  user2: string;
  interpretation: string;
}

export interface TimelineEntry {
  topic: string;
  month1: string;
  month2: string;
  month3: string;
}

export interface Recommendation {
  recommendation: string;
  reasoning: string;
}

export interface ProCon {
  point: string;
  explanation: string;
}

export interface Snapshot {
  stat: string;
  value: string;
  interpretation: string;
}

export interface PersonalAnalysisStat {
  metric: string;
  value: string;
  interpretation: string;
}

export interface MonthlyBreakdownEntry {
  month: string;
  total: number;
  user1: number;
  user2: number;
  sessions: string; // "14 / 22"
  affection: number;
  jealousyTrust: number;
  breakup: number;
  block: number;
  affectionConflictRatio: string; // "4.33"
}

export interface AnalysisResult {
  id: string;
  date: string;
  fileName: string;
  user1Name: string;
  user2Name: string;
  subtleTells: SubtleTell[];
  redFlags: {
    user1: Flag[];
    user2: Flag[];
  };
  greenFlags: {
    user1: Flag[];
    user2: Flag[];
  };
  languageBehavior: LanguageBehavior[];
  topicTimeline: TimelineEntry[];
  recommendations: {
    forUser1: Recommendation[];
    forUser2: Recommendation[];
  };
  pros: ProCon[];
  cons: ProCon[];
  relationshipSnapshot: Snapshot[];
  personalAnalysis: {
    user1: PersonalAnalysisStat[];
  };
  monthlyBreakdown: MonthlyBreakdownEntry[];
}

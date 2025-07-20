export interface SentimentData {
  id: string;
  message: string;
  sentiment: number;
  channel: string;
  agent: string;
  timestamp: Date;
  customer: string;
  category: string;
  confidence: number;
  keywords: string[];
  csatPrediction?: number;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
  suggestedAction?: string;
}

export interface ProcessedData {
  totalTickets: number;
  averageSentiment: number;
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topIssues: string[];
  processingDate: Date;
}

export interface FilterOptions {
  sentiment: string;
  channel: string;
  agent: string;
  sortBy: string;
  limit: number;
}
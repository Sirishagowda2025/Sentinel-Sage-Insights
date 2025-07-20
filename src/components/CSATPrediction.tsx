import React from 'react';
import { Star, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SentimentData } from '../types';

interface CSATPredictionProps {
  data: SentimentData[];
}

const CSATPrediction: React.FC<CSATPredictionProps> = ({ data }) => {
  const averageCSAT = data.reduce((acc, curr) => acc + (curr.csatPrediction || 3), 0) / data.length;
  const lowCSATCount = data.filter(d => (d.csatPrediction || 3) <= 2).length;
  const highCSATCount = data.filter(d => (d.csatPrediction || 3) >= 4).length;

  const getCSATColor = (score: number) => {
    if (score >= 4) return 'text-green-600';
    if (score >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCSATBg = (score: number) => {
    if (score >= 4) return 'bg-green-100';
    if (score >= 3) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          CSAT Prediction Engine
        </CardTitle>
        <CardDescription>
          AI-powered customer satisfaction score predictions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getCSATColor(averageCSAT)}`}>
                {averageCSAT.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Avg CSAT</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{highCSATCount}</div>
              <div className="text-sm text-gray-600">High Scores</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{lowCSATCount}</div>
              <div className="text-sm text-gray-600">Low Scores</div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Recent Predictions</h4>
            {data.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                <div className="flex-1 truncate">
                  <div className="text-sm">{item.customer}</div>
                  <div className="text-xs text-gray-500">{item.channel}</div>
                </div>
                <div className={`px-2 py-1 rounded text-sm font-medium ${getCSATBg(item.csatPrediction || 3)} ${getCSATColor(item.csatPrediction || 3)}`}>
                  {item.csatPrediction || 3}/5
                </div>
              </div>
            ))}
          </div>

          {lowCSATCount > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Alert: {lowCSATCount} low CSAT predictions</span>
              </div>
              <div className="text-sm text-red-600 mt-1">
                Consider proactive outreach to prevent churn
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CSATPrediction;
import React from 'react';
import { X, Brain, AlertTriangle, TrendingUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SentimentData } from '../types';

interface AgentInsightsPanelProps {
  data: SentimentData[];
  onClose: () => void;
}

const AgentInsightsPanel: React.FC<AgentInsightsPanelProps> = ({ data, onClose }) => {
  const negativeCount = data.filter(d => d.sentiment < -0.3).length;
  const recentNegative = data.filter(d => d.sentiment < -0.3).slice(0, 3);
  const commonKeywords = data.reduce((acc, curr) => {
    if (curr.sentiment < -0.3) {
      curr.keywords.forEach(keyword => {
        acc[keyword] = (acc[keyword] || 0) + 1;
      });
    }
    return acc;
  }, {} as Record<string, number>);

  const topIssues = Object.entries(commonKeywords)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const suggestions = [
    'Escalate high-priority negative cases to senior support',
    'Review and update FAQ for common complaint topics',
    'Schedule customer retention outreach calls',
    'Implement proactive communication for at-risk accounts'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-red-300 bg-red-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-6 w-6" />
              🚨 Agent Alert: Sentiment Spike Detected
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <CardDescription className="text-red-700">
            <strong>AI has detected an unusual pattern in customer sentiment that requires immediate attention.</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Alert Summary */}
            <div className="p-4 bg-white/70 rounded-lg border border-red-200">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Brain className="h-5 w-5 text-red-600" />
                Alert Summary
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-red-600">{negativeCount}</div>
                  <div className="text-sm text-gray-600">Frustrated Customers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {((negativeCount / data.length) * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Of Total Interactions</div>
                </div>
              </div>
            </div>

            {/* Recent Negative Cases */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Recent High-Priority Cases
              </h4>
              <div className="space-y-2">
                {recentNegative.map((item, index) => (
                  <div key={index} className="p-3 bg-white/70 rounded border border-red-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{item.customer}</span>
                      <span className="text-xs text-red-600 font-medium">
                        Sentiment: {item.sentiment.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-700 mb-1">"{item.message}"</div>
                    <div className="text-xs text-gray-500">
                      {item.channel} • Agent: {item.agent} • {item.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Issues */}
            {topIssues.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Most Frequent Complaint Topics</h4>
                <div className="grid grid-cols-1 gap-2">
                  {topIssues.map(([issue, count], index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white/70 rounded">
                      <span className="font-medium">{issue}</span>
                      <span className="text-red-600 font-medium">{count} mentions</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Suggestions */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                🤖 AI Recommended Actions
              </h4>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button className="flex-1" onClick={onClose}>
                ✅ Acknowledge Alert
              </Button>
              <Button variant="outline" className="flex-1">
                📧 Notify Team Lead
              </Button>
            </div>

            <div className="text-center text-xs text-gray-500">
              Alert generated at {new Date().toLocaleString()} by SentinelSage AI
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentInsightsPanel;
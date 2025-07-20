import React from 'react';
import { Users, Target, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SentimentData } from '../types';

interface SupportTeamCoachProps {
  data: SentimentData[];
}

const SupportTeamCoach: React.FC<SupportTeamCoachProps> = ({ data }) => {
  const agentPerformance = data.reduce((acc, curr) => {
    if (!acc[curr.agent]) {
      acc[curr.agent] = { total: 0, sentiment: 0, positive: 0, negative: 0 };
    }
    acc[curr.agent].total += 1;
    acc[curr.agent].sentiment += curr.sentiment;
    if (curr.sentiment > 0.1) acc[curr.agent].positive += 1;
    if (curr.sentiment < -0.1) acc[curr.agent].negative += 1;
    return acc;
  }, {} as Record<string, { total: number; sentiment: number; positive: number; negative: number }>);

  const agentScores = Object.entries(agentPerformance).map(([agent, stats]) => ({
    agent,
    avgSentiment: stats.sentiment / stats.total,
    positiveRate: (stats.positive / stats.total) * 100,
    negativeRate: (stats.negative / stats.total) * 100,
    total: stats.total
  })).sort((a, b) => b.avgSentiment - a.avgSentiment);

  const getPerformanceColor = (score: number) => {
    if (score > 0.2) return 'text-green-600';
    if (score > -0.2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCoachingTip = (negativeRate: number, positiveRate: number) => {
    if (negativeRate > 30) return 'Focus on empathy and active listening';
    if (positiveRate < 40) return 'Try to create more positive interactions';
    return 'Maintain current performance level';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Support Team Coach
        </CardTitle>
        <CardDescription>
          AI-powered coaching insights and performance analytics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Target className="h-6 w-6 mx-auto text-blue-600 mb-1" />
              <div className="text-lg font-bold text-blue-600">{agentScores.length}</div>
              <div className="text-sm text-gray-600">Active Agents</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 mx-auto text-green-600 mb-1" />
              <div className="text-lg font-bold text-green-600">
                {((agentScores.reduce((acc, curr) => acc + curr.positiveRate, 0) / agentScores.length) || 0).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Avg Positive Rate</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Agent Performance</h4>
            {agentScores.map((agent, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{agent.agent}</div>
                  <div className={`text-sm font-medium ${getPerformanceColor(agent.avgSentiment)}`}>
                    {agent.avgSentiment > 0 ? '+' : ''}{agent.avgSentiment.toFixed(2)}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>Positive: {agent.positiveRate.toFixed(1)}%</div>
                  <div>Negative: {agent.negativeRate.toFixed(1)}%</div>
                </div>
                <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                  <strong>💡 Coaching Tip:</strong> {getCoachingTip(agent.negativeRate, agent.positiveRate)}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Team Recommendation</span>
            </div>
            <div className="text-sm text-yellow-700 mt-1">
              Schedule training session on handling frustrated customers
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportTeamCoach;
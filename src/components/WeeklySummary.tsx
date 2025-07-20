import React from 'react';
import { Calendar, TrendingUp, TrendingDown, Users, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SentimentData } from '../types';

interface WeeklySummaryProps {
  data: SentimentData[];
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({ data }) => {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const thisWeekData = data.filter(d => d.timestamp >= weekAgo);
  const avgSentiment = thisWeekData.reduce((acc, curr) => acc + curr.sentiment, 0) / thisWeekData.length;
  
  const dailyStats = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dayData = thisWeekData.filter(d => 
      d.timestamp.toDateString() === date.toDateString()
    );
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      count: dayData.length,
      avgSentiment: dayData.length > 0 ? dayData.reduce((acc, curr) => acc + curr.sentiment, 0) / dayData.length : 0
    };
  }).reverse();

  const topIssues = data.reduce((acc, curr) => {
    curr.keywords.forEach(keyword => {
      if (!acc[keyword]) acc[keyword] = 0;
      acc[keyword] += curr.sentiment < -0.2 ? 1 : 0;
    });
    return acc;
  }, {} as Record<string, number>);

  const issuesList = Object.entries(topIssues)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const insights = [
    thisWeekData.filter(d => d.sentiment < -0.3).length > 5 ? 
      "High volume of negative sentiment detected this week" : null,
    avgSentiment > 0.2 ? 
      "Overall positive sentiment trend this week" : null,
    thisWeekData.filter(d => d.channel === 'Chat').length > thisWeekData.length * 0.6 ? 
      "Live chat is the primary support channel" : null
  ].filter(Boolean);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          AI Weekly Summary
        </CardTitle>
        <CardDescription>
          Automated insights and patterns from the past week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Week Overview */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Users className="h-6 w-6 mx-auto text-blue-600 mb-1" />
              <div className="text-lg font-bold text-blue-600">{thisWeekData.length}</div>
              <div className="text-sm text-gray-600">Total Interactions</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 mx-auto text-green-600 mb-1" />
              <div className="text-lg font-bold text-green-600">
                {avgSentiment > 0 ? '+' : ''}{avgSentiment.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Avg Sentiment</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <AlertCircle className="h-6 w-6 mx-auto text-purple-600 mb-1" />
              <div className="text-lg font-bold text-purple-600">
                {thisWeekData.filter(d => d.sentiment < -0.3).length}
              </div>
              <div className="text-sm text-gray-600">Alert Triggers</div>
            </div>
          </div>

          {/* Daily Trend */}
          <div>
            <h4 className="font-semibold mb-3">Daily Activity</h4>
            <div className="grid grid-cols-7 gap-2">
              {dailyStats.map((day, index) => (
                <div key={index} className="text-center p-2 bg-gray-50 rounded">
                  <div className="text-xs text-gray-600 mb-1">{day.date}</div>
                  <div className="text-sm font-bold">{day.count}</div>
                  <div className={`text-xs ${
                    day.avgSentiment > 0 ? 'text-green-600' : 
                    day.avgSentiment < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {day.avgSentiment > 0 ? '😊' : day.avgSentiment < 0 ? '😠' : '😐'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Issues */}
          {issuesList.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Top Issues Causing Frustration</h4>
              <div className="space-y-2">
                {issuesList.map(([issue, count], index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded">
                    <span className="text-sm font-medium">{issue}</span>
                    <span className="text-sm text-red-600">{count} complaints</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Insights */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              🤖 AI-Generated Weekly Insights
            </h4>
            <div className="space-y-2 text-sm">
              {insights.length > 0 ? insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{insight}</span>
                </div>
              )) : (
                <div className="text-gray-600">No significant patterns detected this week.</div>
              )}
            </div>
          </div>

          <div className="text-center text-xs text-gray-500">
            📧 This summary would be automatically sent to CX leads every Monday
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklySummary;
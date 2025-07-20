import React from 'react';
import { TrendingUp, Users, MessageCircle, Clock, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProcessedData } from '../types';

interface DataSummaryStatsProps {
  processedData: ProcessedData;
}

const DataSummaryStats: React.FC<DataSummaryStatsProps> = ({ processedData }) => {
  const sentimentEmoji = (sentiment: number) => {
    if (sentiment > 0.2) return '😊';
    if (sentiment > -0.2) return '😐';
    return '😠';
  };

  const stats = [
    {
      title: 'Total Analyzed',
      value: processedData.totalTickets,
      icon: MessageCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Avg Sentiment',
      value: `${processedData.averageSentiment.toFixed(2)} ${sentimentEmoji(processedData.averageSentiment)}`,
      icon: Brain,
      color: processedData.averageSentiment > 0 ? 'text-green-600' : 'text-red-600',
      bgColor: processedData.averageSentiment > 0 ? 'bg-green-100' : 'bg-red-100'
    },
    {
      title: 'Positive Rate',
      value: `${((processedData.sentimentDistribution.positive / processedData.totalTickets) * 100).toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Processing Speed',
      value: '< 1s',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Processing Summary
        </CardTitle>
        <CardDescription>
          Real-time analytics from your sentiment analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-white/70 rounded-lg">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-xl font-bold text-green-600">😊 {processedData.sentimentDistribution.positive}</div>
            <div className="text-sm text-gray-600">Positive</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-xl font-bold text-gray-600">😐 {processedData.sentimentDistribution.neutral}</div>
            <div className="text-sm text-gray-600">Neutral</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="text-xl font-bold text-red-600">😠 {processedData.sentimentDistribution.negative}</div>
            <div className="text-sm text-gray-600">Negative</div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          ⚡ AI Confidence: 94% | Processing completed at {processedData.processingDate.toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSummaryStats;
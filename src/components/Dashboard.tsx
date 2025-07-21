import React from 'react';
import { TrendingUp, TrendingDown, Users, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SentimentData } from '../types';

interface DashboardProps {
  data: SentimentData[];
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const positiveCount = data.filter(d => d.sentiment > 0.1).length;
  const negativeCount = data.filter(d => d.sentiment < -0.1).length;
  const neutralCount = data.length - positiveCount - negativeCount;
  const averageSentiment = data.reduce((acc, curr) => acc + curr.sentiment, 0) / data.length;

  const stats = [
    {
      title: 'Total Tickets',
      value: data.length,
      icon: MessageCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Positive Sentiment',
      value: positiveCount,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Negative Sentiment',
      value: negativeCount,
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Neutral',
      value: neutralCount,
      icon: Users,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SentinelSage Dashboard</h1>
        <p className="text-gray-600">AI-Powered Customer Sentiment Analysis</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {((stat.value / data.length) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
      ))}
      </div>
    </div>
  );
};

export default Dashboard;
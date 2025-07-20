import React, { useState, useEffect } from 'react';
import { Activity, Clock, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SentimentData } from '../types';

interface LiveTicketFeedProps {
  data: SentimentData[];
}

const LiveTicketFeed: React.FC<LiveTicketFeedProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (data.length === 0) return;

    const interval = setInterval(() => {
      setIsProcessing(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % data.length);
        setIsProcessing(false);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, [data.length]);

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.1) return 'text-green-600 bg-green-100';
    if (sentiment < -0.1) return 'text-red-600 bg-red-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  const getSentimentEmoji = (sentiment: number) => {
    if (sentiment > 0.1) return '😊';
    if (sentiment < -0.1) return '😠';
    return '😐';
  };

  if (data.length === 0) return null;

  const currentTicket = data[currentIndex];

  return (
    <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className={`h-5 w-5 ${isProcessing ? 'animate-pulse text-green-600' : 'text-green-600'}`} />
          Live Sentiment Analysis
        </CardTitle>
        <CardDescription>
          Real-time AI processing of support interactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${getSentimentColor(currentTicket.sentiment)}`}>
                {getSentimentEmoji(currentTicket.sentiment)}
              </div>
              <div>
                <div className="font-medium">{currentTicket.customer}</div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {currentTicket.agent} • {currentTicket.channel}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-lg font-bold ${getSentimentColor(currentTicket.sentiment).split(' ')[0]}`}>
                {currentTicket.sentiment.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">
                {(currentTicket.confidence * 100).toFixed(0)}% confidence
              </div>
            </div>
          </div>

          <div className="p-3 bg-white/50 rounded-lg border">
            <div className="text-sm text-gray-800 mb-2">
              "{currentTicket.message}"
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {currentTicket.timestamp.toLocaleTimeString()}
              </span>
              <span>Category: {currentTicket.category}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-600">
              Processing ticket {currentIndex + 1} of {data.length}
            </div>
            <div className={`px-2 py-1 rounded text-xs font-medium ${isProcessing ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
              {isProcessing ? '🧠 AI Processing...' : '✅ Analysis Complete'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveTicketFeed;
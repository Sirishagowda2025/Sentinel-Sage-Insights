import React, { useState, useEffect } from 'react';
import { MessageSquare, Brain, Volume2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SentimentData } from '../types';

interface ConversationalSummaryProps {
  data: SentimentData[];
}

const ConversationalSummary: React.FC<ConversationalSummaryProps> = ({ data }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateSummary = () => {
    const negativeCount = data.filter(d => d.sentiment < -0.1).length;
    const positiveCount = data.filter(d => d.sentiment > 0.1).length;
    const avgSentiment = data.reduce((acc, curr) => acc + curr.sentiment, 0) / data.length;
    
    const channelStats = data.reduce((acc, curr) => {
      acc[curr.channel] = (acc[curr.channel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topChannel = Object.entries(channelStats).sort(([,a], [,b]) => b - a)[0];
    
    const timeOfDay = new Date().getHours();
    const timeGreeting = timeOfDay < 12 ? 'Good morning' : timeOfDay < 18 ? 'Good afternoon' : 'Good evening';
    
    const summaries = [
      `${timeGreeting}! I've analyzed ${data.length} support interactions today. Here's what I found: ${negativeCount} customers expressed frustration, while ${positiveCount} were satisfied. The overall sentiment trend is ${avgSentiment > 0 ? 'positive' : avgSentiment < -0.2 ? 'concerning' : 'neutral'}.`,
      
      `Today's support overview: ${topChannel ? `Most interactions came through ${topChannel[0]} (${topChannel[1]} tickets)` : 'Balanced across all channels'}. ${negativeCount > data.length * 0.3 ? `⚠️ High frustration detected - ${negativeCount} angry customers need attention.` : '✅ Customer satisfaction levels are stable.'}`,
      
      `AI Insight: ${negativeCount > 5 ? `I've flagged ${negativeCount} cases for escalation due to negative sentiment.` : 'No critical escalations needed today.'} ${positiveCount > negativeCount ? 'Your team is doing great with customer relations!' : 'Consider reviewing support processes for improvement opportunities.'}`
    ];

    return summaries[Math.floor(Math.random() * summaries.length)];
  };

  const typeMessage = async (message: string) => {
    setIsTyping(true);
    setCurrentMessage('');
    
    for (let i = 0; i <= message.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30));
      setCurrentMessage(message.slice(0, i));
    }
    
    setIsTyping(false);
  };

  useEffect(() => {
    if (data.length > 0) {
      const summary = generateSummary();
      typeMessage(summary);
    }
  }, [data]);

  const handleNewSummary = () => {
    const summary = generateSummary();
    typeMessage(summary);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window && currentMessage) {
      const utterance = new SpeechSynthesisUtterance(currentMessage);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-green-600" />
          AI Conversational Summary
        </CardTitle>
        <CardDescription>
          Your AI agent speaks directly to your support team with insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-white/70 rounded-lg border border-green-200 min-h-[120px]">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-green-800 mb-2">
                  SentinelSage AI Assistant
                </div>
                <div className="text-gray-800 leading-relaxed">
                  {currentMessage}
                  {isTyping && (
                    <span className="inline-block w-2 h-5 bg-green-600 ml-1 animate-pulse"></span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNewSummary}
              disabled={isTyping}
            >
              <Brain className="h-4 w-4 mr-2" />
              Generate New Summary
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSpeak}
              disabled={isTyping || !currentMessage}
            >
              <Volume2 className="h-4 w-4 mr-2" />
              Listen
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center p-2 bg-white/50 rounded">
              <div className="text-lg font-bold text-green-600">
                {data.filter(d => d.sentiment > 0.1).length}
              </div>
              <div className="text-xs text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center p-2 bg-white/50 rounded">
              <div className="text-lg font-bold text-yellow-600">
                {data.filter(d => d.sentiment >= -0.1 && d.sentiment <= 0.1).length}
              </div>
              <div className="text-xs text-gray-600">Neutral</div>
            </div>
            <div className="text-center p-2 bg-white/50 rounded">
              <div className="text-lg font-bold text-red-600">
                {data.filter(d => d.sentiment < -0.1).length}
              </div>
              <div className="text-xs text-gray-600">Frustrated</div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 mt-4">
            💬 AI is actively monitoring and will alert you of any urgent patterns
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationalSummary;
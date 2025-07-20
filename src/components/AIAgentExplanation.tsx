import React from 'react';
import { Brain, Eye, Zap, Shield, BarChart3, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AIAgentExplanation: React.FC = () => {
  const features = [
    {
      icon: Eye,
      title: 'Multi-Channel Monitoring',
      description: 'Monitors emails, chats, tickets, and social media interactions',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Brain,
      title: 'NLP Sentiment Detection',
      description: 'Uses advanced LLMs and emotion classifiers to analyze tone',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Zap,
      title: 'Proactive Alerting',
      description: 'Triggers alerts when negative sentiment trends spike',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: BarChart3,
      title: 'Real-time Processing',
      description: 'Processes and analyzes data streams in real-time',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ];

  return (
    <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          SentinelSage AI Agent
        </CardTitle>
        <CardDescription className="text-lg">
          <strong>Detect Frustration Before It Escalates. Delight Before It's Missed.</strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="p-4 bg-white/50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              How It Works Autonomously
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${feature.bgColor} flex-shrink-0`}>
                    <feature.icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-white/50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">95%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
            <div className="p-4 bg-white/50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">&lt; 1s</div>
              <div className="text-sm text-gray-600">Processing Time</div>
            </div>
            <div className="p-4 bg-white/50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-600">Monitoring</div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 border-t pt-4">
            <p>🤖 <strong>Autonomous Agent:</strong> No human intervention required for sentiment analysis and alerting</p>
            <p>🔄 <strong>Continuous Learning:</strong> Adapts to your team's communication patterns over time</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAgentExplanation;
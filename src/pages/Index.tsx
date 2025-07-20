import React from 'react';
import { ArrowRight, Brain, BarChart3, Shield, Zap, Users, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface IndexProps {
  onGetStarted: () => void;
}

const Index: React.FC<IndexProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
            <Brain className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">
            Customer Sentiment Watchdog
          </h1>
          <h2 className="text-xl text-blue-100 mb-6">
            for Support Teams
          </h2>
          
          <p className="text-2xl text-blue-100 mb-8 font-medium">
            Monitor emotional trends in real-time. Prevent escalations. Delight customers.
          </p>
          
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 text-white mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Real-time Analytics</h3>
              <p className="text-blue-100 text-sm">Monitor sentiment trends as they happen</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-white mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Proactive Alerts</h3>
              <p className="text-blue-100 text-sm">Get notified before issues escalate</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-white mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-blue-100 text-sm">Smart recommendations for your team</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-white mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Team Performance</h3>
              <p className="text-blue-100 text-sm">Track and improve agent effectiveness</p>
            </CardContent>
          </Card>
        </div>

        {/* Emotion Visualization */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-8 mb-6">
            <div className="text-center">
              <div className="text-4xl mb-2">😊</div>
              <p className="text-blue-100 text-sm">Happy</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">😐</div>
              <p className="text-blue-100 text-sm">Neutral</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">😠</div>
              <p className="text-blue-100 text-sm">Frustrated</p>
            </div>
          </div>
          <p className="text-blue-100">
            "Helped us catch 3 major customer churn signals last week" - Support Lead
          </p>
        </div>

        {/* CTA Section */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-8 text-center">
            <MessageCircle className="h-12 w-12 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Support Experience?
            </h3>
            <p className="text-blue-100 mb-6">
              Upload Support Chat CSV or try our sample dataset
            </p>
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 text-lg px-8 py-6 h-auto"
            >
              Upload Support Chat CSV
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-blue-200 text-sm mt-4">Or try our sample dataset</p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-blue-100 text-sm">
          Built with 💡 during AI Agent Hackathon | Sirisha D
        </div>
      </div>
    </div>
  );
};

export default Index;
import React, { useState } from 'react';
import { X, ArrowRight, Brain, Shield, Zap, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to SentinelSage! 🤖',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">SentinelSage AI Agent</h2>
            <p className="text-gray-600">
              <strong>Detect Frustration Before It Escalates. Delight Before It's Missed.</strong>
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm">
              SentinelSage is your autonomous AI watchdog that monitors customer sentiment in real-time, 
              alerts you to problems before they escalate, and helps you delight customers proactively.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'How SentinelSage Works Autonomously',
      icon: Brain,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Brain className="h-6 w-6 text-blue-600 mb-2" />
              <h4 className="font-semibold">1. AI Monitoring</h4>
              <p className="text-sm text-gray-600">
                Continuously analyzes emails, chats, tickets using advanced NLP
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Zap className="h-6 w-6 text-green-600 mb-2" />
              <h4 className="font-semibold">2. Smart Alerts</h4>
              <p className="text-sm text-gray-600">
                Automatically triggers alerts when negative sentiment spikes
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600 mb-2" />
              <h4 className="font-semibold">3. Insights Generation</h4>
              <p className="text-sm text-gray-600">
                Creates actionable reports and coaching recommendations
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Shield className="h-6 w-6 text-orange-600 mb-2" />
              <h4 className="font-semibold">4. Proactive Action</h4>
              <p className="text-sm text-gray-600">
                Suggests next steps to prevent churn and improve satisfaction
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Key Features & Benefits',
      icon: Zap,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <strong>Real-time Sentiment Analysis:</strong> Process messages in &lt;1 second with 94% accuracy
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <strong>Autonomous Alerting:</strong> No human monitoring required - AI alerts you when needed
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
              <div>
                <strong>CSAT Prediction:</strong> Predict customer satisfaction scores before surveys
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
              <div>
                <strong>Team Coaching:</strong> AI-powered recommendations to improve agent performance
              </div>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <p className="text-sm">
              <strong>💡 Built during AI Agent Hackathon by Sirisha D</strong><br />
              Designed to showcase autonomous agentic AI behavior in customer experience management.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Ready to Get Started!',
      icon: BarChart3,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3">Let's Begin Your Sentiment Analysis Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800">Option 1: Upload Data</h4>
                <p className="text-sm text-blue-600 mt-1">
                  Upload your support CSV files for analysis
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800">Option 2: Try Sample Data</h4>
                <p className="text-sm text-green-600 mt-1">
                  Use our demo dataset to explore features
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm">
              <strong>💡 Pro Tip:</strong> Start with sample data to see SentinelSage in action, 
              then upload your own data for real insights!
            </p>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <currentStepData.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle>{currentStepData.title}</CardTitle>
                <CardDescription>
                  Step {currentStep + 1} of {steps.length}
                </CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {currentStepData.content}

            {/* Progress Indicator */}
            <div className="flex justify-center">
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentStep
                        ? 'bg-blue-600'
                        : index < currentStep
                        ? 'bg-green-600'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button onClick={nextStep}>
                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeModal;
import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, Users, MessageCircle, Upload, Download, Settings, LogOut } from 'lucide-react';
import LoginForm from './components/LoginForm';
import DataManagement from './components/DataManagement';
import CSATPrediction from './components/CSATPrediction';
import SupportTeamCoach from './components/SupportTeamCoach';
import AIAgentExplanation from './components/AIAgentExplanation';
import DataSummaryStats from './components/DataSummaryStats';
import LiveTicketFeed from './components/LiveTicketFeed';
import AlertSimulation from './components/AlertSimulation';
import Dashboard from './components/Dashboard';
import AlertPanel from './components/AlertPanel';
import UploadSection from './components/UploadSection';
import SentimentEngine from './components/SentimentEngine';
import WeeklySummary from './components/WeeklySummary';
import AgentInsightsPanel from './components/AgentInsightsPanel';
import ConversationalSummary from './components/ConversationalSummary';
import InteractiveFilters from './components/InteractiveFilters';
import ExportInsights from './components/ExportInsights';
import WelcomeModal from './components/WelcomeModal';
import SentimentTable from './components/SentimentTable';
import { SentimentData, Alert, ProcessedData } from './types';
import { generateMockData } from './utils/mockData';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

interface User {
  email: string;
  name: string;
  role: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<SentimentData[]>([]);
  const [filteredData, setFilteredData] = useState<SentimentData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedData, setProcessedData] = useState<ProcessedData | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<'upload' | 'dashboard'>('upload');
  const [totalProcessed, setTotalProcessed] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAgentInsights, setShowAgentInsights] = useState(false);

  useEffect(() => {
    if (user && !localStorage.getItem('welcomeShown')) {
      setShowWelcome(true);
      localStorage.setItem('welcomeShown', 'true');
    }
  }, [user]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleLogin = (email: string) => {
    setUser({
      email,
      name: email.split('@')[0],
      role: 'Support Manager'
    });
  };

  const handleLogout = () => {
    setUser(null);
    setData([]);
    setProcessedData(null);
    setCurrentView('upload');
    localStorage.removeItem('welcomeShown');
  };

  const handleDataUpload = (uploadedData: SentimentData[]) => {
    setIsProcessing(true);
    setData(uploadedData);
    setTotalProcessed(uploadedData.length);
    
    // Simulate processing time
    setTimeout(() => {
      const processed: ProcessedData = {
        totalTickets: uploadedData.length,
        averageSentiment: uploadedData.reduce((acc, curr) => acc + curr.sentiment, 0) / uploadedData.length,
        sentimentDistribution: {
          positive: uploadedData.filter(d => d.sentiment > 0.1).length,
          neutral: uploadedData.filter(d => d.sentiment >= -0.1 && d.sentiment <= 0.1).length,
          negative: uploadedData.filter(d => d.sentiment < -0.1).length
        },
        topIssues: ['Delivery Delays', 'Billing Issues', 'Product Quality', 'Customer Service'],
        processingDate: new Date()
      };
      
      setProcessedData(processed);
      setIsProcessing(false);
      setCurrentView('dashboard');
      
      // Generate alerts if needed
      if (processed.averageSentiment < -0.3) {
        const newAlert: Alert = {
          id: Date.now().toString(),
          type: 'warning',
          message: 'High negative sentiment detected',
          timestamp: new Date(),
          severity: 'high'
        };
        setAlerts(prev => [newAlert, ...prev]);
      }

      // Show agent insights if negative sentiment detected
      if (uploadedData.filter(d => d.sentiment < -0.3).length > 2) {
        setShowAgentInsights(true);
      }
    }, 2000);
  };

  const handleDataReset = () => {
    setData([]);
    setFilteredData([]);
    setProcessedData(null);
    setAlerts([]);
    setAcknowledgedAlerts([]);
    setCurrentView('upload');
    setShowAgentInsights(false);
  };

  const acknowledgeAlert = (alertId: string) => {
    setAcknowledgedAlerts(prev => [...prev, alertId]);
  };

  const handleFilterChange = (filtered: SentimentData[]) => {
    setFilteredData(filtered);
  };

  if (!user) {
    return (
      <TooltipProvider>
        <LoginForm onLogin={handleLogin} />
        <Toaster />
        <Sonner />
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Welcome Modal */}
        {showWelcome && (
          <WelcomeModal onClose={() => setShowWelcome(false)} />
        )}

        {/* Agent Insights Modal */}
        {showAgentInsights && (
          <AgentInsightsPanel 
            data={data} 
            onClose={() => setShowAgentInsights(false)} 
          />
        )}

        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">SentinelSage</h1>
                  <p className="text-sm text-gray-600">AI Sentiment Watchdog</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentView === 'upload' ? (
            <div className="space-y-8">
              <AIAgentExplanation />
              <UploadSection onDataUpload={handleDataUpload} isProcessing={isProcessing} />
              {data.length > 0 && <LiveTicketFeed data={data.slice(0, 5)} />}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Data Management */}
              <DataManagement 
                onReset={handleDataReset}
                onBackToUpload={() => setCurrentView('upload')}
                data={data}
              />
              
              {/* Alerts */}
              {alerts.length > 0 && (
                <AlertPanel 
                  alerts={alerts.filter(alert => !acknowledgedAlerts.includes(alert.id))}
                  onAcknowledge={acknowledgeAlert}
                />
              )}
              
              {/* Alert Simulation */}
              <AlertSimulation data={data} />
              
              {/* Data Summary */}
              {processedData && <DataSummaryStats processedData={processedData} />}
              
              {/* Conversational Summary */}
              <ConversationalSummary data={data} />
              
              {/* Interactive Filters */}
              <InteractiveFilters data={data} onFilterChange={handleFilterChange} />
              
              {/* Main Dashboard */}
              <Dashboard data={filteredData} />
              
              {/* Sentiment Table */}
              <SentimentTable data={filteredData} />
              
              {/* Export Insights */}
              <ExportInsights data={data} processedData={processedData} />
              
              {/* Additional Components */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CSATPrediction data={filteredData} />
                <SupportTeamCoach data={filteredData} />
              </div>
              
              {/* Weekly Summary */}
              <WeeklySummary data={filteredData} />
              
              {/* Sentiment Engine */}
              <SentimentEngine data={filteredData} />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white/50 backdrop-blur-md border-t border-gray-200/50 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-600">
                Built with 💡 during AI Agent Hackathon | <span className="font-semibold">Sirisha D</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                SentinelSage - Detect Frustration Before It Escalates. Delight Before It's Missed.
              </p>
            </div>
          </div>
        </footer>
      </div>
      
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
}

export default App;
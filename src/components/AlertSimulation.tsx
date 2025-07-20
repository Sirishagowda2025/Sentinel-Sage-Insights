import React, { useState, useEffect } from 'react';
import { AlertTriangle, Bell, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SentimentData } from '../types';

interface AlertSimulationProps {
  data: SentimentData[];
}

const AlertSimulation: React.FC<AlertSimulationProps> = ({ data }) => {
  const [activeAlert, setActiveAlert] = useState<any>(null);
  const [alertHistory, setAlertHistory] = useState<any[]>([]);

  useEffect(() => {
    if (data.length === 0) return;

    const negativeCount = data.filter(d => d.sentiment < -0.3).length;
    const negativePercentage = (negativeCount / data.length) * 100;

    if (negativePercentage > 20 && !activeAlert) {
      const alert = {
        id: Date.now().toString(),
        type: 'spike',
        severity: negativePercentage > 40 ? 'critical' : 'high',
        message: 'Negative sentiment spike detected',
        details: `${negativePercentage.toFixed(1)}% of recent interactions show negative sentiment`,
        suggestedActions: [
          'Alert customer experience team',
          'Review recent tickets for common issues',
          'Consider proactive customer outreach',
          'Schedule team training on empathy'
        ],
        timestamp: new Date(),
        acknowledged: false
      };
      setActiveAlert(alert);
    }
  }, [data, activeAlert]);

  const acknowledgeAlert = () => {
    if (activeAlert) {
      setAlertHistory(prev => [...prev, { ...activeAlert, acknowledged: true }]);
      setActiveAlert(null);
    }
  };

  const dismissAlert = () => {
    setActiveAlert(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-50';
      case 'high':
        return 'border-orange-500 bg-orange-50';
      default:
        return 'border-yellow-500 bg-yellow-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      default:
        return <Bell className="h-5 w-5 text-yellow-600" />;
    }
  };

  return (
    <div className="space-y-4">
      {activeAlert && (
        <Card className={`border-2 ${getSeverityColor(activeAlert.severity)} animate-pulse-border`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {getSeverityIcon(activeAlert.severity)}
                🚨 Agent Alert: {activeAlert.message}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={acknowledgeAlert}>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Acknowledge
                </Button>
                <Button variant="ghost" size="sm" onClick={dismissAlert}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription className="text-base font-medium">
              {activeAlert.details}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">🤖 AI Suggested Actions:</h4>
                <ul className="space-y-1 text-sm">
                  {activeAlert.suggestedActions.map((action: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-xs text-gray-500">
                Alert triggered at {activeAlert.timestamp.toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {alertHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Alert History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alertHistory.slice(-3).map((alert, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{alert.message}</div>
                    <div className="text-xs text-gray-500">
                      {alert.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{alert.details}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AlertSimulation;
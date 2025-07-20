import React from 'react';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert } from '../types';

interface AlertPanelProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
}

const AlertPanel: React.FC<AlertPanelProps> = ({ alerts, onAcknowledge }) => {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAlertBorder = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return 'border-l-4 border-red-500';
      case 'medium':
        return 'border-l-4 border-yellow-500';
      default:
        return 'border-l-4 border-blue-500';
    }
  };

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Active Alerts</h3>
      {alerts.map((alert) => (
        <Card key={alert.id} className={`${getAlertBorder(alert.severity)} animate-pulse-border`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getAlertIcon(alert.type)}
                <CardTitle className="text-base">{alert.message}</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onAcknowledge(alert.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {alert.suggestedAction && (
                <div className="mt-2">
                  <strong>Suggested Action:</strong> {alert.suggestedAction}
                </div>
              )}
              <div className="text-xs text-gray-500 mt-2">
                {alert.timestamp.toLocaleString()}
              </div>
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AlertPanel;
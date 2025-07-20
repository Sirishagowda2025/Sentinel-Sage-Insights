import React, { useState } from 'react';
import { RefreshCw, ArrowLeft, Download, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SentimentData } from '../types';

interface DataManagementProps {
  onReset: () => void;
  onBackToUpload: () => void;
  data: SentimentData[];
}

const DataManagement: React.FC<DataManagementProps> = ({ onReset, onBackToUpload, data }) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    if (showResetConfirm) {
      onReset();
      setShowResetConfirm(false);
    } else {
      setShowResetConfirm(true);
      setTimeout(() => setShowResetConfirm(false), 3000);
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Message', 'Sentiment', 'Channel', 'Agent', 'Timestamp', 'Customer', 'Category'],
      ...data.map(row => [
        row.id,
        row.message,
        row.sentiment.toFixed(3),
        row.channel,
        row.agent,
        row.timestamp.toISOString(),
        row.customer,
        row.category
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sentiment-analysis-results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Data Management
        </CardTitle>
        <CardDescription>
          Manage your uploaded data and analysis results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" onClick={onBackToUpload}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Upload
          </Button>
          
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
          
          <Button 
            variant={showResetConfirm ? "destructive" : "outline"}
            onClick={handleReset}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {showResetConfirm ? 'Confirm Reset' : 'Reset Data'}
          </Button>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>Total records: {data.length}</p>
          <p>Last updated: {new Date().toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataManagement;
import React, { useRef, useState } from 'react';
import { Upload, FileText, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateMockData } from '../utils/mockData';
import { SentimentData } from '../types';

interface UploadSectionProps {
  onDataUpload: (data: SentimentData[]) => void;
  isProcessing: boolean;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onDataUpload, isProcessing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        // For demo purposes, we'll use mock data
        const mockData = generateMockData();
        onDataUpload(mockData);
      } catch (error) {
        console.error('Error parsing CSV:', error);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type === 'text/csv') {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleSampleData = () => {
    const sampleData = generateMockData();
    onDataUpload(sampleData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Upload className="h-6 w-6" />
            Upload Support Chat CSV
          </CardTitle>
          <CardDescription>
            Upload your support chat data for AI-powered sentiment analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
          >
            {isProcessing ? (
              <div className="space-y-4">
                <Sparkles className="h-12 w-12 mx-auto text-blue-600 animate-spin" />
                <div>
                  <h3 className="text-lg font-semibold">Processing Your Data</h3>
                  <p className="text-gray-600">AI is analyzing sentiment patterns...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <FileText className="h-12 w-12 mx-auto text-gray-400" />
                <div>
                  <h3 className="text-lg font-semibold">Drop your CSV file here</h3>
                  <p className="text-gray-600">or click to browse your files</p>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => fileInputRef.current?.click()}>
                    Browse Files
                  </Button>
                  <Button variant="outline" onClick={handleSampleData}>
                    <Download className="h-4 w-4 mr-2" />
                    Try Sample Dataset
                  </Button>
                </div>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Expected format: CSV with columns for message, timestamp, customer, channel</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadSection;
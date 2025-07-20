import React, { useState } from 'react';
import { ChevronDown, ChevronRight, MessageCircle, User, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SentimentData } from '../types';

interface SentimentTableProps {
  data: SentimentData[];
}

const SentimentTable: React.FC<SentimentTableProps> = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.1) return 'text-green-600 bg-green-100';
    if (sentiment < -0.1) return 'text-red-600 bg-red-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  const getSentimentEmoji = (sentiment: number) => {
    if (sentiment > 0.5) return '😄';
    if (sentiment > 0.1) return '🙂';
    if (sentiment > -0.1) return '😐';
    if (sentiment > -0.5) return '🙁';
    return '😠';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.8) return 'text-green-600';
    if (confidence > 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Detailed Sentiment Analysis
        </CardTitle>
        <CardDescription>
          Interactive table with expandable message details and AI insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.slice(0, 20).map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden">
              {/* Main Row */}
              <div 
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleExpanded(item.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      {expandedRows.has(item.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <div className={`px-2 py-1 rounded-full text-sm font-medium ${getSentimentColor(item.sentiment)}`}>
                      {getSentimentEmoji(item.sentiment)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {item.customer}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        "{item.message.substring(0, 60)}..."
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <div className={`font-bold ${getSentimentColor(item.sentiment).split(' ')[0]}`}>
                        {item.sentiment.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">Sentiment</div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`font-bold ${getConfidenceColor(item.confidence)}`}>
                        {(item.confidence * 100).toFixed(0)}%
                      </div>
                      <div className="text-xs text-gray-500">Confidence</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-bold">{item.channel}</div>
                      <div className="text-xs text-gray-500">Channel</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Expanded Details */}
              {expandedRows.has(item.id) && (
                <div className="border-t bg-gray-50 p-4">
                  <div className="space-y-4">
                    {/* Full Message */}
                    <div>
                      <h4 className="font-semibold mb-2">Full Message</h4>
                      <div className="p-3 bg-white rounded border">
                        <p className="text-sm">{item.message}</p>
                      </div>
                    </div>
                    
                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-3 bg-white rounded border">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">Agent</span>
                        </div>
                        <div className="text-sm">{item.agent}</div>
                      </div>
                      
                      <div className="p-3 bg-white rounded border">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">Timestamp</span>
                        </div>
                        <div className="text-sm">{item.timestamp.toLocaleString()}</div>
                      </div>
                      
                      <div className="p-3 bg-white rounded border">
                        <div className="flex items-center gap-2 mb-1">
                          <Star className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">CSAT Prediction</span>
                        </div>
                        <div className="text-sm">{item.csatPrediction || 3}/5</div>
                      </div>
                      
                      <div className="p-3 bg-white rounded border">
                        <div className="flex items-center gap-2 mb-1">
                          <MessageCircle className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium">Category</span>
                        </div>
                        <div className="text-sm">{item.category}</div>
                      </div>
                    </div>
                    
                    {/* Keywords */}
                    {item.keywords.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Keywords Detected</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.keywords.map((keyword, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* AI Analysis */}
                    <div className="p-3 bg-blue-50 rounded border border-blue-200">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        🤖 AI Analysis
                      </h4>
                      <div className="text-sm space-y-1">
                        <div>
                          <strong>Sentiment Score:</strong> {item.sentiment.toFixed(3)} 
                          ({item.sentiment > 0.1 ? 'Positive' : item.sentiment < -0.1 ? 'Negative' : 'Neutral'})
                        </div>
                        <div>
                          <strong>Confidence Level:</strong> {(item.confidence * 100).toFixed(1)}% 
                          ({item.confidence > 0.8 ? 'High' : item.confidence > 0.6 ? 'Medium' : 'Low'})
                        </div>
                        <div>
                          <strong>Predicted CSAT:</strong> {item.csatPrediction || 3}/5 stars
                        </div>
                        {item.sentiment < -0.3 && (
                          <div className="text-red-600">
                            <strong>⚠️ Alert:</strong> High frustration detected - consider escalation
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {data.length > 20 && (
            <div className="text-center py-4 text-gray-500">
              Showing first 20 results. Use filters above to refine your search.
            </div>
          )}
          
          {data.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No data to display. Upload or load sample data to see sentiment analysis results.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentTable;
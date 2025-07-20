import React, { useState, useEffect } from 'react';
import { Filter, Search, SortAsc } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { SentimentData, FilterOptions } from '../types';

interface InteractiveFiltersProps {
  data: SentimentData[];
  onFilterChange: (filteredData: SentimentData[]) => void;
}

const InteractiveFilters: React.FC<InteractiveFiltersProps> = ({ data, onFilterChange }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    sentiment: 'all',
    channel: 'all',
    agent: 'all',
    sortBy: 'timestamp',
    limit: 50
  });
  const [searchTerm, setSearchTerm] = useState('');

  const uniqueChannels = [...new Set(data.map(d => d.channel))];
  const uniqueAgents = [...new Set(data.map(d => d.agent))];

  useEffect(() => {
    let filteredData = [...data];

    // Search filter
    if (searchTerm) {
      filteredData = filteredData.filter(item =>
        item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sentiment filter
    if (filters.sentiment !== 'all') {
      switch (filters.sentiment) {
        case 'positive':
          filteredData = filteredData.filter(d => d.sentiment > 0.1);
          break;
        case 'negative':
          filteredData = filteredData.filter(d => d.sentiment < -0.1);
          break;
        case 'neutral':
          filteredData = filteredData.filter(d => d.sentiment >= -0.1 && d.sentiment <= 0.1);
          break;
        case 'critical':
          filteredData = filteredData.filter(d => d.sentiment < -0.5);
          break;
      }
    }

    // Channel filter
    if (filters.channel !== 'all') {
      filteredData = filteredData.filter(d => d.channel === filters.channel);
    }

    // Agent filter
    if (filters.agent !== 'all') {
      filteredData = filteredData.filter(d => d.agent === filters.agent);
    }

    // Sort
    switch (filters.sortBy) {
      case 'sentiment_asc':
        filteredData.sort((a, b) => a.sentiment - b.sentiment);
        break;
      case 'sentiment_desc':
        filteredData.sort((a, b) => b.sentiment - a.sentiment);
        break;
      case 'timestamp':
        filteredData.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        break;
      case 'confidence':
        filteredData.sort((a, b) => b.confidence - a.confidence);
        break;
    }

    // Limit results
    filteredData = filteredData.slice(0, filters.limit);

    onFilterChange(filteredData);
  }, [data, filters, searchTerm, onFilterChange]);

  const quickFilters = [
    { label: 'Show Only Negative', action: () => setFilters(prev => ({ ...prev, sentiment: 'negative' })) },
    { label: 'Critical Issues', action: () => setFilters(prev => ({ ...prev, sentiment: 'critical' })) },
    { label: 'Recent First', action: () => setFilters(prev => ({ ...prev, sortBy: 'timestamp' })) },
    { label: 'Worst First', action: () => setFilters(prev => ({ ...prev, sortBy: 'sentiment_asc' })) },
    { label: 'Reset Filters', action: () => {
      setFilters({ sentiment: 'all', channel: 'all', agent: 'all', sortBy: 'timestamp', limit: 50 });
      setSearchTerm('');
    }}
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Interactive Filters & Search
        </CardTitle>
        <CardDescription>
          Filter and explore your sentiment data with advanced controls
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search messages or customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((filter, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={filter.action}
                className="text-xs"
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Select value={filters.sentiment} onValueChange={(value) => setFilters(prev => ({ ...prev, sentiment: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sentiment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sentiments</SelectItem>
                <SelectItem value="positive">😊 Positive</SelectItem>
                <SelectItem value="neutral">😐 Neutral</SelectItem>
                <SelectItem value="negative">😠 Negative</SelectItem>
                <SelectItem value="critical">🚨 Critical</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.channel} onValueChange={(value) => setFilters(prev => ({ ...prev, channel: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                {uniqueChannels.map(channel => (
                  <SelectItem key={channel} value={channel}>{channel}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.agent} onValueChange={(value) => setFilters(prev => ({ ...prev, agent: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                {uniqueAgents.map(agent => (
                  <SelectItem key={agent} value={agent}>{agent}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="timestamp">⏰ Recent First</SelectItem>
                <SelectItem value="sentiment_desc">👍 Best First</SelectItem>
                <SelectItem value="sentiment_asc">👎 Worst First</SelectItem>
                <SelectItem value="confidence">🎯 High Confidence</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.limit.toString()} onValueChange={(value) => setFilters(prev => ({ ...prev, limit: parseInt(value) }))}>
              <SelectTrigger>
                <SelectValue placeholder="Limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Show 10</SelectItem>
                <SelectItem value="25">Show 25</SelectItem>
                <SelectItem value="50">Show 50</SelectItem>
                <SelectItem value="100">Show 100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Summary */}
          <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <SortAsc className="h-4 w-4" />
              <span>
                Showing filtered results | 
                Search: {searchTerm || 'none'} | 
                Sentiment: {filters.sentiment} | 
                Channel: {filters.channel} | 
                Agent: {filters.agent}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveFilters;
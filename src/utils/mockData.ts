import { SentimentData } from '../types';

export const generateMockData = (): SentimentData[] => {
  const channels = ['Email', 'Chat', 'Phone', 'Social'];
  const agents = ['Sarah', 'Mike', 'Emma', 'David', 'Lisa'];
  const categories = ['Billing', 'Technical', 'Delivery', 'Product', 'General'];
  
  const messages = [
    { text: "I'm extremely disappointed with the delayed delivery. This is unacceptable!", sentiment: -0.8 },
    { text: "Thank you so much for the quick resolution! Excellent service.", sentiment: 0.9 },
    { text: "The product quality is below expectations. Not happy with this purchase.", sentiment: -0.6 },
    { text: "Great customer support! Very helpful and professional.", sentiment: 0.8 },
    { text: "Average experience. Nothing special but got the job done.", sentiment: 0.1 },
    { text: "Terrible experience! I want a full refund immediately!", sentiment: -0.9 },
    { text: "The team was amazing! Solved my issue in minutes.", sentiment: 0.7 },
    { text: "Product works as described. Standard quality.", sentiment: 0.2 },
    { text: "Billing error again! This is the third time this month.", sentiment: -0.7 },
    { text: "Outstanding service! Will definitely recommend to others.", sentiment: 0.9 }
  ];

  return Array.from({ length: 50 }, (_, i) => {
    const message = messages[i % messages.length];
    return {
      id: `ticket-${i + 1}`,
      message: message.text,
      sentiment: message.sentiment + (Math.random() - 0.5) * 0.2,
      channel: channels[Math.floor(Math.random() * channels.length)],
      agent: agents[Math.floor(Math.random() * agents.length)],
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      customer: `customer-${i + 1}@example.com`,
      category: categories[Math.floor(Math.random() * categories.length)],
      confidence: 0.7 + Math.random() * 0.3,
      keywords: ['service', 'product', 'delivery', 'support'].slice(0, Math.floor(Math.random() * 3) + 1),
      csatPrediction: Math.max(1, Math.min(5, Math.round(3 + message.sentiment * 2)))
    };
  });
};
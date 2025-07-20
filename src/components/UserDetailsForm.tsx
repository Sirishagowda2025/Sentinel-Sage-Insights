import React, { useState } from 'react';
import { ArrowRight, Brain, User, Mail, Building, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserDetailsFormProps {
  onComplete: (userDetails: UserDetails) => void;
}

export interface UserDetails {
  fullName: string;
  email: string;
  role: string;
  company?: string;
  agreedToTerms: boolean;
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({ onComplete }) => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    fullName: '',
    email: '',
    role: '',
    company: '',
    agreedToTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userDetails.fullName && userDetails.email && userDetails.role && userDetails.agreedToTerms) {
      onComplete(userDetails);
    }
  };

  const handleInputChange = (field: keyof UserDetails, value: string | boolean) => {
    setUserDetails(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration */}
        <div className="text-center lg:text-left">
          <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-8 border border-white/20">
            <Brain className="h-16 w-16 text-white" />
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Your Journey with AI-Powered Insights
          </h2>
          
          <div className="space-y-4 text-blue-100">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Real-time sentiment monitoring</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Proactive escalation alerts</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>AI-powered team coaching</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Comprehensive analytics dashboard</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <Card className="backdrop-blur-md bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-2xl">
              Let's Personalize Your Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">
                  Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-200" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={userDetails.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-blue-200"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email ID *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-200" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={userDetails.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-blue-200"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-white">
                  Role *
                </Label>
                <Select value={userDetails.role} onValueChange={(value) => handleInputChange('role', value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support-agent">Support Agent</SelectItem>
                    <SelectItem value="cx-manager">CX Manager</SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-white">
                  Company Name (Optional)
                </Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-200" />
                  <Input
                    id="company"
                    type="text"
                    placeholder="Enter your company name"
                    value={userDetails.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-blue-200"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={userDetails.agreedToTerms}
                  onCheckedChange={(checked) => handleInputChange('agreedToTerms', !!checked)}
                  className="border-white/20 data-[state=checked]:bg-blue-600"
                />
                <Label htmlFor="terms" className="text-blue-100 text-sm">
                  I agree to let this demo process anonymized chat data.
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 disabled:opacity-50"
                disabled={!userDetails.fullName || !userDetails.email || !userDetails.role || !userDetails.agreedToTerms}
              >
                Start Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetailsForm;
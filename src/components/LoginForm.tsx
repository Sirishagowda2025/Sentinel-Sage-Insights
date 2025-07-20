import React, { useState } from 'react';
import { LogIn, Mail, Lock, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginFormProps {
  onLogin: (email: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin(email);
    }
  };

  const handleDemoLogin = () => {
    onLogin('demo@sentinelsage.ai');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SentinelSage</h1>
          <p className="text-blue-100">AI Customer Sentiment Watchdog</p>
          <p className="text-sm text-blue-200 mt-2">Detect Frustration Before It Escalates</p>
        </div>

        <Card className="backdrop-blur-md bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Sign In</CardTitle>
            <CardDescription className="text-blue-100">
              Access your sentiment monitoring dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-200" />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-blue-200"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-200" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-blue-200"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-blue-600 hover:bg-blue-50"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/20">
              <Button
                onClick={handleDemoLogin}
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                Try Demo Account
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-blue-100 text-sm">
          Built with 💡 during AI Agent Hackathon | Sirisha D
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
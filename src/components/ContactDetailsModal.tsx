import React, { useState } from 'react';
import { Mail, Phone, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface ContactDetails {
  email: string;
  phone?: string;
  preferredContact: 'email' | 'phone';
}

interface ContactDetailsModalProps {
  onSubmit: (details: ContactDetails, message: string) => void;
  onClose: () => void;
  alertMessage: string;
}

const ContactDetailsModal: React.FC<ContactDetailsModalProps> = ({ onSubmit, onClose, alertMessage }) => {
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    email: '',
    phone: '',
    preferredContact: 'email'
  });
  const [customMessage, setCustomMessage] = useState(alertMessage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactDetails.email || contactDetails.phone) {
      onSubmit(contactDetails, customMessage);
    }
  };

  const handleInputChange = (field: keyof ContactDetails, value: string) => {
    setContactDetails(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full bg-white border-2 border-blue-300">
        <CardHeader className="bg-blue-50 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Mail className="h-5 w-5" />
              Contact Details for Alert Notification
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={contactDetails.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={contactDetails.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Preferred Contact Method</Label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="email"
                    checked={contactDetails.preferredContact === 'email'}
                    onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Email</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="phone"
                    checked={contactDetails.preferredContact === 'phone'}
                    onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Phone</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Alert Message</Label>
              <Textarea
                id="message"
                placeholder="Customize your alert message..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                disabled={!contactDetails.email}
              >
                Send Alert
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactDetailsModal;
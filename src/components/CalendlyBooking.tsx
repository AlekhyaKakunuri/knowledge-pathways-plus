import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Clock, Video, Users, Star, ExternalLink, Play } from 'lucide-react';
import { CALENDLY_CONFIG } from '@/config/calendly';

interface CalendlyBookingProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendlyBooking = ({ isOpen, onClose }: CalendlyBookingProps) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Video':
        return <Video className="h-5 w-5 text-primary" />;
      case 'Clock':
        return <Clock className="h-5 w-5 text-primary" />;
      case 'Users':
        return <Users className="h-5 w-5 text-primary" />;
      default:
        return <Calendar className="h-5 w-5 text-primary" />;
    }
  };

  const openCalendlyDirectly = () => {
    window.open(CALENDLY_CONFIG.FULL_URL, '_blank');
  };

  const openCalendlyPopup = () => {
    const calendlyUrl = CALENDLY_CONFIG.FULL_URL;
    const popupWidth = 800;
    const popupHeight = 600;
    const left = (window.screen.width - popupWidth) / 2;
    const top = (window.screen.height - popupHeight) / 2;
    
    const popup = window.open(
      calendlyUrl,
      'Calendly',
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );
    
    if (popup) {
      popup.focus();
    } else {
      // Fallback to new tab
      window.open(calendlyUrl, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">{CALENDLY_CONFIG.EVENT_TITLE}</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {CALENDLY_CONFIG.EVENT_DESCRIPTION}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6">
          {/* Main Booking Options */}
          <div className="mb-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Book Your 1-to-1 Session</h3>
            <p className="text-muted-foreground mb-6">
              Choose how you'd like to book your session. All options will take you to the same Calendly calendar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              {/* Popup Option */}
              <button
                onClick={openCalendlyPopup}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Play className="h-4 w-4" />
                Open Calendar
              </button>
              
              {/* New Tab Option */}
              <button
                onClick={openCalendlyDirectly}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                New Tab
              </button>
            </div>
          </div>

          {/* Session Benefits */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {CALENDLY_CONFIG.FEATURES.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
                {getIconComponent(feature.icon)}
                <div>
                  <p className="font-medium text-sm">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* What You'll Get */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              What you'll get from this session:
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {CALENDLY_CONFIG.BENEFITS.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Alternative Booking Methods */}
          <div className="border rounded-lg p-6 bg-muted/20">
            <h3 className="font-semibold mb-4 text-center">Alternative Booking Methods</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-background rounded-lg border">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium mb-2">Direct Calendly Link</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Book directly on Calendly's website
                </p>
                <a 
                  href={CALENDLY_CONFIG.FULL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  Book Now
                </a>
              </div>
              
              <div className="text-center p-4 bg-background rounded-lg border">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium mb-2">Email Booking</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Contact us for custom scheduling
                </p>
                <a 
                  href={`mailto:${CALENDLY_CONFIG.SUPPORT_EMAIL}?subject=Book 1-to-1 Session&body=Hi, I'd like to book a 1-to-1 learning session. Please let me know available times.`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors text-sm"
                >
                  <Calendar className="h-4 w-4" />
                  Email Us
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Can't find a suitable time?{' '}
              <a 
                href={`mailto:${CALENDLY_CONFIG.SUPPORT_EMAIL}`}
                className="text-primary hover:underline"
              >
                Contact us
              </a>{' '}
              for custom scheduling.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendlyBooking;

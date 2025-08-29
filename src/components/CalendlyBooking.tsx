import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Clock, Video, Users, Star, ExternalLink, Play, Copy, Mail, Check } from 'lucide-react';
import { CALENDLY_CONFIG } from '@/config/calendly';

interface CalendlyBookingProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendlyBooking = ({ isOpen, onClose }: CalendlyBookingProps) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [showEmailOptions, setShowEmailOptions] = useState(false);

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

  // Enhanced email handling with multiple fallback options
  const handleEmailUs = async () => {
    const email = CALENDLY_CONFIG.SUPPORT_EMAIL;
    const subject = 'Book 1-to-1 Session';
    const body = 'Hi, I\'d like to book a 1-to-1 learning session. Please let me know available times.';
    
    // Try mailto link first
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
      // Attempt to open mailto link
      window.location.href = mailtoLink;
      
      // Check if mailto was successful after a short delay
      setTimeout(() => {
        // If we're still on the same page, mailto probably failed
        if (window.location.href === window.location.href) {
          setShowEmailOptions(true);
        }
      }, 1000);
      
    } catch (error) {
      // Fallback to showing email options
      setShowEmailOptions(true);
    }
  };

  // Copy email to clipboard
  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(CALENDLY_CONFIG.SUPPORT_EMAIL);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = CALENDLY_CONFIG.SUPPORT_EMAIL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  // Open Gmail web with pre-filled content
  const openGmailWeb = () => {
    const email = CALENDLY_CONFIG.SUPPORT_EMAIL;
    const subject = 'Book 1-to-1 Session';
    const body = 'Hi, I\'d like to book a 1-to-1 learning session. Please let me know available times.';
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  // Open Outlook web with pre-filled content
  const openOutlookWeb = () => {
    const email = CALENDLY_CONFIG.SUPPORT_EMAIL;
    const subject = 'Book 1-to-1 Session';
    const body = 'Hi, I\'d like to book a 1-to-1 learning session. Please let me know available times.';
    
    const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${email}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(outlookUrl, '_blank');
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[95vw] max-w-4xl h-[95vh] max-h-[95vh] overflow-hidden p-0 flex flex-col">
          <DialogHeader className="p-4 sm:p-6 pb-4 border-b flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg sm:text-xl font-bold">{CALENDLY_CONFIG.EVENT_TITLE}</DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm">
                  {CALENDLY_CONFIG.EVENT_DESCRIPTION}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {/* Main Booking Options */}
            <div className="mb-6 sm:mb-8 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Book Your 1-to-1 Session</h3>
              <p className="text-muted-foreground mb-4 sm:mb-6 text-sm">
                Choose how you'd like to book your session. All options will take you to the same Calendly calendar.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
                {/* Popup Option */}
                <button
                  onClick={openCalendlyPopup}
                  className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                >
                  <Play className="h-4 w-4" />
                  Open Calendar
                </button>
                
                {/* New Tab Option */}
                <button
                  onClick={openCalendlyDirectly}
                  className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  New Tab
                </button>
              </div>
            </div>

            {/* Session Benefits */}
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4 mb-6">
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
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                <Star className="h-4 w-4 text-primary" />
                What you'll get from this session:
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {CALENDLY_CONFIG.BENEFITS.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Alternative Booking Methods */}
            <div className="border rounded-lg p-4 sm:p-6 bg-muted/20 mb-4">
              <h3 className="font-semibold mb-4 text-center text-sm sm:text-base">Alternative Booking Methods</h3>
              <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 bg-background rounded-lg border">
                  <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-medium mb-2 text-sm sm:text-base">Direct Calendly Link</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Book directly on Calendly's website
                  </p>
                  <a 
                    href={CALENDLY_CONFIG.FULL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-xs sm:text-sm"
                  >
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                    Book Now
                  </a>
                </div>
                
                <div className="text-center p-3 sm:p-4 bg-background rounded-lg border">
                  <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-medium mb-2 text-sm sm:text-base">Email Booking</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                    Contact us for custom scheduling
                  </p>
                  <button 
                    onClick={handleEmailUs}
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors text-xs sm:text-sm"
                  >
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                    Email Us
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs sm:text-sm text-muted-foreground pb-2">
              <p>
                Can't find a suitable time?{' '}
                <button 
                  onClick={handleEmailUs}
                  className="text-primary hover:underline"
                >
                  Contact us
                </button>{' '}
                for custom scheduling.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Options Modal */}
      {showEmailOptions && (
        <Dialog open={showEmailOptions} onOpenChange={setShowEmailOptions}>
          <DialogContent className="w-[90vw] max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Email Options</DialogTitle>
              <DialogDescription>
                Choose how you'd like to send us an email
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3">
              {/* Copy Email */}
              <button
                onClick={copyEmailToClipboard}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                {emailCopied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Email Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Email Address
                  </>
                )}
              </button>

              {/* Gmail Web */}
              <button
                onClick={openGmailWeb}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Open Gmail Web
              </button>

              {/* Outlook Web */}
              <button
                onClick={openOutlookWeb}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Open Outlook Web
              </button>

              {/* Manual Email */}
              <div className="text-center p-3 bg-muted/20 rounded-lg">
                <p className="text-sm font-medium mb-2">Or manually send to:</p>
                <p className="text-primary font-mono text-sm break-all">
                  {CALENDLY_CONFIG.SUPPORT_EMAIL}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CalendlyBooking;

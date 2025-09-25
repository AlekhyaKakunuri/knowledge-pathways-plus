import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Clock, Video, Users, Star, ExternalLink } from 'lucide-react';
import { CALENDLY_CONFIG } from '@/config/calendly';
import { useNavigate } from 'react-router-dom';

interface CalendlyBookingProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendlyBooking = ({ isOpen, onClose }: CalendlyBookingProps) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [showEmailOptions, setShowEmailOptions] = useState(false);
  const navigate = useNavigate();

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Video':
        return <Video className="h-5 w-5 text-theme-primary" />;
      case 'Clock':
        return <Clock className="h-5 w-5 text-theme-primary" />;
      case 'Users':
        return <Users className="h-5 w-5 text-theme-primary" />;
      default:
        return <Calendar className="h-5 w-5 text-theme-primary" />;
    }
  };

  const openCalendlyDirectly = () => {
    window.open(CALENDLY_CONFIG.FULL_URL, '_blank');
  };

  // Navigate to contact page
  const handleContactUs = () => {
    onClose(); // Close the modal first
    navigate('/contact'); // Navigate to contact page
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[95vw] max-w-4xl h-[95vh] max-h-[95vh] overflow-hidden p-0 flex flex-col">
          <DialogHeader className="p-4 sm:p-6 pb-4 border-b flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-theme-primary" />
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
                <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-theme-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Book Your 1-to-1 Session</h3>
              <p className="text-muted-foreground mb-4 sm:mb-6 text-sm">
                Choose how you'd like to book your session. All options will take you to the same Calendly calendar.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
                {/* Popup Option */}
                
                {/* New Tab Option */}
                <button
                  onClick={openCalendlyDirectly}
                  className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-theme-primary text-white rounded-lg hover:bg-theme-primary-hover transition-colors text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Calendar
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
                <Star className="h-4 w-4 text-theme-primary" />
                What you'll get from this session:
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {CALENDLY_CONFIG.BENEFITS.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-theme-primary flex-shrink-0"></div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>


            {/* Footer */}
            <div className="text-center text-xs sm:text-sm text-muted-foreground pb-2">
              <p>
                Can't find a suitable time?{' '}
                <button 
                  onClick={handleContactUs}
                  className="text-theme-primary hover:text-theme-primary-hover hover:underline"
                >
                  Contact us
                </button>{' '}
                for custom scheduling.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>


    </>
  );
};

export default CalendlyBooking;

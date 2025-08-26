import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, X } from 'lucide-react';
import CalendlyBooking from './CalendlyBooking';

const FloatingBookingButton = () => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <>
      {/* Floating Button - Positioned to avoid overlap with WhatsApp */}
      <div className="fixed bottom-6 left-6 z-50 group"> {/* Changed from right-6 to left-6 */}
        <Button
          onClick={() => setIsCalendlyOpen(true)}
          size="lg"
          className="bg-gradient-to-r from-premium to-accent hover:from-premium/90 hover:to-accent/90 text-premium-foreground shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 rounded-full w-16 h-16 p-0 animate-float"
        >
          <Calendar className="h-6 w-6" />
        </Button>
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-foreground text-background text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Book 1-to-1 Session
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
        </div>
      </div>

      {/* Calendly Modal */}
      <CalendlyBooking 
        isOpen={isCalendlyOpen} 
        onClose={() => setIsCalendlyOpen(false)} 
      />
    </>
  );
};

export default FloatingBookingButton;

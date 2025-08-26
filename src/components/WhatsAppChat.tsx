import { useState, useEffect } from "react";
import { MessageCircle, X, Phone, Sparkles, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // WhatsApp business number - replace with your actual number
  const whatsappNumber = "917752957819"; // Format: country code + number (no + or spaces)
  const whatsappMessage = "Hi 👋, how can we help you today?";

  useEffect(() => {
    // Show the button after a short delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show welcome message after chat opens
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowWelcome(false);
    }
  }, [isOpen]);

  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab/window
    window.open(whatsappUrl, '_blank');
    
    // Close the chat interface
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      {/* Chat Interface */}
      {isOpen && (
        <div className="mb-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-[320px] w-[calc(100vw-2rem)] md:w-80 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"></div>
              </div>
              
              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base">WhatsApp Support</h3>
                  <div className="flex items-center gap-2 text-sm text-green-100">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <span>Online now</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto text-white hover:bg-white/20 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100">
              {/* Welcome Message */}
              {showWelcome && (
                <div className="animate-in slide-in-from-left-2 duration-300">
                  <div className="bg-white rounded-lg p-3 shadow-sm mb-4 border border-gray-100">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-3 w-3 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 font-medium">Welcome! 👋</p>
                        <p className="text-sm text-gray-600 mt-1">{whatsappMessage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Quick Info */}
              <div className="bg-white rounded-lg p-3 shadow-sm mb-4 border border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Response time: ~2 min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
              
              {/* Action Button */}
              <div className="space-y-3">
                <Button
                  onClick={openWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02] whatsapp-glow"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Chat on WhatsApp
                </Button>
                
                <div className="text-center space-y-1">
                  <p className="text-xs text-gray-500">
                    Opens WhatsApp app or web
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    💬 Get instant help from our experts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative"
      >
        <Button
          onClick={handleButtonClick}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl transition-all duration-300 whatsapp-float ${
            isOpen 
              ? 'bg-red-500 hover:bg-red-600 scale-110' 
              : 'bg-green-500 hover:bg-green-600 hover:scale-110'
          }`}
          size="icon"
        >
          {isOpen ? (
            <X className="h-6 w-6 md:h-7 md:w-7 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 md:h-7 md:w-7 text-white" />
          )}
        </Button>

        {/* Hover Tooltip */}
        {isHovered && !isOpen && (
          <div className="absolute bottom-full right-0 mb-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              Need help? Chat with us! 💬
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        )}

        {/* Notification Badge */}
        {!isOpen && (
          <div className="absolute -top-2 -right-2">
            <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full whatsapp-pulse shadow-lg">
              Live
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppChat;

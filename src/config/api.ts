// API Configuration
const getBaseUrl = () => {
  // Check if we're in development (localhost)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8000';
  }
  
  // Check for environment variable first
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Production fallback - replace with your actual production API URL
  return 'https://api.aicareerx.com';
};

const API_CONFIG = {
  // Base URL - smart detection based on environment
  BASE_URL: getBaseUrl(),
  
  // Endpoints
  SEND_INVOICE: '/automation/send-invoice',
  
  // Full URLs
  get SEND_INVOICE_URL() {
    return `${this.BASE_URL}${this.SEND_INVOICE}`;
  }
};

export default API_CONFIG;

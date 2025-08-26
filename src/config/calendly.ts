// Calendly Configuration
// ✅ CONFIGURED: Using your actual Calendly details

export const CALENDLY_CONFIG = {
  // Your Calendly username (found in your Calendly URL)
  // From: https://calendly.com/alekhyakakunuri/30min
  USERNAME: 'alekhyakakunuri', // ✅ Your actual username
  
  // Event type slug (found in your Calendly event URL)
  // From: https://calendly.com/alekhyakakunuri/30min
  EVENT_TYPE: '30min', // ✅ Your actual event type
  
  // Full Calendly URL (automatically generated from USERNAME and EVENT_TYPE above)
  get FULL_URL() {
    return `https://calendly.com/${this.USERNAME}/${this.EVENT_TYPE}`;
  },
  
  // Event duration in minutes
  DURATION: 30,
  
  // Event title
  EVENT_TITLE: '1-to-1 Learning Session',
  
  // Event description
  EVENT_DESCRIPTION: 'Personalized learning session with our expert instructor',
  
  // Contact email for custom scheduling
  SUPPORT_EMAIL: 'alekhyakakunuri@gmail.com', // ✅ Update this with your actual email
  
  // Session benefits
  BENEFITS: [
    'Personalized learning plan based on your goals',
    'Direct answers to your specific questions',
    'Code review and debugging assistance',
    'Project guidance and best practices'
  ],
  
  // Session features
  FEATURES: [
    {
      icon: 'Video',
      title: 'Video Call',
      description: 'Face-to-face interaction'
    },
    {
      icon: 'Clock',
      title: '30 Minutes',
      description: 'Focused learning time'
    },
    {
      icon: 'Users',
      title: 'Personalized',
      description: 'Tailored to your needs'
    }
  ]
};

// 🎉 CONFIGURATION COMPLETE!
// 
// Your Calendly integration is now configured with:
// ✅ USERNAME: 'alekhyakakunuri'
// ✅ EVENT_TYPE: '30min'
// ✅ URL: https://calendly.com/alekhyakakunuri/30min
//
// The calendar should now load properly with your actual available time slots!
//
// To customize further:
// 1. Update SUPPORT_EMAIL with your preferred contact email
// 2. Modify EVENT_TITLE and EVENT_DESCRIPTION if desired
// 3. Adjust BENEFITS and FEATURES to match your service offering

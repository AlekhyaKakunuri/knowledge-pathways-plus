# 🗓️ Calendly Integration Setup Guide

This guide will help you set up the Calendly integration for your 1-to-1 session booking feature.

## 🚀 **Features Added**

- ✅ **Homepage Booking Button** - Prominent CTA button in the hero section
- ✅ **Floating Booking Button** - Always visible floating button on all pages
- ✅ **Responsive Calendly Modal** - Full-screen modal with embedded calendar
- ✅ **Session Information** - Benefits and features display
- ✅ **Contact Support** - Fallback for custom scheduling

## 📋 **Prerequisites**

1. **Calendly Account** - Sign up at [calendly.com](https://calendly.com)
2. **Event Type Created** - Set up your 1-to-1 session event type
3. **Calendar Connected** - Connect your Google/Outlook calendar

## 🔧 **Setup Steps**

### **Step 1: Get Your Calendly Details**

1. **Login to Calendly Dashboard**
2. **Go to Event Types** → Click on your 1-to-1 session event
3. **Copy the URL** - It will look like:
   ```
   https://calendly.com/yourusername/30min
   ```

### **Step 2: Update Configuration**

Edit `src/config/calendly.ts`:

```typescript
export const CALENDLY_CONFIG = {
  // Replace with your actual Calendly username
  USERNAME: 'your-actual-username',
  
  // Replace with your actual event type slug
  EVENT_TYPE: '30min',
  
  // Update with your support email
  SUPPORT_EMAIL: 'your-actual-email@domain.com',
  
  // Customize session details
  EVENT_TITLE: '1-to-1 Learning Session',
  EVENT_DESCRIPTION: 'Personalized learning session with our expert instructor',
  
  // ... rest of the config
};
```

### **Step 3: Test the Integration**

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Visit your homepage** and click the "Book 1-to-1 Session" button

3. **Verify the modal opens** and shows your Calendly calendar

## 🎨 **Customization Options**

### **Change Button Styling**

Edit the button classes in:
- `src/components/HeroSection.tsx` - Homepage button
- `src/components/FloatingBookingButton.tsx` - Floating button

### **Modify Session Information**

Update the benefits and features in `src/config/calendly.ts`:

```typescript
BENEFITS: [
  'Your custom benefit 1',
  'Your custom benefit 2',
  // Add more benefits
],

FEATURES: [
  {
    icon: 'Video', // Available: Video, Clock, Users, Calendar
    title: 'Custom Title',
    description: 'Custom description'
  }
]
```

### **Change Modal Size**

Edit the modal dimensions in `src/components/CalendlyBooking.tsx`:

```typescript
<DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-hidden p-0">
  {/* Change max-w-4xl to max-w-2xl for smaller modal */}
  {/* Change max-h-[90vh] to max-h-[80vh] for shorter modal */}
</DialogContent>
```

## 🔍 **Troubleshooting**

### **Calendar Not Loading**

1. **Check browser console** for JavaScript errors
2. **Verify Calendly URL** in configuration
3. **Ensure Calendly script** is loading (check Network tab)

### **Modal Not Opening**

1. **Check event listener** in browser console
2. **Verify button click** is working
3. **Check for CSS conflicts**

### **Responsive Issues**

1. **Test on mobile devices**
2. **Check modal width/height** classes
3. **Verify Calendly widget** responsiveness

## 📱 **Mobile Optimization**

The integration is fully responsive with:
- **Mobile-first design**
- **Touch-friendly buttons**
- **Optimized modal sizing**
- **Smooth animations**

## 🎯 **Best Practices**

1. **Set Clear Availability** - Define your working hours in Calendly
2. **Add Buffer Time** - Include breaks between sessions
3. **Set Session Duration** - Keep sessions focused (30-60 minutes)
4. **Add Booking Notifications** - Enable email/SMS reminders
5. **Customize Confirmation** - Add session details and preparation tips

## 🔗 **Additional Resources**

- [Calendly Help Center](https://help.calendly.com/)
- [Calendly API Documentation](https://developer.calendly.com/)
- [Event Type Best Practices](https://help.calendly.com/hc/en-us/articles/360020052833-Event-Type-Best-Practices)

## 🚀 **Next Steps**

After setup, consider:
1. **Analytics Integration** - Track booking conversions
2. **CRM Integration** - Connect with your customer database
3. **Payment Integration** - Add paid session options
4. **Automated Follow-ups** - Send post-session materials

---

**Need Help?** Check the troubleshooting section or contact support at your configured email address.


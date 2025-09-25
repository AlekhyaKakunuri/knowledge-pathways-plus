# AI CareerX - Knowledge Pathways Plus

A comprehensive online learning platform built with React, TypeScript, and Firebase, offering AI and programming courses with integrated payment processing and admin management.

## 🚀 Features

### Core Features
- **Course Management**: Browse and enroll in AI and programming courses
- **User Authentication**: Secure login/signup with Google OAuth
- **Payment Processing**: UPI payment integration with verification
- **Admin Dashboard**: Complete admin panel for managing users, payments, and courses
- **Course Videos**: Embedded YouTube video integration
- **Responsive Design**: Mobile-first, modern UI with Tailwind CSS

### Technical Features
- **Firebase Integration**: Authentication, Firestore database, and hosting
- **TypeScript**: Full type safety and better development experience
- **Modern UI**: Shadcn/ui components with custom styling
- **Environment Configuration**: Smart API URL detection for dev/production
- **Real-time Updates**: Live data synchronization with Firestore

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Library**: Tailwind CSS, Shadcn/ui
- **Backend**: Firebase (Authentication, Firestore, Hosting)
- **Payment**: UPI integration with verification system
- **Deployment**: Firebase Hosting

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── CourseCard.tsx  # Course display component
│   └── ...
├── contexts/           # React contexts
│   ├── AuthContext.tsx # Authentication state
│   └── UserRoleContext.tsx # User role management
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
│   ├── firebase.ts     # Firebase configuration
│   └── paymentService.ts # Payment operations
├── pages/              # Page components
│   ├── AllCourses.tsx
│   ├── SignIn.tsx
│   └── ...
└── config/             # Configuration files
    └── api.ts          # API configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd knowledge-pathways-plus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project
   - Enable Authentication (Email/Password, Google)
   - Create Firestore database
   - Update `src/lib/firebase.ts` with your config

4. **Set up environment variables**
   Create `.env.local`:
   ```bash
   VITE_API_BASE_URL=http://localhost:8000
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Firebase Setup
1. **Authentication**: Enable Email/Password and Google providers
2. **Firestore**: Set up collections: `adminUsers`, `payments`, `userPlans`
3. **Security Rules**: Deploy `firestore.rules`
4. **Hosting**: Configure for `dist` directory

### API Configuration
- **Development**: Uses `http://localhost:8000` by default
- **Production**: Set `VITE_API_BASE_URL` environment variable
- **Smart Detection**: Automatically detects environment

### Admin Setup
1. **Create admin user** in Firestore `adminUsers` collection:
   ```json
   {
     "email": "admin@example.com",
     "role": "admin",
     "name": "Admin User",
     "isActive": true
   }
   ```

## 📦 Deployment

### Firebase Hosting
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

3. **Set production API URL**
   - Update `src/config/api.ts` with production URL
   - Or set `VITE_API_BASE_URL` environment variable

### Environment Variables
- **Development**: Automatic localhost detection
- **Production**: Set `VITE_API_BASE_URL` in deployment platform

## 🔐 Security

### Firebase Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### API Key Security
- Firebase API keys are public by design
- Security is handled by Firestore rules and authentication
- No sensitive data in client-side code

## 📊 Admin Features

### Payment Management
- View all payment submissions
- Verify/reject payments
- Add verified payments to user plans
- Send invoices via API integration

### User Management
- View user plans and subscriptions
- Manage course access
- Track user activity

### Analytics
- Payment statistics
- User enrollment data
- Course popularity metrics

## 🎯 API Integration

### Send Invoice API
- **Endpoint**: `/automation/send-invoice`
- **Method**: POST
- **Body**: `{"transaction_id": "123456"}`
- **Environment**: Auto-detects localhost vs production

## 🐛 Troubleshooting

### Common Issues
1. **Admin dashboard not showing**: Check admin user exists in Firestore
2. **Payment verification fails**: Check Firestore security rules
3. **API calls fail**: Verify API URL configuration
4. **Authentication errors**: Check Firebase configuration

### Debug Steps
1. Check browser console for errors
2. Verify Firebase configuration
3. Check Firestore security rules
4. Confirm admin user setup

## 📝 License

This project is proprietary software. All rights reserved.

## 🤝 Support

For technical support or questions, please contact the development team.

---

**Built with ❤️ for AI CareerX**
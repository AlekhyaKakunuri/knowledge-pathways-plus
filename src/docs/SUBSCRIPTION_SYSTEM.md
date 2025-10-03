# React Subscription Flow System

A comprehensive subscription management system that reads JWT tokens, decodes subscription information, and manages premium feature access in React.

## Features

- **JWT Token Decoding**: Safely decode JWT tokens to extract subscription information
- **Subscription Management**: Global state management for subscription data
- **Feature Gating**: Protect premium content based on subscription plans
- **Real-time Updates**: Automatic subscription status updates
- **Priority Handling**: PREMIUM_YEARLY takes precedence over PREMIUM_MONTHLY
- **Expiration Checking**: Automatic detection of expired subscriptions
- **UI Components**: Ready-to-use components for subscription status and premium gates

## Architecture

### Core Components

1. **JWT Utils** (`src/lib/jwtUtils.ts`)
   - Token decoding functions
   - Subscription validation
   - Plan priority management

2. **Subscription Context** (`src/contexts/SubscriptionContext.tsx`)
   - Global subscription state
   - Automatic token processing
   - Real-time updates

3. **UI Components**
   - `SubscriptionStatus`: Display current subscription info
   - `PremiumGate`: Protect premium content
   - `useSubscriptionCheck`: Easy subscription checks

## JWT Token Structure

The system expects JWT tokens with the following subscription payload:

```json
{
  "plan_name": "PREMIUM_GENAI_DEV_01",
  "start_date": 1759353491821,
  "end_date": 1790889491821,
  "is_premium": true
}
```

## Supported Plans

| Plan Name | Description | Priority |
|-----------|-------------|----------|
| `PREMIUM_YEARLY` | 12 months subscription | 3 (Highest) |
| `PREMIUM_MONTHLY` | 1 month subscription | 2 |
| `PREMIUM_GENAI_DEV_01` | AI course subscription | 1 |

## Usage

### 1. Basic Subscription Check

```tsx
import { useSubscriptionCheck } from '@/hooks/useSubscriptionCheck';

function MyComponent() {
  const { isActive, isPremium, planName } = useSubscriptionCheck();
  
  return (
    <div>
      {isActive ? (
        <p>Welcome, {planName} subscriber!</p>
      ) : (
        <p>Please subscribe to access premium features.</p>
      )}
    </div>
  );
}
```

### 2. Feature Gating

```tsx
import PremiumGate from '@/components/PremiumGate';

function PremiumContent() {
  return (
    <PremiumGate requiredFeature="premium">
      <div>This is premium content!</div>
    </PremiumGate>
  );
}
```

### 3. Subscription Status Display

```tsx
import SubscriptionStatus from '@/components/SubscriptionStatus';

function ProfilePage() {
  return (
    <div>
      <h1>My Profile</h1>
      <SubscriptionStatus showActions={true} />
    </div>
  );
}
```

### 4. Advanced Feature Checks

```tsx
import { useSubscriptionCheck } from '@/hooks/useSubscriptionCheck';

function AdvancedComponent() {
  const {
    canAccess,
    needsUpgrade,
    getStatusMessage,
    isExpiringSoon
  } = useSubscriptionCheck();

  return (
    <div>
      <p>Status: {getStatusMessage()}</p>
      
      {canAccess('ai_course') && (
        <div>AI Course Content</div>
      )}
      
      {needsUpgrade('yearly') && (
        <button>Upgrade to Yearly Plan</button>
      )}
      
      {isExpiringSoon && (
        <div className="warning">
          Your subscription expires soon!
        </div>
      )}
    </div>
  );
}
```

## API Reference

### useSubscriptionCheck Hook

```tsx
const {
  // Basic status
  hasSubscription: boolean;
  isActive: boolean;
  isPremium: boolean;
  isLoading: boolean;
  error: string | null;

  // Plan information
  planName: string | null;
  formattedPlanName: string | null;
  startDate: number | null;
  endDate: number | null;
  daysRemaining: number;
  isExpiringSoon: boolean;

  // Feature access
  canAccessPremiumContent: boolean;
  canAccessAICourse: boolean;
  canAccessMonthlyFeatures: boolean;
  canAccessYearlyFeatures: boolean;

  // Utility functions
  canAccess: (feature: 'premium' | 'ai_course' | 'monthly' | 'yearly') => boolean;
  needsUpgrade: (feature: 'premium' | 'ai_course' | 'monthly' | 'yearly') => boolean;
  getStatusMessage: () => string;
  isInGracePeriod: () => boolean;
  getDaysUntilExpiration: () => number;
  isRenewable: () => boolean;
} = useSubscriptionCheck();
```

### PremiumGate Component

```tsx
<PremiumGate
  requiredFeature="premium" // 'premium' | 'ai_course' | 'monthly' | 'yearly'
  fallbackMessage="Custom message for locked content"
  showUpgradeButton={true}
  className="custom-class"
>
  <div>Protected content</div>
</PremiumGate>
```

### SubscriptionStatus Component

```tsx
<SubscriptionStatus
  showActions={true} // Show refresh and upgrade buttons
  className="custom-class"
/>
```

## Integration with Firebase Auth

The system automatically integrates with Firebase Auth:

1. **Token Extraction**: Gets JWT token from Firebase user
2. **Automatic Updates**: Refreshes subscription when user changes
3. **Real-time Monitoring**: Checks subscription status every 5 minutes

## Error Handling

The system includes comprehensive error handling:

- **Token Decoding Errors**: Graceful fallback for invalid tokens
- **Network Errors**: Retry mechanisms for failed requests
- **Expired Tokens**: Automatic refresh and re-authentication
- **Invalid Subscriptions**: Clear error messages and upgrade prompts

## Security Considerations

- **Client-side Only**: JWT decoding is for UI purposes only
- **Server Validation**: Always validate tokens on the server
- **Token Refresh**: Automatic token refresh for expired tokens
- **Secure Storage**: Tokens are handled securely by Firebase

## Demo Page

Visit `/subscription-demo` to see the system in action with:
- Live subscription status
- Feature access overview
- Premium content examples
- Debug information

## Customization

### Adding New Plans

1. Update the plan priority in `jwtUtils.ts`:
```tsx
export const getSubscriptionPriority = (planName: string): number => {
  switch (planName) {
    case 'PREMIUM_YEARLY':
      return 3;
    case 'PREMIUM_MONTHLY':
      return 2;
    case 'PREMIUM_GENAI_DEV_01':
      return 1;
    case 'YOUR_NEW_PLAN': // Add your plan
      return 2.5;
    default:
      return 0;
  }
};
```

2. Update the plan formatter:
```tsx
export const formatPlanName = (planName: string): string => {
  switch (planName) {
    // ... existing cases
    case 'YOUR_NEW_PLAN':
      return 'Your New Plan';
    default:
      return planName;
  }
};
```

### Adding New Features

1. Update the feature types in `subscription.ts`
2. Add feature logic in `SubscriptionContext.tsx`
3. Update the `useSubscriptionCheck` hook

## Troubleshooting

### Common Issues

1. **Subscription not loading**: Check if user is authenticated
2. **Features not accessible**: Verify plan name matches exactly
3. **Token errors**: Ensure JWT token contains subscription data
4. **UI not updating**: Check if SubscriptionProvider is wrapping your app

### Debug Mode

Enable debug logging by adding to your environment:
```tsx
// In your app initialization
if (process.env.NODE_ENV === 'development') {
  console.log('Subscription debug mode enabled');
}
```

## Performance

- **Lazy Loading**: Components load only when needed
- **Memoization**: Subscription checks are memoized
- **Efficient Updates**: Only re-renders when subscription changes
- **Background Refresh**: Minimal impact on user experience

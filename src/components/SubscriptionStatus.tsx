import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Crown, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useNavigate } from 'react-router-dom';

interface SubscriptionStatusProps {
  showActions?: boolean;
  className?: string;
}

export const SubscriptionStatus: React.FC<SubscriptionStatusProps> = ({ 
  showActions = true, 
  className = '' 
}) => {
  const { subscription, isLoading, error, refreshSubscription } = useSubscription();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card className={`${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading subscription status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 text-red-600">
            <XCircle className="w-5 h-5" />
            <span>Error loading subscription: {error}</span>
          </div>
          {showActions && (
            <Button 
              onClick={refreshSubscription} 
              variant="outline" 
              size="sm" 
              className="mt-2"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  if (!subscription) {
    return (
      <Card className={`${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-gray-400" />
            <span>No Active Subscription</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            You don't have an active subscription. Upgrade to access premium features.
          </p>
          {showActions && (
            <Button onClick={() => navigate('/pricing')} className="w-full">
              View Pricing Plans
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = () => {
    if (!subscription.isActive) {
      return <Badge variant="destructive">Expired</Badge>;
    }
    
    if (subscription.isExpiringSoon) {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Expiring Soon</Badge>;
    }
    
    return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
  };

  const getStatusIcon = () => {
    if (!subscription.isActive) {
      return <XCircle className="w-5 h-5 text-red-500" />;
    }
    
    if (subscription.isExpiringSoon) {
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
    
    return <CheckCircle className="w-5 h-5 text-green-500" />;
  };

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            <span>Subscription Status</span>
          </div>
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="font-medium">{subscription.formattedPlanName}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-gray-600">Start Date</p>
              <p className="font-medium">{formatDate(subscription.startDate)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-gray-600">End Date</p>
              <p className="font-medium">{formatDate(subscription.endDate)}</p>
            </div>
          </div>
        </div>

        {subscription.isActive && (
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-gray-600">Days Remaining</p>
              <p className="font-medium">
                {subscription.daysRemaining} day{subscription.daysRemaining !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        )}

        {subscription.isExpiringSoon && subscription.isActive && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <p className="text-yellow-800 text-sm">
                Your subscription expires in {subscription.daysRemaining} day{subscription.daysRemaining !== 1 ? 's' : ''}. 
                Consider renewing to maintain access to premium features.
              </p>
            </div>
          </div>
        )}

        {!subscription.isActive && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <XCircle className="w-4 h-4 text-red-600" />
              <p className="text-red-800 text-sm">
                Your subscription has expired. Upgrade to regain access to premium features.
              </p>
            </div>
          </div>
        )}

        {showActions && (
          <div className="flex space-x-2 pt-2">
            <Button 
              onClick={refreshSubscription} 
              variant="outline" 
              size="sm"
              disabled={isLoading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button 
              onClick={() => navigate('/pricing')} 
              size="sm"
              className="flex-1"
            >
              {subscription.isActive ? 'Manage Subscription' : 'Upgrade Now'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionStatus;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../Auth/AuthContext';

const PremiumResourcesCard = () => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  
  const handleUpgradeClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to access premium features",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Premium Features",
      description: "Coming soon! We're working on adding premium resources.",
    });
  };

  return (
    <div className="bg-card rounded-lg border shadow-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="font-medium">Premium Resources</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Unlock access to exclusive resources, personalized recommendations,
        and priority support with a premium subscription.
      </p>
      
      {user?.isPremium ? (
        <div className="bg-primary/10 border border-primary/20 rounded-md p-3 flex items-center gap-2">
          <Star className="h-4 w-4 text-primary" />
          <p className="text-sm text-primary font-medium">
            You have access to premium resources
          </p>
        </div>
      ) : (
        <Button 
          onClick={handleUpgradeClick} 
          className="w-full"
          variant="outline"
        >
          Upgrade to Premium
        </Button>
      )}
    </div>
  );
};

export default PremiumResourcesCard;

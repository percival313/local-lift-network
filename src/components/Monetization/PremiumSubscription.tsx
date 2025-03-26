
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Award, Star, CreditCard } from 'lucide-react';
import { useAuth } from '../Auth/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

interface PremiumFeature {
  name: string;
  description: string;
}

interface PremiumSubscriptionProps {
  features: PremiumFeature[];
  buttonText?: string;
  callToAction?: string;
}

export const PremiumSubscription: React.FC<PremiumSubscriptionProps> = ({
  features,
  buttonText = 'Upgrade to Premium',
  callToAction = 'Unlock premium features',
}) => {
  const { user, upgradeAccount } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleUpgradeClick = () => {
    setIsDialogOpen(true);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsDialogOpen(false);
      
      // Update user account to premium
      upgradeAccount();
    }, 2000);
  };
  
  // If user is already premium
  if (user?.isPremium) {
    return (
      <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
        <div className="flex items-start space-x-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Star className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium flex items-center">
              Premium Account
              <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                Active
              </span>
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              You have access to all premium features. Thank you for your support!
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div className="bg-card rounded-lg border shadow-sm p-4">
        <div className="flex items-start space-x-3 mb-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Premium Features</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {callToAction}
            </p>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="bg-primary/10 rounded-full p-0.5 mt-0.5">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{feature.name}</p>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          className="w-full" 
          onClick={handleUpgradeClick}
        >
          <Star className="h-4 w-4 mr-2" />
          {buttonText}
        </Button>
        <p className="text-xs text-center text-muted-foreground mt-2">
          Just £5/month. Cancel anytime.
        </p>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upgrade to Premium</DialogTitle>
            <DialogDescription>
              Get unlimited access to all premium features for just £5/month.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handlePaymentSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Card Information</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="1234 1234 1234 1234"
                  className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Expiry Date</label>
                <input 
                  type="text" 
                  placeholder="MM/YY"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">CVC</label>
                <input 
                  type="text" 
                  placeholder="123"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Name on Card</label>
              <input 
                type="text" 
                placeholder="John Smith"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>
            
            <div className="pt-2 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Monthly subscription</span>
                <span className="font-medium">£5.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">VAT (20%)</span>
                <span className="font-medium">£1.00</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium">Total</span>
                <span className="font-medium">£6.00</span>
              </div>
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Pay £6.00'}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2 w-full">
                You'll be charged monthly until you cancel. By continuing, you agree to our{' '}
                <a href="#" className="underline">Terms of Service</a>.
              </p>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

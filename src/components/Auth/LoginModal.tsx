
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from './AuthContext';
import { User, KeyRound, Mail, AtSign } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onOpenChange }) => {
  const { login, signup, isLoading } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoginView) {
      await login(email, password);
      if (!isLoading) onOpenChange(false);
    } else {
      await signup(name, email, password);
      if (!isLoading) onOpenChange(false);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLoginView ? 'Login to LocalLift' : 'Create an Account'}</DialogTitle>
          <DialogDescription>
            {isLoginView 
              ? 'Enter your credentials to access your account' 
              : 'Sign up to save resources and access premium features'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {!isLoginView && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              {isLoginView && (
                <Button type="button" variant="link" className="h-auto p-0 text-xs">
                  Forgot password?
                </Button>
              )}
            </div>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <DialogFooter className="flex flex-col gap-2 sm:flex-col mt-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading 
                ? 'Please wait...' 
                : isLoginView 
                  ? 'Login' 
                  : 'Create Account'}
            </Button>
            
            <div className="relative w-full my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
            
            <Button type="button" variant="outline" className="w-full" onClick={toggleView}>
              {isLoginView ? 'Create an Account' : 'Back to Login'}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground pt-2">
              By continuing, you agree to our{' '}
              <a href="#" className="underline">Terms of Service</a> and{' '}
              <a href="#" className="underline">Privacy Policy</a>.
            </p>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

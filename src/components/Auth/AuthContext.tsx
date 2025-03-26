
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isPremium: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  upgradeAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in (from localStorage in this demo)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error parsing stored user:', err);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to verify credentials
      if (email === 'demo@example.com' && password === 'password') {
        const newUser = {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
          isPremium: false
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        toast.success('Logged in successfully');
        return;
      }
      
      // Demo login for testing
      if (email && password) {
        const newUser = {
          id: '2',
          name: email.split('@')[0],
          email,
          isPremium: false
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        toast.success('Logged in successfully');
        return;
      }
      
      throw new Error('Invalid credentials');
    } catch (err) {
      setError((err as Error).message);
      toast.error('Login failed: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an API call to create account
      if (email && password) {
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          isPremium: false
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        toast.success('Account created successfully');
        return;
      }
      
      throw new Error('Invalid information');
    } catch (err) {
      setError((err as Error).message);
      toast.error('Signup failed: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Logged out');
  };
  
  const upgradeAccount = () => {
    if (!user) return;
    
    const upgradedUser = {
      ...user,
      isPremium: true
    };
    
    setUser(upgradedUser);
    localStorage.setItem('user', JSON.stringify(upgradedUser));
    toast.success('Account upgraded to premium!');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        upgradeAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

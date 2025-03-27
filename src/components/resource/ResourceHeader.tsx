
import React, { useState } from 'react';
import { MapPin, Filter, ArrowUpDown, Search, Compass } from 'lucide-react';
import Container from '@/components/ui/container';
import PostcodeSearch from '@/components/PostcodeSearch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ResourceHeaderProps {
  postcode: string;
  searchQuery: string;
  onPostcodeSubmit: (code: string) => void;
  onSearchChange: (query: string) => void;
}

const ResourceHeader: React.FC<ResourceHeaderProps> = ({
  postcode,
  searchQuery,
  onPostcodeSubmit,
  onSearchChange,
}) => {
  const [isLocating, setIsLocating] = useState(false);
  const { toast } = useToast();

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location Not Available",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you would convert coordinates to a postcode using a geocoding service
        // For demo purposes, we'll just show a success message
        toast({
          title: "Location Found",
          description: "Resources updated based on your current location",
        });
        setIsLocating(false);
        
        // For demo purposes, we'll use a placeholder postcode
        // In a real app, this would come from reverse geocoding the coordinates
        onPostcodeSubmit("Current Location");
      },
      (error) => {
        console.error("Error getting location:", error);
        toast({
          title: "Location Error",
          description: error.message || "Could not get your location",
          variant: "destructive",
        });
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="pt-24 pb-8 md:pt-32 md:pb-12 bg-muted/30">
      <Container>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Local Resources</h1>
            <p className="text-muted-foreground">
              Find support services, training programs, and assistance in your area
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <PostcodeSearch 
                    onSubmit={onPostcodeSubmit} 
                    initialValue={postcode} 
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="shrink-0 h-[42px] w-[42px]"
                  onClick={handleUseCurrentLocation}
                  disabled={isLocating}
                  title="Use your current location"
                >
                  {isLocating ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  ) : (
                    <Compass className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Showing resources near <strong>{postcode}</strong></span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for resources..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Filter resources to find exactly what you need
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="mr-1 h-3.5 w-3.5" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    <ArrowUpDown className="mr-1 h-3.5 w-3.5" />
                    Sort
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ResourceHeader;

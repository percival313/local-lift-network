
import React, { useState, useEffect } from 'react';
import { Map, MapPin, ArrowUpDown, Filter, Compass } from 'lucide-react';
import { ResourceFilter } from './ResourceFilter';
import { Button } from '@/components/ui/button';
import { services } from '@/data/resourcesData';

interface ResourceMapProps {
  distanceRange?: number;
}

const ResourceMap: React.FC<ResourceMapProps> = ({ distanceRange = 5 }) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  
  // Placeholder for demo - this would come from your API
  const RESOURCE_TYPES = [
    { id: 'food-bank', name: 'Food Banks', count: 12 },
    { id: 'job-center', name: 'Job Centers', count: 5 },
    { id: 'training', name: 'Training Programs', count: 8 },
    { id: 'housing', name: 'Housing Support', count: 6 },
    { id: 'financial', name: 'Financial Aid', count: 9 },
    { id: 'healthcare', name: 'Healthcare', count: 7 },
  ];
  
  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }
    
    setIsLocating(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsLocating(false);
        
        // In a real app, you would trigger a search for resources near this location
        console.log(`Location set: ${position.coords.latitude}, ${position.coords.longitude}`);
        console.log(`Searching for resources within ${distanceRange} miles`);
      },
      (error) => {
        console.error("Error getting location:", error);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    if (userLocation) {
      console.log(`Distance range updated to ${distanceRange} miles`);
      // In a real app, you would update the search with the new distance range
    }
  }, [distanceRange, userLocation]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Map className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-lg font-medium">Resource Map</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center text-sm px-3 py-1.5 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <Filter className="h-4 w-4 mr-1.5" />
            Filters
            {activeFilters.length > 0 && (
              <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {activeFilters.length}
              </span>
            )}
          </button>
          <button className="flex items-center text-sm px-3 py-1.5 rounded-md bg-secondary hover:bg-secondary/80 transition-colors">
            <ArrowUpDown className="h-4 w-4 mr-1.5" />
            Sort
          </button>
        </div>
      </div>
      
      {isFilterOpen && (
        <div className="p-4 border-b animate-fade-in">
          <ResourceFilter 
            resourceTypes={RESOURCE_TYPES} 
            activeFilters={activeFilters}
            onFilterToggle={toggleFilter}
          />
        </div>
      )}
      
      <div className="flex-1 p-4 bg-muted/30 flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-background rounded-full p-3 inline-flex items-center justify-center mb-4 shadow-sm">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          
          <h3 className="text-lg font-medium mb-2">
            {userLocation ? `Showing resources within ${distanceRange} miles` : 'Map Coming Soon'}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4">
            {userLocation 
              ? `Found ${services.length} resources near your location.`
              : "We need your location to show nearby resources. Click the button below to share your location."}
          </p>
          
          {!userLocation ? (
            <Button 
              onClick={getUserLocation} 
              disabled={isLocating}
              className="inline-flex items-center"
            >
              {isLocating ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                  Locating...
                </>
              ) : (
                <>
                  <Compass className="mr-2 h-4 w-4" />
                  Use My Location
                </>
              )}
            </Button>
          ) : (
            <div className="px-4 py-2 rounded-md bg-secondary inline-block text-sm">
              Searching within <span className="font-medium">{distanceRange} miles</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceMap;

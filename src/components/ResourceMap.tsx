
import React, { useState } from 'react';
import { Map, MapPin, ArrowUpDown, Filter } from 'lucide-react';
import { ResourceFilter } from './ResourceFilter';

// Placeholder for demo - this would come from your API
const RESOURCE_TYPES = [
  { id: 'food-bank', name: 'Food Banks', count: 12 },
  { id: 'job-center', name: 'Job Centers', count: 5 },
  { id: 'training', name: 'Training Programs', count: 8 },
  { id: 'housing', name: 'Housing Support', count: 6 },
  { id: 'financial', name: 'Financial Aid', count: 9 },
  { id: 'healthcare', name: 'Healthcare', count: 7 },
];

const ResourceMap = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

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
          <h3 className="text-lg font-medium mb-2">Map Coming Soon</h3>
          <p className="text-sm text-muted-foreground mb-4">
            We're integrating with mapping services to show you nearby resources. For now, you can browse the list of services below.
          </p>
          <div className="px-4 py-2 rounded-md bg-secondary inline-block text-sm">
            Displaying resources near <span className="font-medium">SW1A 1AA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceMap;

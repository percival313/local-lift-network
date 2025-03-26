
import React from 'react';
import { Check } from 'lucide-react';

type ResourceType = {
  id: string;
  name: string;
  count: number;
};

interface ResourceFilterProps {
  resourceTypes: ResourceType[];
  activeFilters: string[];
  onFilterToggle: (filterId: string) => void;
}

export const ResourceFilter = ({ 
  resourceTypes, 
  activeFilters, 
  onFilterToggle 
}: ResourceFilterProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium mb-2">Filter by type</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {resourceTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onFilterToggle(type.id)}
            className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
              activeFilters.includes(type.id)
                ? 'bg-primary/10 text-primary font-medium'
                : 'bg-card hover:bg-secondary'
            }`}
          >
            <span className="flex items-center">
              {activeFilters.includes(type.id) && (
                <Check className="mr-1.5 h-3.5 w-3.5" />
              )}
              {type.name}
            </span>
            <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
              activeFilters.includes(type.id)
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}>
              {type.count}
            </span>
          </button>
        ))}
      </div>
      {activeFilters.length > 0 && (
        <div className="flex justify-end pt-2">
          <button
            onClick={() => activeFilters.forEach(filterId => onFilterToggle(filterId))}
            className="text-xs text-primary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};
